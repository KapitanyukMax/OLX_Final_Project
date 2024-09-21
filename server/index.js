const express = require('express')
const cors = require('cors')
const requestLogger = require('./middleware/requestLogger')
const errorHandler = require('./middleware/errorHandler')
const logger = require('./logger/logger')

const PORT = 5000;

const app = express();

app.use(express.json());
app.use(cors());

app.use(requestLogger);

app.use('/categories', require('./routes/categories'));
app.use('/adverts', require('./routes/adverts'));
app.use('/subcategories', require('./routes/subcategories.js'));
app.use('/users', require('./routes/users'));
app.use('/messages', require('./routes/messages.js'));
app.use('/chats', require('./routes/chats.js'));
app.use('/feedbacks', require('./routes/feedbacks.js'));
app.use('/wallets', require('./routes/wallets.js'));
app.use('/cities', require('./routes/cities.js'));
app.use('/currencies', require('./routes/currencies.js'));
app.use('/resetPass', require('./routes/resetPass.js'));
app.use(errorHandler);


app.listen(PORT, (err) => {
    if (err) {
        const message = err?.message ?? 'Unknown server error';
        logger.error(message);
        res.status(500).json({ message });
    }
    console.log(`Server listening on PORT: ${PORT}`);
});
