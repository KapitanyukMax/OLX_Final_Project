const admin = require('../database');

const db = admin.firestore();

const getAllCategories = async (req, res) => {
    try {
        const snapshot = await db.collection('categories').get();
        const result = [];
        snapshot.forEach((doc) => {
            result.push(doc.data());
        });
        res.status(200).json(result);
    } catch (error) {
        console.error('Error listing categories:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createCategory = async (req, res) => {
    try {
        const newCategory = {
            name: req.body.name,
            picture: req.body.picture
        };
        const docRef = await db.collection("categories").add(newCategory);
        console.log("Document written with ID: ", docRef.id);
        res.status(201).json(newCategory);
    } catch (error) {
        console.error('Error listing categories:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateCategory = async (req, res) => {
    try {
        let { id, name, picture } = req.body;
        const categoriesRef = await db.collection('categories').doc(id);
        let doc = await categoriesRef.get();
        const category = doc.data();

        name ||= category.name;
        picture ||= category.picture;

        await categoriesRef.update({
            name, picture
        });
        doc = await categoriesRef.get();
        const data = doc.data();
        res.status(200).json(data);
    } catch (error) {
        console.error('Error listing categories:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const categoriesRef = await db.collection('categories').doc(req.params.id);
        const doc = await categoriesRef.get();
        if (!doc.data())
            return res.status(400).json({ error: `No category with id ${req.params.id}` });
        const response = await db.collection('categories').doc(req.params.id).delete();
        res.sendStatus(204);
    } catch (error) {
        console.error('Error listing categories:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getCategoryById = async (req, res) => {
    try {
        const categoriesRef = await db.collection('categories').doc(req.params.id);
        const doc = await categoriesRef.get();
        const response = doc.data();
        res.status(200).json(response);
    } catch (error) {
        console.error('Error listing categories:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    getCategoryById
};
