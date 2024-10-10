const admin = require('../database');
const logger = require('../logger/logger');

const db = admin.firestore();

const getAllCategories = async (req, res, next) => {
    try {
        const collection = await db.collection('categories').get();

        logger.info('Categories received successfully');
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

const getCategoryById = async (req, res, next) => {
    try {
        const docRef = db.collection('categories').doc(req.params.id);
        const doc = await docRef.get();
        if (!doc.exists) {
            logger.info(`Bad Request - category with id "${req.params.id}" does not exist`);
            return res.status(400).json({ message: `The category with id "${req.params.id}" does not exist.` });
        }

        logger.info('Category received successfully');
        res.status(200).json({
            id: doc.id,
            ...doc.data()
        });
    } catch (error) {
        next(error);
    }
};

const getCategoryByName = async (req, res, next) => {
    try {
        const categoriesSnapshot = await db.collection('categories')
            .where('name', '==', req.query.name)
            .limit(1)
            .get();

        const doc = categoriesSnapshot.docs[0];
        if (!doc || !doc.exists) {
            logger.info(`Bad Request - category with name "${req.query.name}" does not exist`);
            return res.status(400).json({ message: `The category with name "${req.query.name}" does not exist.` });
        }

        logger.info('Category received successfully');
        res.status(200).json({
            id: doc.id,
            ...doc.data()
        });
    } catch (error) {
        next(error);
    }
};

const createCategory = async (req, res, next) => {
    try {
        const { name, picture, subcategories } = req.body;
        if (!name) {
            logger.info('Bad Request - category name is required');
            return res.status(400).json({ message: 'Category name is required.' });
        }
        if (!picture) {
            logger.info('Bad Request - category picture url is required');
            return res.status(400).json({ message: 'Category picture url is required.' });
        }

        const docRef = await db.collection('categories').add({ name, picture, subcategories });
        const doc = await docRef.get();

        logger.info('Category created successfully');
        res.status(201).json({
            id: doc.id,
            ...doc.data()
        });
    } catch (error) {
        next(error);
    }
};

const updateCategory = async (req, res, next) => {
    try {
        let { id, name, picture, subcategories } = req.body;
        if (!id) {
            logger.info('Bad Request - category id is required');
            return res.status(400).json({ message: 'Category id is required.' });
        }

        const docRef = db.collection('categories').doc(id);
        let doc = await docRef.get();
        if (!doc.exists) {
            logger.info(`Bad Request - category with id "${id}" does not exist`);
            return res.status(400).json({ message: `The category with id "${id}" does not exist.` });
        }

        name ??= doc.data().name;
        picture ??= doc.data().picture;

        await docRef.update({ name, picture, subcategories: Array.isArray(subcategories) ? subcategories : Array.of(subcategories) });
        doc = await docRef.get();

        logger.info('Category updated successfully');
        res.status(200).json({
            id: doc.id,
            ...doc.data()
        });
    } catch (error) {
        next(error);
    }
};

const deleteCategory = async (req, res, next) => {
    try {
        const docRef = db.collection('categories').doc(req.params.id);
        const doc = await docRef.get();
        if (!doc.exists) {
            logger.info(`Bad Request - category with id "${req.params.id}" does not exist`);
            return res.status(400).json({ message: `The category with id "${req.params.id}" does not exist.` });
        }

        await docRef.delete();

        logger.info('Category deleted successfully');
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllCategories,
    getCategoryById,
    getCategoryByName,
    createCategory,
    updateCategory,
    deleteCategory
};
