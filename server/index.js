const express = require('express')
const cors = require('cors')
const swaggerUI = require('swagger-ui-express')
const swaggerSpec = require('./swagger.js')
const serviceAccount = require('./firebase/olx-final-project-c6878-firebase-adminsdk-n6vs0-285b84551f.json')
const admin = require('./database')

const PORT = 5000

const app = express()

const db = admin.firestore();

const collectionRef = db.collection('categories');

collectionRef.get().then((snapshot) => {
    if (snapshot.empty) {
        console.log('No matching documents.');
        return;
    }

    snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
    });
}).catch((error) => {
    console.error('Error getting documents:', error);
});

app.use(express.json())
app.use(cors())

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

app.use('/categories', require('./routes/categories'));
app.use('/adverts', require('./routes/adverts'));

/**
 * @swagger
 * /test:
 *   get:
 *     summary: Test endpoint
 *     responses:
 *       200:
 *         description: Returns a greeting message.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 text:
 *                   type: string
 *                   example: Hello World!
 */
app.get("/test", async (req, res) => {
    res.json({ 'text': 'Hello World!' });
})

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve all categories
 *     responses:
 *       200:
 *         description: A JSON array of category objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   uid:
 *                     type: string
 *                   email:
 *                     type: string
 *                   displayName:
 *                     type: string
 */
app.get('/users', async (req, res) => {
    try {
        const listUsersResult = await admin.auth().listUsers();
        const users = listUsersResult.users.map(userRecord => ({
            uid: userRecord.uid,
            email: userRecord.email,
            displayName: userRecord.displayName,
        }));
        res.status(200).json(users);
    } catch (error) {
        console.error('Error listing users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// (async () => {
//     try {
//         const docRef = await db.collection("categories").add({
//             id: uuid(),
//             name: "Toys",
//             picture: "https://cdn.firstcry.com/education/2022/11/06094158/Toy-Names-For-Kids.jpg",
//         });
//         console.log("Document written with ID: ", docRef.id);
//     } catch (error) {
//         console.error("Error adding document: ", error);
//     }
// })();

app.listen(PORT, (err) => {
    if (err) console.log(err);
    console.log(`Server listening on PORT: ${PORT}`);
});
