const express = require('express')
const cors = require('cors')
// const { initializeApp, cert } = require('firebase-admin/app')
const swaggerUI = require('swagger-ui-express')
const swaggerSpec = require('./swagger.js')
const admin = require("firebase-admin")
const serviceAccount = require('./firebase/olx-final-project-c6878-firebase-adminsdk-n6vs0-285b84551f.json')

const PORT = 5000

const app = express()

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

app.use(express.json())
app.use(cors())

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

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
app.get("/test", (req, res) => {
  res.json({ "text": "Hello World!" });
})

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve all users
 *     responses:
 *       200:
 *         description: A JSON array of user objects
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
app.get('/users', async(req, res) => {
    try{
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
})

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Server listening on PORT: ${PORT}`);
});