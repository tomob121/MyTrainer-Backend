const mongoose = require('mongoose')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)


const trainingLineDataSchema = mongoose.Schema({
    trainingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Training',
        default: '6384a9c95cc12ea42d040af2'
    },
    exerciseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exercise',
        default: '6384a9c95cc12ea42d040af2'
    },
    reps: {
        type: Number,
        default: 0
    },
    restTime: {
        type: Number,
        default: 0
    },
    note: {
        type: String,
        minLenght: 0,
        maxLenght: 50,
        default: ''
    }
},)


const TrainingLine = mongoose.model('TrainingLine', trainingLineDataSchema)


function validateTrainingLine(training) {
    const schema = Joi.object({
        _id: Joi.objectId(),
        trainingId: Joi.objectId().required(),
        exerciseId: Joi.objectId(),
        reps: Joi.number(),
        restTime: Joi.number(),
        note: Joi.string().max(50).min(0)
    })
    return schema.validate(training)
}
function validateTrainingLineArray(training) {
    const schema = Joi.array().items(Joi.object(
        {
            _id: Joi.objectId(),
            trainingId: Joi.objectId().required(),
            exerciseId: Joi.objectId(),
            reps: Joi.number(),
            restTime: Joi.number(),
            note: Joi.string().max(50).min(0)
        }
    ))
    return schema.validate(training)
}

exports.TrainingLine = TrainingLine
exports.validateTrainingLine = validateTrainingLine
exports.validateTrainingLineArray = validateTrainingLineArray