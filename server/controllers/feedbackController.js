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

        const feedbacks = [];
        snapshot.forEach((doc)=>{
            feedbacks.push({id:doc.id, ...doc.data()});
        });
        
        logger.info("Feedbacks received successfully!");
        return res.status(200).json(feedbacks);
    }
    catch (error) {
        next(error);
    }
}

const createFeedback = async(req, res, next) => {
    try {
        const { rating, authorId, userId } = req.body;

        if (!rating) {
            logger.error("rating is required.");
            return res.status(400).json({error: "rating is required."})
        }

        if (!authorId) {
            logger.error("authorId is required.");
            return res.status(400).json({error: "authorId is required."})
        }

        if (!userId) {
            logger.error("userId is required.");
            return res.status(400).json({error: "userId is required."})
        }

        const newFeedback = {
            creationDate: formatDate(new Date()),
            rating: rating,
            authorId: authorId,
            userId: userId
        };
        
        const docRef = await db.collection("feedbacks").add(newFeedback);
        logger.info(`Feedback document written with ID: ${docRef.id}`);
        return res.status(201).json(newFeedback);
    }
    catch (error) {
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
        
        logger.info("Feedback document successfully updated!");
        return res.status(200).json({ id: updatedDoc.id, ...updatedDoc.data() });
    } catch (error) {
        next(error);
    }
};

const deleteFeedback = async (req, res, next) => {
    try {
        const docRef = db.collection('feedbacks').doc(req.params.id);
        const doc = await docRef.get();
        if (!doc.exists) {
            logger.error(`feedback with id "${req.params.id}" does not exist`);
            return res.status(400).json({ error: `feedback with id "${req.params.id}" does not exist` });
        }

        logger.info("Feedback document successfully deleted.")
        await docRef.delete();
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
        
        const feedbackRef = db.collection('feedbacks').doc(id);
        const doc = await feedbackRef.get();
        
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
        
        const feedbacks = [];
        snapshot.forEach(doc => {
            feedbacks.push(doc.data());
        });

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
        
        const feedbacks = [];
        snapshot.forEach(doc => {
            feedbacks.push(doc.data());
        });

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