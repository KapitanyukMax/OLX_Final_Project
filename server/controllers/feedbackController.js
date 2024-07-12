const admin = require('../database');
const logger = require('../logger/logger');
const db = admin.firestore();
const { formatDate } = require('../utils/dateUtils')


const getAllFeedbacks = async(req, res, next) => {
    try {
        const snapshot = await db.collection('feedbacks').get();

        if (snapshot.empty) {
            logger.error("No matching feedback documents.");
            return res.status(400).json({ error: 'No matching feedback documents.' });
        }

        const feedbacks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        logger.info("Feedbacks received successfully!");
        return res.status(200).json(feedbacks);
    }
    catch (error) {
        next(error);
    }
}

const createFeedback = async(req, res, next) => {
    try {
        const feedback = req.body;
        const docRef = await db.collection('feedbacks').add(feedback);

        logger.info(`Feedback document written with ID: ${docRef.id}`);
        res.status(201).send(`Feedback created with ID: ${docRef.id}`);
    }
    catch (error) {
        next(error);
    }
};

const updateFeedback = async (req, res, next) => {
    try {
        const feedback = req.body;
        await db.collection('feedbacks').doc(req.body.id).update(feedback);
        
        logger.info("Feedback document successfully updated!");
        return res.status(200).json({ id: feedback.id, ...feedback.data() });
    } catch (error) {
        next(error);
    }
};

const deleteFeedback = async (req, res, next) => {
    try {
        await db.collection('feedbacks').doc(req.params.id).delete();

        logger.info("Feedback document successfully deleted.")
        res.sendStatus(200);
    } catch (error) {
        next(error);
    }
};

const getFeedbackById = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'Feedback ID is required' });
        }
        
        const doc = await db.collection('feedbacks').doc(id).get();
        
        if (!doc.exists) {
            logger.error(`No matching feedback document with id: ${id}`);
            return res.status(404).json({ error: `No feedback with id ${id}` });
        }

        res.status(200).json({ id: doc.id, ...doc.data() });
    } catch (error) {
        next(error);
    }
};

const getFeedbacksByUserId = async (req, res, next) => {
    try {
        const snapshot = await db.collection("feedbacks").where("userId", "==", req.query.userId).get();

        if (snapshot.empty) {
            logger.error('No matching documents.');
            return res.status(400).json({ message: "No matching documents." });
        }
        
        const feedbacks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        logger.info("Feedbacks received successfully!");
        return res.status(200).json(feedbacks);
    } catch (error) {
        next(error);
    }
}

const getFeedbacksByAuthorId = async (req, res, next) => {
    try {
        const snapshot = await db.collection("feedbacks").where("authorId", "==", req.query.authorId).get();

        if (snapshot.empty) {
            logger.error('No matching documents.');
            return res.status(400).json({ message: "No matching documents." });
        }
        
        const feedbacks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        logger.info("Feedbacks received successfully!");
        return res.status(200).json(feedbacks);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllFeedbacks,
    createFeedback,
    updateFeedback,
    deleteFeedback,
    getFeedbackById,
    getFeedbacksByUserId,
    getFeedbacksByAuthorId
}