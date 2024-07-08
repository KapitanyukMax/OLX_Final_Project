const admin = require('../database');
const logger = require('../logger/logger');

const db = admin.firestore();

const getAllAdverts = async (req, res) => {
    try {
        const snapshot = await db.collection('adverts').get();
        const result = [];
        snapshot.forEach((doc) => {
            result.push(doc.data());
        });
        res.status(200).json(result);
    } catch (error) {
        logger.error(`Error listing adverts: ${error}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getAdvertById = async (req, res) => {
    try {
        const advertsRef = await db.collection('adverts').doc(req.query.id);
        const doc = await advertsRef.get();

        if (!doc.exists)
            return res.status(404).json({ error: 'Advert not found' });

        const response = doc.data();
        res.status(200).json(response);
    } catch (error) {
        logger.error(`Error listing adverts: ${error}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getAdvertsByCategoryId = async (req, res) => {
    try {
        const snapshot = await db.collection('subcategories').where('categoryId', '==', req.query.id).get();

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
        res.status(200).json(result);
    } catch (error) {
        logger.error(`Error listing adverts: ${error}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getAdvertsByUserId = async (req, res) => {
    try {
        const snapshot = await db.collection('adverts').where('userId', '==', req.query.id).get();

        if (snapshot.empty) {
            return res.status(404).json({ error: 'Adverts not found' });
        }

        const result = [];
        snapshot.forEach((doc) => {
            result.push(doc.data());
        });
        res.status(200).json(result);
    } catch (error) {
        logger.error(`Error listing adverts: ${error}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getAdvertsBySubcategoryId = async (req, res) => {
    try {
        const snapshot = await db.collection('adverts').where('subCategoryId', '==', req.query.id).get();

        if (snapshot.empty) {
            return res.status(404).json({ error: 'Adverts not found' });
        }

        const result = [];
        snapshot.forEach((doc) => {
            result.push(doc.data());
        });
        res.status(200).json(result);
    } catch (error) {
        logger.error(`Error listing adverts: ${error}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createAdvert = async (req, res) => {
    const formatDate = (date) => {
        const pad = (num) => num.toString().padStart(2, '0');

        const year = date.getFullYear();
        const month = pad(date.getMonth() + 1);
        const day = pad(date.getDate());
        const hours = pad(date.getHours());
        const minutes = pad(date.getMinutes());
        const seconds = pad(date.getSeconds());

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    try {
        const newAdvert = {
            userId: req.body.userId,
            subCategoryId: req.body.subCategoryId,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            location: req.body.location,
            status: req.body.status,
            pictures: req.body.pictures,
            orderType: req.body.orderType,
            currency: req.body.currency,
            delivery: req.body.delivery,
            isHidden: req.body.isHidden,
            creationDate: formatDate(new Date()),
            viewsCount: 0,
            favoritesCount: 0,
            vipUntil: null
        };
        const docRef = await db.collection("adverts").add(newAdvert);
        logger.info(`Document written with ID: ${docRef.id}`);
        res.status(201).json(newAdvert);
    } catch (error) {
        logger.error(`Error listing adverts: ${error}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateAdvert = async (req, res) => {
    try {
        let { id, userId, subCategoryId, name, description, price, location, status, pictures, orderType, currency, delivery, isHidden, viewsCount, favoritesCount, vipUntil } = req.body;
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
        currency ??= advert.currency;
        delivery ??= advert.delivery;
        isHidden ??= advert.isHidden;
        viewsCount ??= advert.viewsCount;
        favoritesCount ??= advert.favoritesCount;
        vipUntil ??= advert.vipUntil;

        const creationDate = advert.creationDate;

        await advertsRef.update({
            userId, subCategoryId, name, description, price, location, status, pictures, orderType, currency, delivery, isHidden, creationDate, viewsCount, favoritesCount, vipUntil
        });
        doc = await advertsRef.get();
        const data = doc.data();
        logger.info(`Advert with ID ${id} updated`);
        res.status(200).json(data);
    } catch (error) {
        logger.error(`Error listing adverts: ${error}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteAdvert = async (req, res) => {
    try {
        const advertRef = await db.collection('adverts').doc(req.query.id);
        const doc = await advertRef.get();

        if (!doc.exists)
            return res.status(404).json({ error: 'Advert not found' });

        const response = await db.collection('adverts').doc(req.query.id).delete();
        logger.info(`Advert with ID ${req.query.id} deleted`);
        res.sendStatus(204);
    } catch (error) {
        logger.error(`Error listing adverts: ${error}`);
        res.status(500).json({ error: 'Internal Server Error' });
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