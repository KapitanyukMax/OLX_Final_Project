const admin = require('../database');
const db = admin.firestore();
const { formatDate } = require('../utils/dateUtils')


const createMessage = async(req, res,next)=>{
    try{
        const newMessage = {
            text: req.body.text,
            sendingDate: formatDate(new Date()),
            authorId: req.body.authorId,
            chatId: req.body.chatId,
            advertId: req.body.advertId,
        };
        const docRef = await db.collection("messages").add(newMessage);
        console.log("Document written with ID: ", docRef.id);
        res.status(201).json(newMessage);
    }
    catch(error){
        next(error);
    
    }
};

const updateMessage = async (req, res,next) => {
    try {
        const { id, text, authorId, chatId, advertId } = req.body;
        const sendingDate = req.body.sendingDate ? new Date(req.body.sendingDate) : undefined;
        

        if (!id) {
            return res.status(400).json({ error: 'Message ID is required' });
        }

        const messageRef = db.collection('messages').doc(id);
        const doc = await messageRef.get();

        if (!doc.exists) {
            return res.status(404).json({ error: `No message with id ${id}` });
        }

        const updatedMessage = {};
        if (text !== undefined) updatedMessage.text = text;
        if (sendingDate !== undefined) updatedMessage.sendingDate = sendingDate;
        if (authorId !== undefined) updatedMessage.authorId = authorId;
        if (chatId !== undefined) updatedMessage.chatId = chatId;
        if(advertId!== undefined) updatedMessage.advertId = advertId;

        await messageRef.update(updatedMessage);
        const updatedDoc = await messageRef.get();
        res.status(200).json({ id: updatedDoc.id, ...updatedDoc.data() });
    } catch (error) {
        next(error);
    }
};

const deleteMessage = async (req, res,error) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'Message ID is required' });
        }

        const messageRef = db.collection('messages').doc(id);
        const doc = await messageRef.get();

        if (!doc.exists) {
            return res.status(404).json({ error: `No message with id ${id}` });
        }

        await messageRef.delete();
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};

const getMessageById = async (req, res,next) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'Message ID is required' });
        }
        
        const messageRef = db.collection('messages').doc(id);
        const doc = await messageRef.get();

        if (!doc.exists) {
            return res.status(404).json({ error: `No message with id ${id}` });
        }

        res.status(200).json({ id: doc.id, ...doc.data() });
    } catch (error) {
        next(error);
    }
};

const getMessagesByChatId = async (req, res, next) => {
    try {
        const chatId = req.params.chatId;

        if (!chatId) {
            return res.status(400).json({ error: 'Chat ID is required' });
        }

        const messagesRef = db.collection('messages').where('chatId', '==', chatId);
        const snapshot = await messagesRef.get();

        if (snapshot.empty) {
            return res.status(404).json({ error: 'No messages found for this chat' });
        }

        const messages = snapshot.docs.map(doc => doc.data());
        res.status(200).json(messages);
    } catch (error) {
        next(error);
    }
};


module.exports ={
    createMessage,
    updateMessage,
    deleteMessage,
    getMessageById,
    getMessagesByChatId
}