const admin = require('../database');
const db = admin.firestore();
const { formatDate } = require('../utils/dateUtils')


const getAllMessages = async(req, res, next)=>{
    try{
        const snapshot = await db.collection('messages').get();
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


const createMessage = async(req, res,next)=>{
    try{
        const newMessage = {
            text: req.body.text,
            sendingDate: formatDate(new Date()),
            authorId: req.body.authorId,
            chatId: req.body.chatId
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
        const { id, text, authorId, chatId } = req.body;
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

module.exports ={
    getAllMessages,
    createMessage,
    updateMessage,
    deleteMessage,
    getMessageById
}