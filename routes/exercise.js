const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const { Exercise, validateExercise } = require('../models/exercise')
const validateObjectId = require('../middleware/validateObjectId')

router.get('/', async (req, res) => {
    const exercise = await Exercise.find().sort('name')
    res.send(exercise)
})

router.get('/:id', validateObjectId, async (req, res) => {
    const exercise = await Exercise.findById(req.params.id)
    if (!exercise) return res.status(404).send('No exercise found with the given Id')

    res.send(exercise)
})

router.post('/', async (req, res) => {
    const result = validateExercise(req.body)
    if (result.error) return res.status(400).send(result.error.details[0].message)

    const exercise = new Exercise({
        name: req.body.name,
        type: req.body.type,
        bodyPart: req.body.bodyPart
    })
    await exercise.save()
    res.send(exercise)
})

router.put('/:id', async (req, res) => {
    const result = validateExercise(req.body)

    if (result.error) return res.status(400).send(result.error.details[0].message)
    const exercise = await Exercise.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        type: req.body.type,
        bodyPart: req.body.bodyPart
    }, { new: true })

    res.send(exercise)
})

router.delete('/:id', async (req, res) => {
    const exercise = await Exercise.findByIdAndRemove(req.params.id)
    if (!exercise) return res.status(404).send('Exercise with the given id was not found')

    res.send(exercise)
})



module.exports = router