const admin = require('../database');
const logger = require('../logger/logger');
const db = admin.firestore();

const getAllAdvertReports = async(req, res, next) => {
    try {
        const snapshot = await db.collection('advertReports').get();

        if (snapshot.empty) {
            logger.error("No matching advertReports documents.");
            return res.status(400).json({ error: 'No matching advertReports documents.' });
        }

        const reports = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        logger.info("advertReports received successfully!");
        return res.status(200).json(reports);
    }
    catch (error) {
        next(error);
    }
}

const createAdvertReport = async(req, res, next) => {
    try {
        const report = req.body;
        const docRef = await db.collection('advertReports').add(report);

        logger.info(`AdvertReport document written with ID: ${docRef.id}`);
        res.status(201).send(`AdvertReport created with ID: ${docRef.id}`);
    }
    catch (error) {
        next(error);
    }
};

const deleteAdvertReport = async (req, res, next) => {
    try {
        await db.collection('advertReports').doc(req.params.id).delete();

        logger.info("AdvertReport document successfully deleted.")
        res.sendStatus(200);
    } catch (error) {
        next(error);
    }
};

const getAdvertReportById = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'AdvertReport ID is required' });
        }
        
        const doc = await db.collection('advertReports').doc(id).get();
        
        if (!doc.exists) {
            logger.error(`No matching AdvertReport document with id: ${id}`);
            return res.status(404).json({ error: `No AdvertReport with id ${id}` });
        }

        res.status(200).json({ id: doc.id, ...doc.data() });
    } catch (error) {
        next(error);
    }
};

const getAdvertReportByUserId = async (req, res, next) => {
    try {
        const snapshot = await db.collection("advertReports").where("userId", "==", req.query.userId).get();

        if (snapshot.empty) {
            logger.error('No matching documents.');
            return res.status(400).json({ message: "No matching documents." });
        }
        
        const reports = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        logger.info("AdvertReport received successfully!");
        return res.status(200).json(reports);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllAdvertReports,
    getAdvertReportById,
    createAdvertReport,
    deleteAdvertReport,
    getAdvertReportByUserId
}