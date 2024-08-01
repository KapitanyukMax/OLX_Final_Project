const admin = require('../database');
const logger = require('../logger/logger');
const formatDate = require('../utils/dateUtils');

const db = admin.firestore();

const getAllAdverts = async (req, res, next) => {
    try {
        const snapshot = await db.collection('adverts').get();
        const result = [];

        snapshot.forEach((doc) => {
            result.push(doc.data());
        });

        logger.info(`Adverts received successfully`);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

const getAdvertById = async (req, res, next) => {
    try {
        const advertsRef = await db.collection('adverts').doc(req.query.id);
        const doc = await advertsRef.get();

        if (!doc.exists)
            return res.status(404).json({ error: 'Advert not found' });

        logger.info(`Advert received successfully`);
        res.status(200).json({
            id: doc.id,
            ...doc.data()
        });
    } catch (error) {
        next(error);
    }
};

const getAdvertsByCategoryId = async (req, res, next) => {
    try {
        const snapshot = await db.collection('subcategories').where('categoryId', '==', req.query.categoryId).get();

        if (snapshot.empty) {
            return res.status(404).json({ error: 'Adverts not found' });
        }

        const subCategories = [];
        snapshot.forEach((doc) => {
            subCategories.push(doc.id);
        });

        const result = [];
        for (let i = 0; i < subCategories.length; i++) {
            const advertsSnapshot = await db.collection('adverts').where('subCategoryId', '==', subCategories[i]).get();
            advertsSnapshot.forEach((doc) => {
                result.push(doc.data());
            });
        }

        logger.info(`Adverts received successfully`);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

const getAdvertsByUserId = async (req, res, next) => {
    try {
        const snapshot = await db.collection('adverts').where('userId', '==', req.query.userId).get();

        if (snapshot.empty) {
            return res.status(404).json({ error: 'Adverts not found' });
        }

        const result = [];
        snapshot.forEach((doc) => {
            result.push(doc.data());
        });

        logger.info(`Adverts received successfully`);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

const getAdvertsBySubcategoryId = async (req, res, next) => {
    try {
        const snapshot = await db.collection('adverts').where('subCategoryId', '==', req.query.subcategoryId).get();

        if (snapshot.empty) {
            return res.status(404).json({ error: 'Adverts not found' });
        }

        const result = [];
        snapshot.forEach((doc) => {
            result.push(doc.data());
        });

        logger.info(`Adverts received successfully`);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

const createAdvert = async (req, res, next) => {
    try {
        const { userId, subCategoryId, name, description, price, location, status, pictures, orderType, currencyId, delivery, isHidden } = req.body;
        creationDate = formatDate.formatDate(new Date());
        viewsCount = 0;
        favoritesCount = 0;
        vipUntil = null;

        const docRef = await db.collection("adverts").add({
            userId, subCategoryId, name, description, price, location, status, pictures, orderType, currencyId, delivery, isHidden, creationDate, viewsCount, favoritesCount, vipUntil
        });
        doc = await docRef.get();

        logger.info(`User created successfully`);
        res.status(201).json({
            id: doc.id,
            ...doc.data()
        });
    } catch (error) {
        next(error);
    }
};

const updateAdvert = async (req, res, next) => {
    try {
        let { id, userId, subCategoryId, name, description, price, location, status, pictures, orderType, currencyId, delivery, isHidden, viewsCount, favoritesCount, vipUntil } = req.body;
        if (!id) {
            logger.info('Bad Request - advert id is required');
            return res.status(400).json({ message: 'Advert id is required.' });
        }

        const advertsRef = await db.collection('adverts').doc(id);
        let doc = await advertsRef.get();

        if (!doc.exists)
            return res.status(404).json({ error: 'Advert not found' });

        const advert = doc.data();

        userId ??= advert.userId;
        subCategoryId ??= advert.subCategoryId;
        name ??= advert.name;
        description ??= advert.description;
        price ??= advert.price;
        location ??= advert.location;
        status ??= advert.status;
        pictures ??= advert.pictures;
        orderType ??= advert.orderType;
        currencyId ??= advert.currencyId;
        delivery ??= advert.delivery;
        isHidden ??= advert.isHidden;
        viewsCount ??= advert.viewsCount;
        favoritesCount ??= advert.favoritesCount;
        vipUntil ??= advert.vipUntil;

        const creationDate = advert.creationDate;

        await advertsRef.update({
            userId, subCategoryId, name, description, price, location, status, pictures, orderType, currencyId, delivery, isHidden, creationDate, viewsCount, favoritesCount, vipUntil
        });
        doc = await advertsRef.get();

        logger.info(`Advert updated successfully`);
        res.status(200).json({
            id: doc.id,
            ...doc.data()
        });
    } catch (error) {
        next(error);
    }
};

const deleteAdvert = async (req, res, next) => {
    try {
        const advertRef = await db.collection('adverts').doc(req.query.id);
        const doc = await advertRef.get();

        if (!doc.exists)
            return res.status(404).json({ error: 'Advert not found' });

        const response = await db.collection('adverts').doc(req.query.id).delete();

        logger.info(`Advert deleted successfully`);
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllAdverts,
    getAdvertById,
    createAdvert,
    updateAdvert,
    deleteAdvert,
    getAdvertsBySubcategoryId,
    getAdvertsByCategoryId,
    getAdvertsByUserId
};