const admin = require('../database');
const logger = require('../logger/logger');

const db = admin.firestore();

const getAllAdvertsFromFavorites = async (req, res, next) => {
    try {
        const { userId, limit = 10, startAfter, searchTerm, city, sortBy = 'creationDate', sortOrder = 'desc' } = req.query;

        if (!userId) {
            return res.status(400).json({ message: 'userId is required' });
        }

        const favouritesRef = db.collection('favorites').where('userId', '==', userId);
        const docSnap = await favouritesRef.get();

        if (docSnap.docs.length === 0) {
            return res.status(404).json({ message: 'No favourites found for this user' });
        }

        const result = [];

        const advertPromises = docSnap.docs.map(async (doc) => {
            const data = doc.data();
            const advertIds = data.advertIds || [];

            if (advertIds.length === 0) {
                return null;
            }

            const advertDataPromises = advertIds.map(async (advertId) => {
                let advertRef = db.collection('adverts').doc(advertId);

                if (startAfter) {
                    const lastDoc = await db.collection('adverts').doc(startAfter).get();
                    if (lastDoc.exists) {
                        advertRef = advertRef.startAfter(lastDoc);
                    }
                }

                const advertDoc = await advertRef.get();

                if (advertDoc.exists) {
                    const advertData = advertDoc.data();

                    const matchesSearchTerm = searchTerm ? advertData.name.toLowerCase().includes(searchTerm.toLowerCase()) : true;
                    const matchesCity = city ? advertData.location.toLowerCase().includes(city.toLowerCase()) : true;

                    if (matchesSearchTerm && matchesCity) {
                        return {
                            id: advertId,
                            ...advertData
                        };
                    }
                }
                return null;
            });

            const adverts = await Promise.all(advertDataPromises);
            result.push(...adverts.filter(advert => advert !== null));
        });

        await Promise.all(advertPromises);

        result.sort((a, b) => {
            const fieldA = a[sortBy];
            const fieldB = b[sortBy];
            if (sortOrder === 'desc') {
                return fieldA < fieldB ? 1 : -1;
            }
            return fieldA > fieldB ? 1 : -1;
        });

        const limitedResult = result.slice(0, limit);

        logger.info('Adverts received successfully');
        return res.status(200).json({ adverts: limitedResult, totalCount: result.length });
    } catch (error) {
        next(error);
    }
};

const addAdvertToFavorites = async (req, res, next) => {
    try {
        const { userId, advertId } = req.query;

        if (!userId || !advertId) {
            return res.status(400).json({ message: 'userId and advertId are required' });
        }

        const favouritesRef = db.collection('favorites').where('userId', '==', userId);
        const docSnap = await favouritesRef.get();

        if (docSnap.empty) {
            await db.collection('favorites').add({ userId, advertIds: [advertId] });
        } else {
            const doc = docSnap.docs[0];
            const data = doc.data();
            const advertIds = data.advertIds || [];

            if (!advertIds.includes(advertId)) {
                advertIds.push(advertId);
                await doc.ref.update({ advertIds });
            } else {
                return res.status(400).json({ message: 'Advert is already in favorites' });
            }
        }

        logger.info('Advert added to favorites successfully');
        return res.status(200).json({ message: 'Advert added to favorites' });
    } catch (error) {
        next(error);
    }
};

const removeAdvertFromFavorites = async (req, res, next) => {
    try {
        const { userId, advertId } = req.query;

        if (!userId || !advertId) {
            return res.status(400).json({ message: 'userId and advertId are required' });
        }

        const favouritesRef = db.collection('favorites').where('userId', '==', userId);
        const docSnap = await favouritesRef.get();

        if (docSnap.empty) {
            return res.status(404).json({ message: 'No favorites found for this user' });
        }

        const doc = docSnap.docs[0];
        const data = doc.data();
        const advertIds = data.advertIds || [];

        if (advertIds.includes(advertId)) {
            const updatedAdvertIds = advertIds.filter(id => id !== advertId);
            await doc.ref.update({ advertIds: updatedAdvertIds });
            logger.info('Advert removed from favorites successfully');
            return res.status(200).json({ message: 'Advert removed from favorites' });
        } else {
            return res.status(404).json({ message: 'Advert not found in favorites' });
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllAdvertsFromFavorites,
    addAdvertToFavorites,
    removeAdvertFromFavorites,
};