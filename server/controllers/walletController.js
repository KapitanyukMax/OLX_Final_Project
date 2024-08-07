const admin = require('../database');
const logger = require('../logger/logger');

const db = admin.firestore();

const getWalletByUserId = async (req, res, next) => {
    try {
        const snapshot = await db.collection('wallets').where('userId', '==', req.query.userId).get();

        if (snapshot.empty) {
            return res.status(404).json({ error: 'Wallet not found' });
        }

        const wallets = [];
        snapshot.forEach(doc => {
            wallets.push(doc.data());
        });

        logger.info(`Wallets received successfully`);
        res.status(200).json(wallets);
    } catch (error) {
        next(error);
    }
};

const getWalletById = async (req, res, next) => {
    try {
        const walletsRef = await db.collection('wallets').doc(req.params.id);
        const doc = await walletsRef.get();

        if (!doc.exists) {
            return res.status(404).json({ error: 'Wallet not found' });
        }

        logger.info(`Wallet received successfully`);
        res.status(200).json({
            id: doc.id,
            ...doc.data()
        });
    } catch (error) {
        next(error);
    }
}

const createNewWallet = async (reqBody) => {
    try {
        userId = reqBody.userId;
        currencyId = reqBody.currencyId;
        balance = 0;
        bonuses = 0;

        const collection = await db.collection('wallets').get();
        for (const doc of collection.docs) {
            if (doc.data().userId == userId) {
                logger.info('Bad Request - wallet already exists');
                return 'Wallet already exists.';
            }
        }

        const docRef = await db.collection('wallets').add({
            userId,
            currencyId,
            balance,
            bonuses
        });
        doc = await docRef.get();

        logger.info(`Wallet created successfully`);
        return {
            id: doc.id,
            ...doc.data()
        };
    } catch (error) {
        next(error);
    }
};

const createWallet = async (req, res, next) => {
    try {
        const { userId, currencyId } = req.body;
        balance = 0;
        bonuses = 0;

        const collection = await db.collection('wallets').get();
        for (const doc of collection.docs) {
            if (doc.data().userId == userId) {
                logger.info('Bad Request - wallet already exists');
                return res.status(400).json({ message: 'Wallet already exists.' });
            }
        }

        const docRef = await db.collection('wallets').add({
            userId,
            currencyId,
            balance,
            bonuses
        });
        doc = await docRef.get();

        logger.info(`Wallet created successfully`);
        res.status(201).json({
            id: doc.id,
            ...doc.data()
        });
    } catch (error) {
        next(error);
    }
};

const updateWallet = async (req, res, next) => {
    try {
        const { id, balance, bonuses } = req.body;

        if (!id) {
            logger.info('Bad Request - wallet id is required');
            return res.status(400).json({ message: 'Wallet id is required.' });
        }

        const walletRef = db.collection('wallets').doc(id);
        let doc = await walletRef.get();

        if (!doc.exists)
            return res.status(404).json({ error: 'Wallet not found' });

        const wallet = doc.data();

        balance ??= wallet.balance;
        bonuses ??= wallet.bonuses;

        await walletRef.update({
            balance,
            bonuses
        });
        doc = await walletRef.get();

        logger.info(`Wallet updated successfully`);
        res.status(200).json({
            id: doc.id,
            ...doc.data()
        });
    } catch (error) {
        next(error);
    }
};

const deleteWallet = async (req, res, next) => {
    try {
        const walletRef = db.collection('wallets').doc(req.params.id);
        let doc = await walletRef.get();

        if (!doc.exists)
            return res.status(404).json({ error: 'Wallet not found' });

        const response = await db.collection('wallets').doc(req.query.id).delete();

        logger.info(`Wallet deleted successfully`);
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getWalletByUserId,
    getWalletById,
    createWallet,
    updateWallet,
    deleteWallet,
    createNewWallet
};