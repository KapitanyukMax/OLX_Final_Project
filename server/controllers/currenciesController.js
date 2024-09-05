const admin = require('../database');
const logger = require('../logger/logger');
const { createNewWallet } = require('./walletController');

const db = admin.firestore();

const getAllCurrencies = async (req, res, next) => {
    try {
        const collection = await db.collection('currencies').get();

        logger.info('Currencies received successfully');
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

const getCurrencyById = async (req, res, next) => {
    try {
        const docRef = db.collection('currencies').doc(req.params.id);
        const doc = await docRef.get();
        if (!doc.exists) {
            logger.info(`Bad Request - currency with id "${req.params.id}" does not exist`);
            return res.status(400).json({ message: `The currency with id "${req.params.id}" does not exist.` });
        }

        logger.info('Currency received successfully');
        res.status(200).json({
            id: doc.id,
            ...doc.data()
        });
    } catch (error) {
        next(error);
    }
};

const getCurrencyByCode = async (req, res, next) => {
    try {
        const collection = await db.collection('currencies').get();

        let foundDoc;
        for (const doc of collection.docs) {
            if (doc.data().code == req.query.code) {
                foundDoc = doc;
                break;
            }
        }

        if (!foundDoc) {
            logger.info(`Bad Request - currency with code "${req.query.code}" does not exist`);
            return res.status(400).json({ message: `The currency with code "${req.query.code}" does not exist.` });
        }

        logger.info('Currency received successfully');
        res.status(200).json({
            id: foundDoc.id,
            ...foundDoc.data()
        });
    } catch (error) {
        next(error);
    }
};

const getCurrencyByAbbr = async (req, res, next) => {
    try {
        const collection = await db.collection('currencies').get();

        let foundDoc;
        for (const doc of collection.docs) {
            if (doc.data().abbrEng == req.query.abbrEng) {
                foundDoc = doc;
                break;
            }
        }

        if (!foundDoc) {
            logger.info(`Bad Request - currency with abbreviation "${req.query.abbrEng}" does not exist`);
            return res.status(400).json({ message: `The currency with abbreviation "${req.query.abbrEng}" does not exist.` });
        }

        logger.info('Currency received successfully');
        res.status(200).json({
            id: foundDoc.id,
            ...foundDoc.data()
        });
    } catch (error) {
        next(error);
    }
};

const createCurrency = async (req, res, next) => {
    try {
        const { code, abbrEng, abbrUkr, name } = req.body;
        if (!code || !abbrEng || !abbrUkr || !name) {
            logger.info('Bad Request - currency code, English and Ukrainian abbreviations and name are required');
            return res.status(400).json({ message: 'Currency code, English and Ukrainian abbreviations and name are required.' });
        }

        const collection = await db.collection('currencies').get();
        for (const doc of collection.docs) {
            if (doc.data().code == code) {
                logger.info(`Conflict - currency with code "${code}" already exists`);
                return res.status(409).json({ message: `The currency with code "${code}" already exists.` });
            }
            if (doc.data().abbrEng == abbrEng) {
                logger.info(`Conflict - currency with English abbreviation "${abbrEng}" already exists`);
                return res.status(409).json({ message: `The currency with English abbreviation "${abbrEng}" already exists.` });
            }
            if (doc.data().abbrUkr == abbrUkr) {
                logger.info(`Conflict - currency with Ukrainian abbreviation "${abbrUkr}" already exists`);
                return res.status(409).json({ message: `The currency with Ukrainian abbreviation "${abbrUkr}" already exists.` });
            }
            if (doc.data().name == name) {
                logger.info(`Conflict - currency with name "${name}" already exists`);
                return res.status(409).json({ message: `The currency with name "${name}" already exists.` });
            }
        }

        const userDocRef = await db.collection('currencies').add({
            code, abbrEng, abbrUkr, name
        });
        const userDoc = await userDocRef.get();

        logger.info('Currency created successfully');
        res.status(201).json({
            id: userDoc.id,
            ...userDoc.data()
        });
    } catch (error) {
        next(error);
    }
};

const updateCurrency = async (req, res, next) => {
    try {
        let { id, abbrEng, abbrUkr, name } = req.body;
        if (!id) {
            logger.info('Bad Request - currency id is required');
            return res.status(400).json({ message: 'Currency id is required.' });
        }

        const docRef = db.collection('currencies').doc(id);
        let doc = await docRef.get();
        if (!doc.exists) {
            logger.info(`Bad Request - currencies with id "${id}" does not exist`);
            return res.status(400).json({ message: `The currencies with id "${id}" does not exist.` });
        }

        const collection = await db.collection('currencies').get();
        if (abbrEng) {
            for (const doc of collection.docs) {
                if (doc.data().abbrEng == abbrEng && doc.id != id) {
                    logger.info(`Conflict - currency with English abbreviation "${abbrEng}" already exists`);
                    return res.status(409).json({ message: `The currency with English abbreviation "${abbrEng}" already exists.` });
                }
            }
        }
        if (abbrUkr) {
            for (const doc of collection.docs) {
                if (doc.data().abbrUkr == abbrUkr && doc.id != id) {
                    logger.info(`Conflict - currency with Ukrainian abbreviation "${abbrUkr}" already exists`);
                    return res.status(409).json({ message: `The currency with Ukrainian abbreviation "${abbrUkr}" already exists.` });
                }
            }
        }
        if (name) {
            for (const doc of collection.docs) {
                if (doc.data().name == name && doc.id != id) {
                    logger.info(`Conflict - currency with name "${name}" already exists`);
                    return res.status(409).json({ message: `The currency with name "${name}" already exists.` });
                }
            }
        }

        abbrEng ??= doc.data().abbrEng;
        abbrUkr ??= doc.data().abbrUkr;
        name ??= doc.data().name;

        await docRef.update({ abbrEng, abbrUkr, name });
        doc = await docRef.get();

        logger.info('Currency updated successfully');
        res.status(200).json({
            id: doc.id,
            ...doc.data()
        });
    } catch (error) {
        next(error);
    }
};

const deleteCurrency = async (req, res, next) => {
    try {
        const docRef = db.collection('currencies').doc(req.params.id);
        const doc = await docRef.get();
        if (!doc.exists) {
            logger.info(`Bad Request - currency with id "${req.params.id}" does not exist`);
            return res.status(400).json({ message: `The currency with id "${req.params.id}" does not exist.` });
        }

        await docRef.delete();

        logger.info('Currency deleted successfully');
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllCurrencies,
    getCurrencyById,
    getCurrencyByCode,
    getCurrencyByAbbr,
    createCurrency,
    updateCurrency,
    deleteCurrency
};
