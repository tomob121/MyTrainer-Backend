const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const { Training, validateTraining } = require('../models/training')
const validateObjectId = require('../middleware/validateObjectId')

router.get('/', async (req, res) => {
    const training = await Training.find().sort('title')
    if (!training) res.status(404).send('No trainings found')

    res.send(training)
})

router.get('/:id',[validateObjectId], async (req, res) => {
    const training = await Training.findById(req.params.id)
    
    if (!training) return res.status(404).send('No training found with the given Id')

    res.send(training)
})

router.post('/', async (req, res) => {
    const result = validateTraining(req.body)
    if (result.error) return res.status(400).send(result.error.details[0].message)

    const training = new Training({
        title: req.body.title,
    })
    await training.save()
    res.send(training)
})

router.put('/:id', async (req, res) => {
    const result = validateTraining(req.body)
    if (result.error) return res.status(400).send(result.error.details[0].message)

    const training = await Training.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        trainingLines: req.body.trainingLines,
        duration: req.body.duration,
        timer: req.body.timer
    }, { new: true })

    res.send(training)
})

router.delete('/:id', async (req, res) => {
    const exercise = await Training.findByIdAndRemove(req.params.id)
    if (!exercise) return res.status(404).send('Exercise with the given id was not found')

    res.send(exercise)
})

module.exports = router