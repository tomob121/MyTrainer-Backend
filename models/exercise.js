const mongoose = require('mongoose')
const Joi = require('joi')

const exerciseSchema = {
    title: {
        type: String,
        minLength: 3,
        maxLength: 40,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    bodyPart: {
        type: String,
        required: true
    },
}

const Exercise = mongoose.model('Exercise', mongoose.Schema(exerciseSchema))


const validateExercise = function (req) {
    const schema = Joi.object({
        title: Joi.string().min(3).max(40).required(),
        type: Joi.string().required(),
        bodyPart: Joi.string().required()
    })
    return schema.validate(req)
}

exports.Exercise = Exercise
exports.validateExercise = validateExercise
exports.exerciseSchema = exerciseSchema