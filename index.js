const mongoose = require('mongoose')
const express = require('express')
require('express-async-errors')
const app = express()
const exercise = require('./routes/exercise')
const training = require('./routes/Training')
const trainingLine = require('./routes/trainingLines')
const logger = require('./middleware/logger')
require('dotenv').config()
const config = require('config')



const PORT = process.env.PORT || 3000

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(express.json())
app.use('/api/exercise', exercise)
app.use('/api/training', training)
app.use('/api/trainingLine', trainingLine)

mongoose.connect(config.get('db'))
    .then(() => { logger.info(`Connected to the ${config.get('db')}`) })


app.listen(PORT, () => {
    logger.info(`Listening to port ${PORT}...`)

})
