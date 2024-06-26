const admin = require('../database');

const db = admin.firestore();

const getAllUsers = async (req, res) => {
    try {
        const snapshot = await db.collection('users').get();
        const result = [];
        snapshot.forEach((doc) => {
            result.push(doc.data());
        });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createUser = async (req, res) => {
    try {
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            isAdmin: req.body.isAdmin,
            picture: req.body.picture,
            rating: req.body.rating
        };
        
        await db.collection('users').add(newUser);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateUser = async (req, res) => {
    try {
        let {
            id, name, email, phone, isAdmin, picture, rating
        } = req.body;
        const userRef = await db.collection('users').doc(id);
        let doc = await userRef.get();
        const user = doc.data();

        name ??= user.name;
        email ??= user.email;
        phone ??= user.phone;
        isAdmin ??= user.isAdmin;
        picture ??= user.picture;
        rating ??= user.rating;

        await userRef.update({
            name, email, phone, isAdmin, picture, rating
        });
        doc = await userRef.get();
        const data = doc.data();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userRef = await db.collection('users').doc(req.params.id);
        const doc = await userRef.get();
        if (!doc.data())
            return res.status(400).json({ error: `No user with id ${req.params.id}` });
        await userRef.delete();
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getUserById = async (req, res) => {
    try {
        const userRef = await db.collection('users').doc(req.params.id);
        const doc = await userRef.get();
        const response = doc.data();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    getUserById
};
