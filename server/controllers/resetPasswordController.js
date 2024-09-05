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


const client = twilio(accountSid, authToken);

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




const resetPassword = async (req, res, next) => {
    try {
        const { userId, newPassword } = req.body;
        const docRef = db.collection('users').doc(userId);
        const doc = await docRef.get();

        if (!doc.exists) {
            return res.status(400).json({ message: 'User does not exist.' });
        }

        const userData = doc.data();
        const currentTime = new Date();
        if (userData.resetCodeExpiry < currentTime) {
            return res.status(400).json({ message: 'Reset code expired.' });
        }

        await docRef.update({ password: hashPassword(newPassword) });

        await docRef.update({ resetCode: null, resetCodeExpiry: null });

        res.status(200).json({ message: 'Password reset successfully.' });
    } catch (error) {
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
