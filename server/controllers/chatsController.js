const admin = require('../database');
const db = admin.firestore();


const getAllChats = async(req, res,next)=>{
    try{
        const snapshot = await db.collection('chats').get();
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


const createChat = async(req, res,next)=>{
    try{
        const newChat = {
            buyerId: req.body.buyerId,
            sellerId : req.body.sellerId,
            messageIds : []
        };
        const docRef = await db.collection("chats").add(newChat);
        console.log("Document written with ID: ", docRef.id);
        res.status(201).json(newChat);
    }
    catch(error){
        next(error);
    }
};


const updateChat = async(req, res,next)=>{
    try{
        let {id, buyerId, sellerId, messageIds} = req.body;
        const chatRef = db.collection('chats').doc(id);
        let doc = await chatRef.get();

        if (!id) {
            return res.status(400).json({ error: 'Chat ID is required' });
        }
        if(!doc.exists){
            res.status(404).json({error: 'Chat not found'});
            return;
        }
        await chatRef.update({buyerId, sellerId, messageIds});
        const updateDoc = await chatRef.get();
        res.status(200).json(updateDoc.data());
    }
    catch(error){
        next(error);
    }
};


const deleteChat = async (req, res,next) => {
    try {
        const chatId = req.params.id;

        if (!chatId) {
            console.error('Chat ID is required');
            return res.status(400).json({ error: 'Chat ID is required' });
        }

        const chatRef = db.collection('chats').doc(chatId);
        const doc = await chatRef.get();

        if (!doc.exists) {
            console.error(`No chat with id ${chatId}`);
            return res.status(404).json({ error: `No chat with id ${chatId}` });
        }

        const chatData = doc.data();
        console.log('Chat data:', chatData);

        await chatRef.delete();

        if (Array.isArray(chatData.messageIds)) {
            console.log('Message IDs:', chatData.messageIds);

            const messageRefs = chatData.messageIds.map(messageId => db.collection('messages').doc(messageId));
            
            for (const messageRef of messageRefs) {
                await messageRef.delete();
            }
        } else {
            console.warn(`Expected messageIds to be an array, but got ${typeof chatData.messageIds}`);
        }

        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};


const getChatById = async (req, res,next) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'Chat ID is required' });
        }

        const chatRef = db.collection('chats').doc(id);
        const doc = await chatRef.get();

        if (!doc.exists) {
            return res.status(404).json({ error: `No chat with id ${id}` });
        }

        res.status(200).json({ id: doc.id, ...doc.data() });
    } catch (error) {
        next(error);
    }
};



module.exports = {
    getAllChats,
    createChat,
    updateChat,
    deleteChat,
    getChatById
}