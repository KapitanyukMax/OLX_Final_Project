const admin = require('../database');
const logger = require('../logger/logger');

const db = admin.firestore();

const getAllCategories = async (req, res) => {
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
        logger.error(`Error getting categories: ${error}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getCategoryById = async (req, res) => {
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
        logger.error(`Error getting category: ${error}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createCategory = async (req, res) => {
    try {
        const { name, picture } = req.body;
        if (!name) {
            logger.info('Bad Request - category name is required');
            return res.status(400).json({ message: 'Category name is required.' });
        }
        if (!picture) {
            logger.info('Bad Request - category picture url is required');
            return res.status(400).json({ message: 'Category picture url is required.' });
        }

        const docRef = await db.collection('categories').add({ name, picture });
        const doc = await docRef.get();

        logger.info('Category created successfully');
        res.status(201).json({
            id: doc.id,
            ...doc.data()
        });
    } catch (error) {
        logger.error(`Error creating category: ${error}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateCategory = async (req, res) => {
    try {
        let { id, name, picture } = req.body;
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

        await docRef.update({ name, picture });
        doc = await docRef.get();

        logger.info('Category updated successfully');
        res.status(200).json({
            id: doc.id,
            ...doc.data()
        });
    } catch (error) {
        logger.error(`Error updating category: ${error}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteCategory = async (req, res) => {
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
        logger.error(`Error deleting category: ${error}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};
