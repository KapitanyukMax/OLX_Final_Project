const express = require('express')
const cors = require('cors')
const swaggerUI = require('swagger-ui-express')
const swaggerSpec = require('./swagger.js')
const admin = require('./database')

const PORT = 5000

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

app.use('/categories', require('./routes/categories'));
app.use('/adverts', require('./routes/adverts'));
app.use('/subcategories', require('./routes/subcategories.js'));
app.use('/users', require('./routes/users.js'));
app.use('/messages', require('./routes/messages.js'));
app.use('/chats', require('./routes/chats.js'));

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

app.listen(PORT, (err) => {
    if (err) console.log(err);
    console.log(`Server listening on PORT: ${PORT}`);
});
