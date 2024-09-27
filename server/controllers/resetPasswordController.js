require('dotenv').config();
const admin = require('../database');

const logger = require('../logger/logger');
const nodemailer = require('nodemailer');
const db = admin.firestore();
const twilio = require('twilio');

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const userMail = process.env.USER_MAIL_SEND;
const userMailPass = process.env.USER_PASS_SEND;
const bcrypt = require('bcrypt');
const saltRounds = 10;

const client = twilio(accountSid, authToken);

const resetPassword = async (req, res) => {
    try {
        const { userId, newPassword } = req.body;
        const docRef = db.collection('users').doc(userId);
        const doc = await docRef.get();

        if (!doc.exists) {
            return res.status(400).json({ message: 'User does not exist in Firestore.' });
        }

        const userData = doc.data();
        const email = userData.email;

        const user = await admin.auth().getUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: 'User does not exist in Firebase Auth.' });
        }

        const hashedPassword = await hashPassword(newPassword);

        await admin.auth().updateUser(user.uid, { password: newPassword });

        await docRef.update({ password: hashedPassword, resetCode: null, resetCodeExpiry: null });

        res.status(200).json({ message: 'Password reset successfully.' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ message: 'Error resetting password.' });
    }
};


const hashPassword = async (password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw new Error('Error hashing password');
    }
};
const verifyPassword = async (plainPassword, hashedPassword) => {
    try {
        const match = await bcrypt.compare(plainPassword, hashedPassword);
        return match;
    } catch (error) {
        console.error('Error verifying password:', error);
        throw new Error('Error verifying password');
    }
};

const generateResetCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};
const transporter = nodemailer.createTransport({
    host: 'smtp.ukr.net',
    port: 465,
    secure: true,
    auth: {
        user: userMail,
        pass: userMailPass
    }
});
const saveResetCode = async (userId, resetCode) => {
    const docRef = db.collection('users').doc(userId);
    await docRef.update({
        resetCode,
        resetCodeExpiry: new Date(Date.now() + 15 * 60 * 1000)
    });
};

const sendResetCodeEmail = async (to, resetCode) => {
    try {
        const mailOptions = {
            from: 'ddx.mail@ukr.net',
            to: to,
            subject: 'Ваш код для відновлення паролю',
            text: `Вітаємо! Ваш код для відновлення паролю: ${resetCode}. Код дійсний 15 хвилин.`,
        };
   
        await transporter.sendMail(mailOptions);
        console.log('Reset code email sent successfully');
    } catch (error) {
        console.error('Error sending reset code email:', error);
        throw new Error('Не вдалося надіслати електронний лист');
    }
   };
   const sendResetCodeSMS = async (to, resetCode) => {
    try {
        const message = await client.messages.create({
            body: `Ваш код для відновлення паролю: ${resetCode}. Код дійсний 15 хвилин.`,
            from: '+14352721949',
            to: to,
        });

        console.log(`SMS надіслано успішно: ${message.sid}`);
    } catch (error) {
        console.error('Помилка при відправці SMS:', error);
        throw new Error('Не вдалося надіслати SMS.');
    }
}; 
const requestPasswordReset = async (req, res, next) => {
    try {
        const { contact } = req.body;
        let foundDoc;
        
        if (contact.includes('@')) {
            const collection = await db.collection('users').where('email', '==', contact).get();
            foundDoc = collection.docs[0];
        } else {
            const collection = await db.collection('users').where('phone', '==', contact).get();
            foundDoc = collection.docs[0];
        }

        if (!foundDoc) {
            logger.info(`Bad Request - user with contact "${contact}" does not exist`);
            return res.status(400).json({ message: `User with contact "${contact}" does not exist.` });
        }

        const userId = foundDoc.id;
        const resetCode = generateResetCode();
        await saveResetCode(userId, resetCode);

        if (contact.includes('@')) {
            await sendResetCodeEmail(contact, resetCode);
        } else {
            await sendResetCodeSMS(contact, resetCode);
        }

        logger.info('Password reset code sent successfully');
        res.status(200).json({ message: 'Password reset code sent successfully.' });
    } catch (error) {
        next(error);
    }
};

const verifyResetCode = async (req, res, next) => {
    try {
        const { email, resetCode } = req.body;

        console.log('Verifying reset code for:', email, 'with code:', resetCode);

        const userCollection = await db.collection('users').where('email', '==', email).get();
        const userDoc = userCollection.docs[0];

        if (!userDoc) {
            console.log('User does not exist.');
            return res.status(400).json({ message: 'User does not exist.' });
        }

        const userData = userDoc.data();
        const currentTime = new Date();

        const resetCodeExpiryDate = userData.resetCodeExpiry.toDate();

        console.log('Stored reset code:', userData.resetCode, 'Stored expiry:', resetCodeExpiryDate);
        console.log('Current time:', currentTime);

        if (userData.resetCode !== resetCode || resetCodeExpiryDate < currentTime) {
            console.log('Invalid or expired reset code.');
            return res.status(400).json({ message: 'Invalid or expired reset code.' });
        }

        res.status(200).json({ message: 'Reset code verified successfully.', userId: userDoc.id });
    } catch (error) {
        console.error('Error verifying reset code:', error);
        next(error);
    }
};


const reSendResetCode = async (req, res, next) => {
    try {
        const { email } = req.body;
        const collection = await db.collection('users').get();
        
        let foundDoc;
        for (const doc of collection.docs) {
            if (doc.data().email === email) {
                foundDoc = doc;
                break;
            }
        }

        if (!foundDoc) {
            logger.info(`Bad Request - user with email "${email}" does not exist`);
            return res.status(400).json({ message: `User with email "${email}" does not exist.` });
        }

        const userId = foundDoc.id;
        const resetCode = generateResetCode();
        await saveResetCode(userId, resetCode);
        await sendResetCodeEmail(email, resetCode);

        logger.info('Password reset code re-sent successfully');
        res.status(200).json({ message: 'Password reset code re-sent successfully.' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    requestPasswordReset,
    verifyResetCode,
    resetPassword,
    reSendResetCode
};
