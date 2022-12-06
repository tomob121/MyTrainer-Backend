const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const { TrainingLine, validateTrainingLine } = require('../models/trainingLine')


router.get('/', async (req, res) => {
    const trainingLine = await TrainingLine.find().populate('trainingId exerciseId')
    if (!trainingLine) res.status(404).send('No TrainingLines found.')

    res.send(trainingLine)
})
router.get('/:trainingId', async (req, res) => {
    const trainingLine = await TrainingLine.find().populate('trainingId exerciseId')
    if (!trainingLine) res.status(404).send('No TrainingLines found.')
    let filtered = trainingLine.filter(tl => tl.trainingId._id == req.params.trainingId)

    res.send(filtered)
})

router.post('/', async (req, res) => {
    const result = validateTrainingLine(req.body)
    if (result.error) return res.status(400).send(result.error.details[0].message)

    const newLine = TrainingLine({
        trainingId: req.body.trainingId
    })

    await newLine.save()

    res.send(newLine)
})

router.put('/', async (req, res) => {
    const result = validateTrainingLine(req.body)
    if (result.error) return res.status(400).send(result.error.details[0].message)
    console.log(req.body.id)
    if (!req.body.id) return res.status(404).send('TrainingLine with the given id was not found.')

    const trainingLine = await TrainingLine.findByIdAndUpdate(req.body.id, {
        exerciseId: req.body.exerciseId,
        reps: req.body.reps,
        restTime: req.body.restTime,
        note: req.body.note
    }, { new: true })


    res.send(trainingLine)
})

router.delete('/', async (req, res) => {
    const trainingLine = await TrainingLine.findByIdAndRemove(req.body.id)
    if (!trainingLine) res.status(404).send('TrainingLine with the given id was not found.')

    res.send(trainingLine)
})







module.exports = router