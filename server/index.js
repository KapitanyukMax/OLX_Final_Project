const express = require('express')
const cors = require('cors')
const swaggerUI = require('swagger-ui-express')
const swaggerSpec = require('./swagger')
const requestLogger = require('./middleware/requestLogger')
const errorHandler = require('./middleware/errorHandler')

const PORT = 5000;

const app = express();

app.use(express.json());
app.use(cors());

app.use(requestLogger);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use('/categories', require('./routes/categories'));
app.use('/adverts', require('./routes/adverts'));
app.use('/subcategories', require('./routes/subcategories.js'));
app.use('/users', require('./routes/users'));
app.use('/messages', require('./routes/messages.js'));
app.use('/chats', require('./routes/chats.js'));

app.use(errorHandler);

app.listen(PORT, (err) => {
    if (err) console.log(err);
    console.log(`Server listening on PORT: ${PORT}`);
});
