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
const helmet = require('helmet')
const compression = require('compression')
const cors = require('cors')

const PORT = process.env.PORT || 3000

app.use(cors())
app.use(helmet());
app.use(compression());
app.use(express.json())
app.use('/api/exercise', exercise)
app.use('/api/training', training)
app.use('/api/trainingLine', trainingLine)

mongoose.connect(config.get('db'))
    .then(() => { logger.info(`Connected to the ${config.get('db')}`) })


app.listen(PORT, () => {
    logger.info(`Listening to port ${PORT}...`)

})
