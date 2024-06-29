const admin = require('../database');
const db = admin.firestore();


const getAllMessages = async(req, res)=>{
    try{
        const snapshot = await db.collection('messages').get();
        const result = [];
        snapshot.forEach((doc)=>{
            result.push({id:doc.id, ...doc.data()});
        });
        res.status(200).json(result);
    }
    catch(error){
        console.error('Error listing messages:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }

}


const createMessage = async(req, res)=>{
    const formatDate = (date) => {
        const pad = (num) => num.toString().padStart(2, '0');

        const year = date.getFullYear();
        const month = pad(date.getMonth() + 1);
        const day = pad(date.getDate());
        const hours = pad(date.getHours());
        const minutes = pad(date.getMinutes());
        const seconds = pad(date.getSeconds());

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };
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
        console.error('Error creating message:', error);
        res.status(500).json({error: 'Internal Server Error'});
    
    }
};

const updateMessage = async (req, res) => {
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
        console.error('Error updating message:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteMessage = async (req, res) => {
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
        console.error('Error deleting message:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getMessageById = async (req, res) => {
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
        console.error('Error getting message:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports ={
    getAllMessages,
    createMessage,
    updateMessage,
    deleteMessage,
    getMessageById
}