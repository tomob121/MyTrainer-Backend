const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const mongoose = require('mongoose')
const { Exercise } = require('../models/exercise')
const validateExercise = require('../models/exercise')


const trainingSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
    },
    duration: {
        type: Number,
        min: 0,
        max: 999,
        default: 0,
    },
    timer: Array
})

const Training = mongoose.model('Training', trainingSchema)

function validateTraining(training) {
    const schema = Joi.object({
        title: Joi.string().min(0).max(50).required(),
        trainingLines: Joi.array(),
        duration: Joi.number().min(0).max(999),
        timer: Joi.array()
    })
    return schema.validate(training)
}




exports.Training = Training
exports.validateTraining = validateTraining