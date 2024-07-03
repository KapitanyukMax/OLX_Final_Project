const admin = require('../database');
const db = admin.firestore();
const { formatDate } = require('../utils/dateUtils')


const getAllFeedbacks = async(req, res, next) => {
    try{
        const snapshot = await db.collection('feedbacks').get();
        const result = [];
        snapshot.forEach((doc)=>{
            result.push({id:doc.id, ...doc.data()});
        });
        res.status(200).json(result);
    }
    catch(error){
        next(error);
    }
}

const createFeedback = async(req, res, next) => {
    try{
        const newFeedback = {
            creationDate: formatDate(new Date()),
            rating: req.body.rating,
            authorId: req.body.authorId,
            userId: req.body.userId
        };
        const docRef = await db.collection("feedbacks").add(newFeedback);
        console.log("Document written with ID: ", docRef.id);
        res.status(201).json(newFeedback);
    }
    catch(error){
        next(error);
    }
};

const updateFeedback = async (req, res, next) => {
    try {
        const { id, rating, authorId, userId } = req.body;
        const creationDate = req.body.creationDate ? new Date(req.body.creationDate) : undefined;

        if (!id) {
            return res.status(400).json({ error: 'Feedback ID is required' });
        }

        const feedbackRef = db.collection('feedbacks').doc(id);
        const doc = await feedbackRef.get();

        if (!doc.exists) {
            return res.status(404).json({ error: `No feedback with id ${id}` });
        }

        const updatedFeedback = {};
        if (rating !== undefined) updatedFeedback.rating = rating;
        if (creationDate !== undefined) updatedFeedback.creationDate = creationDate;
        if (authorId !== undefined) updatedFeedback.authorId = authorId;
        if (userId !== undefined) updatedFeedback.userId = userId;

        await feedbackRef.update(updatedFeedback);
        const updatedDoc = await feedbackRef.get();
        res.status(200).json({ id: updatedDoc.id, ...updatedDoc.data() });
    } catch (error) {
        next(error);
    }
};

const deleteFeedback = async (req, res, error) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'Feedback ID is required' });
        }

        const feedbackRef = db.collection('feedbacks').doc(id);
        const doc = await feedbackRef.get();

        if (!doc.exists) {
            return res.status(404).json({ error: `No feedback with id ${id}` });
        }

        await feedbackRef.delete();
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};

const getFeedbackById = async (req, res, next) => {
    try {
        console.log(req.params);
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'Feedback ID is required' });
        }
        
        const feedbackRef = db.collection('feedbacks').doc(id);
        const doc = await feedbackRef.get();

        if (!doc.exists) {
            return res.status(404).json({ error: `No feedback with id ${id}` });
        }

        res.status(200).json({ id: doc.id, ...doc.data() });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllFeedbacks,
    createFeedback,
    updateFeedback,
    deleteFeedback,
    getFeedbackById
}