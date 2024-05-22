const express = require('express')
const cors = require('cors')

const PORT = 5000

const app = express()

app.use(express.json())
app.use(cors())

app.get("/test", (req, res) => {
    res.json({"text": "Hello World!"});
})

app.listen(PORT, (err) => {
    if (err) console.log(err);
    console.log(`Server listening on PORT: ${PORT}`);
});