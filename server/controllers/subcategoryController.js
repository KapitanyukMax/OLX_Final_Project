const admin = require('../database');
const db = admin.firestore();


const getAllSubcategories = async(req, res)=>{
    try{
        const snapshot = await db.collection('subcategories').get();
        const result = [];
        snapshot.forEach((doc)=>{
            result.push({id:doc.id, ...doc.data()});
        });
        res.status(200).json(result);
    }
    catch(error){
        console.error('Error listing subcategories:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
};

const createSubCategories = async(req, res)=>{
    try{
        const newSubcategory = {
            name: req.body.name,
            picture: req.body.picture,
            categoryId: req.body.categoryId
        };
        const docRef = await db.collection("subcategories").add(newSubcategory);
        console.log("Document written with ID: ", docRef.id);
        res.status(201).json(newSubcategory);
    }
    catch(error){
        console.error('Error listing subcategories:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
};

const updateSubCategory = async(req, res)=>{
    try{
        let {id, name, picture, categoryId} = req.body;
        const subcategoriesRef = db.collection('subcategories').doc(id);
        let doc = await subcategoriesRef.get();

        if (!id) {
            return res.status(400).json({ error: 'Subcategory ID is required' });
        }
        if(!doc.exists){
            res.status(404).json({error: 'Subcategory not found'});
            return;
        }
        await subcategoriesRef.update({name, picture, categoryId});
        const updateDoc = await subcategoriesRef.get();
        res.status(200).json(updateDoc.data());
    }
    catch(error){
        console.error('Error listing subcategories:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
};


const deleteSubCategory = async (req, res) => {
    try {
        const subCategoryId = req.params.id;

        if (!id) {
            return res.status(400).json({ error: 'Subcategory ID is required' });
        }

        const subCategoryRef = db.collection('subcategories').doc(subCategoryId);
        const doc = await subCategoryRef.get();

        if (!doc.data()) {
            return res.status(400).json({ error: `No subcategory with id ${subCategoryId}` });
        }

        const subCategoryData = doc.data();

        await subCategoryRef.delete();
        const categoryRef = db.collection('categories').doc(subCategoryData.categoryId);
        
        await categoryRef.update({
            subCategoryIds: admin.firestore.FieldValue.arrayRemove(id)
        });

        res.sendStatus(204);
    } catch (error) {
        console.error('Error deleting subcategory:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
const getSubCategoryById= async(req, res)=>{
    try {

        if (!id) {
            return res.status(400).json({ error: 'Subcategory ID is required' });
        }
        
        const subcategoriesRef = db.collection('subcategories').doc(req.params.id);
        const doc = await subcategoriesRef.get();
        if (!doc.exists) {
            return res.status(404).json({ error: `No subcategory with id ${req.params.id}` });
        }
        res.status(200).json({ id: doc.id, ...doc.data() });
    } catch (error) {
        console.error('Error getting subcategory:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports = {
    getAllSubcategories,
    createSubCategories,
    updateSubCategory,
    deleteSubCategory,
    getSubCategoryById
}
