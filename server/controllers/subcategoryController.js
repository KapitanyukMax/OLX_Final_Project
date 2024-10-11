const admin = require('../database');
const db = admin.firestore();

const getAllSubcategories = async (req, res, next) => {
    try {
        const snapshot = await db.collection('subcategories').get();
        const result = [];
        snapshot.forEach((doc) => {
            result.push({ id: doc.id, ...doc.data() });
        });
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};

const createSubCategories = async (req, res, next) => {
    try {
        const newSubcategory = {
            name: req.body.name,
            picture: req.body.picture,
            categoryId: req.body.categoryId
        };
        const docRef = await db.collection("subcategories").add(newSubcategory);
        console.log("Document written with ID: ", docRef.id);
        res.status(201).json({
            id: docRef.id,
            ...newSubcategory
        });
    }
    catch (error) {
        next(error);
    }
};

const updateSubCategory = async (req, res, next) => {
    try {
        let { id, name, picture, categoryId } = req.body;
        const subcategoriesRef = db.collection('subcategories').doc(id);
        let doc = await subcategoriesRef.get();

        if (!id) {
            return res.status(400).json({ error: 'Subcategory ID is required' });
        }
        if (!doc.exists) {
            res.status(404).json({ error: 'Subcategory not found' });
            return;
        }
        await subcategoriesRef.update({ name, picture, categoryId });
        const updateDoc = await subcategoriesRef.get();
        res.status(200).json(updateDoc.data());
    }
    catch (error) {
        next(error);
    }
};


const deleteSubCategory = async (req, res, next) => {
    try {
        const subCategoryId = req.params.id;

        if (!subCategoryId) {
            return res.status(400).json({ error: 'Subcategory ID is required' });
        }

        const subCategoryRef = db.collection('subcategories').doc(subCategoryId);
        const doc = await subCategoryRef.get();

        if (!doc.data()) {
            return res.status(400).json({ error: `No subcategory with id ${subCategoryId}` });
        }
        await subCategoryRef.delete();

        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};
const getSubCategoryById = async (req, res, next) => {
    try {

        const subCategoryId = req.params.id;

        if (!subCategoryId) {
            return res.status(400).json({ error: 'Subcategory ID is required' });
        }

        const subcategoriesRef = db.collection('subcategories').doc(req.params.id);
        const doc = await subcategoriesRef.get();
        if (!doc.exists) {
            return res.status(404).json({ error: `No subcategory with id ${req.params.id}` });
        }
        res.status(200).json({ id: doc.id, ...doc.data() });
    } catch (error) {
        next(error);
    }
}

const getSubcategoryByName = async (req, res, next) => {
    try {
        const subcategoriesSnapshot = await db.collection('subcategories')
            .where('name', '==', req.query.name)
            .limit(1)
            .get();

        const doc = subcategoriesSnapshot.docs[0];
        if (!doc || !doc.exists) {
            console.log(`Bad Request - subcategory with name "${req.query.name}" does not exist`);
            return res.status(400).json({ message: `The subcategory with name "${req.query.name}" does not exist.` });
        }

        console.log('Subategory received successfully');
        res.status(200).json({
            id: doc.id,
            ...doc.data()
        });
    } catch (error) {
        next(error);
    }
}

const getSubcategoriesByCategoryId = async (req, res) => {
    try {
        const { categoryId } = req.params;

        if (!categoryId) {
            return res.status(400).json({ error: 'Category ID is required' });
        }

        const subcategoriesRef = db.collection('subcategories');
        const snapshot = await subcategoriesRef.where('categoryId', '==', categoryId).get();

        if (snapshot.empty) {
            return res.status(404).json({ error: `No subcategories found for category id ${categoryId}` });
        }

        const subcategories = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(subcategories);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllSubcategories,
    createSubCategories,
    updateSubCategory,
    deleteSubCategory,
    getSubCategoryById,
    getSubcategoryByName,
    getSubcategoriesByCategoryId
}
