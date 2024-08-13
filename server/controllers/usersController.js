const admin = require('../database');
const logger = require('../logger/logger');
const { createNewWallet } = require('./walletController');

const db = admin.firestore();

const getAllUsers = async (req, res, next) => {
    try {
        const collection = await db.collection('users').get();

        logger.info('Users received successfully');
        res.status(200).json(collection.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            };
        }));
    } catch (error) {
        next(error);
    }
};

const getUserById = async (req, res, next) => {
    try {
        const docRef = db.collection('users').doc(req.params.id);
        const doc = await docRef.get();
        if (!doc.exists) {
            logger.info(`Bad Request - user with id "${req.params.id}" does not exist`);
            return res.status(400).json({ message: `The user with id "${req.params.id}" does not exist.` });
        }

        logger.info('User received successfully');
        res.status(200).json({
            id: doc.id,
            ...doc.data()
        });
    } catch (error) {
        next(error);
    }
};

const getUserByEmail = async (req, res, next) => {
    try {
        const collection = await db.collection('users').get();

        let foundDoc;
        for (const doc of collection.docs) {
            if (doc.data().email == req.query.email) {
                foundDoc = doc;
                break;
            }
        }

        if (!foundDoc) {
            logger.info(`Bad Request - user with email "${req.query.email}" does not exist`);
            return res.status(400).json({ message: `The user with email "${req.query.email}" does not exist.` });
        }

        logger.info('User received successfully');
        res.status(200).json({
            id: foundDoc.id,
            ...foundDoc.data()
        });
    } catch (error) {
        next(error);
    }
};

const createUser = async (req, res, next) => {
    try {
        const { name, email, phone, currencyId, isAdmin, picture, rating } = req.body;
        if (!name) {
            logger.info('Bad Request - user name is required');
            return res.status(400).json({ message: 'User name is required.' });
        }
        if (!email && !phone) {
            logger.info('Bad Request - user email or phone is required');
            return res.status(400).json({ message: 'User email or phone is required.' });
        }
        if (!picture) {
            logger.info('Bad Request - user picture url is required');
            return res.status(400).json({ message: 'User picture url is required.' });
        }
        isAdmin ??= false;
        rating ??= 0;

        const collection = await db.collection('users').get();
        for (const doc of collection.docs) {
            if (doc.data().email == email) {
                logger.info(`Conflict - user with email "${email}" already exists`);
                return res.status(409).json({ message: `The user with email "${email}" already exists.` });
            }
            if (doc.data().phone == phone) {
                logger.info(`Conflict - user with phone "${phone}" already exists`);
                return res.status(409).json({ message: `The user with phone "${phone}" already exists.` });
            }
        }

        const userDocRef = await db.collection('users').add({
            name, email, phone, isAdmin, picture, rating
        });
        let userDoc = await userDocRef.get();

        const { id: walletId } = await createNewWallet({ userId: userDoc.id, currencyId });
        userDocRef.update({ walletId });
        userDoc = await userDocRef.get();

        logger.info('User created successfully');
        res.status(201).json({
            id: userDoc.id,
            ...userDoc.data()
        });
    } catch (error) {
        next(error);
    }
};

const updateUser = async (req, res, next) => {
    try {
        let { id, name, email, phone, isAdmin, picture, rating } = req.body;
        if (!id) {
            logger.info('Bad Request - user id is required');
            return res.status(400).json({ message: 'User id is required.' });
        }

        const docRef = db.collection('users').doc(id);
        let doc = await docRef.get();
        if (!doc.exists) {
            logger.info(`Bad Request - user with id "${id}" does not exist`);
            return res.status(400).json({ message: `The user with id "${id}" does not exist.` });
        }

        const collection = await db.collection('users').get();
        if (email) {
            for (const doc of collection.docs) {
                if (doc.data().email == email && doc.id != id) {
                    logger.info(`Conflict - user with email "${email}" already exists`);
                    return res.status(409).json({ message: `The user with email "${email}" already exists.` });
                }
            }
        }
        if (phone) {
            for (const doc of collection.docs) {
                if (doc.data().phone == phone && doc.id != id) {
                    logger.info(`Conflict - user with phone "${phone}" already exists`);
                    return res.status(409).json({ message: `The user with phone "${phone}" already exists.` });
                }
            }
        }

        name ??= doc.data().name;
        email ??= doc.data().email;
        phone ??= doc.data().phone;
        isAdmin ??= doc.data().isAdmin;
        picture ??= doc.data().picture;
        rating ??= doc.data().rating;

        await docRef.update({ name, email, phone, isAdmin, picture, rating });
        doc = await docRef.get();

        logger.info('User updated successfully');
        res.status(200).json({
            id: doc.id,
            ...doc.data()
        });
    } catch (error) {
        next(error);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const docRef = db.collection('users').doc(req.params.id);
        const doc = await docRef.get();
        if (!doc.exists) {
            logger.info(`Bad Request - user with id "${req.params.id}" does not exist`);
            return res.status(400).json({ message: `The user with id "${req.params.id}" does not exist.` });
        }

        await docRef.delete();

        logger.info('User deleted successfully');
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser
};
