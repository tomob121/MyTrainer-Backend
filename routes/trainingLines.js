const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const  validateObjectId  = require('../middleware/validateObjectId')
const { TrainingLine, validateTrainingLine, validateTrainingLineArray } = require('../models/trainingLine')


router.get('/', async (req, res) => {
    const trainingLine = await TrainingLine.find({ exerciseId: { $ne: '6384a9c95cc12ea42d040af2' } }).populate('trainingId exerciseId')
    if (!trainingLine) res.status(404).send('No TrainingLines found.')

    res.send(trainingLine)
})
router.get('/:trainingId', async (req, res) => {
    const trainingLine = await TrainingLine.find({ exerciseId: { $ne: '6384a9c95cc12ea42d040af2' } }).populate('trainingId exerciseId')
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

    const populatedNewLine = await TrainingLine.findById(newLine._id).populate('trainingId exerciseId')

    res.send(populatedNewLine)
})

router.post('/all', async (req, res) => {
    const result = validateTrainingLineArray(req.body)
    if (result.error) return res.status(400).send(result.error.details[0].message)

    let trainingLines = [...req.body]

    await TrainingLine.deleteMany({ trainingId: trainingLines[0].trainingId })

    for (const trainingLine of trainingLines) {
        const newLine = TrainingLine({
            trainingId: trainingLine.trainingId,
            exerciseId: trainingLine.exerciseId,
            reps: trainingLine.reps,
            restTime: trainingLine.restTime,
            note: trainingLine.note
        })
        await newLine.save()
    }

    const populatedNewLine = await TrainingLine.findById(newLine._id).populate('trainingId exerciseId')

    res.send(populatedNewLine)
})

router.put('/all', async (req, res) => {
    const result = validateTrainingLineArray(req.body)
    if (result.error) return res.status(400).send(result.error.details[0].message)

    let trainingLines = [...req.body]

    for (const trainingLine of trainingLines) {
        await TrainingLine.findByIdAndUpdate(trainingLine._id, {
            trainingId: trainingLine.trainingId,
            exerciseId: trainingLine.exerciseId,
            reps: trainingLine.reps,
            restTime: trainingLine.restTime,
            note: trainingLine.note
        })
    }

    const returnTrainingLInes = await TrainingLine.find({ exerciseId: { $ne: '6384a9c95cc12ea42d040af2' }, trainingId: trainingLines[0].trainingId }).populate('trainingId exerciseId')

    res.send(returnTrainingLInes)
})

router.put('/:id', async (req, res) => {
    const result = validateTrainingLine(req.body)
    if (result.error) return res.status(400).send(result.error.details[0].message)

    if (!req.params.id) return res.status(404).send('TrainingLine with the given id was not found.')

    const trainingLine = await TrainingLine.findByIdAndUpdate(req.params.id, {
        exerciseId: req.body.exerciseId,
        reps: req.body.reps,
        restTime: req.body.restTime,
        note: req.body.note
    }, { new: true })


    res.send("Updated")
})


router.delete('/:id', async (req, res) => {
    const trainingLine = await TrainingLine.findByIdAndRemove(req.params.id)
    if (!trainingLine) res.status(404).send('TrainingLine with the given id was not found.')

    return res.send(trainingLine)
})

router.delete('/all/:id', async (req, res) => {
    const trainingLine = await TrainingLine.deleteMany({ trainingId: req.params.id })
    if (!trainingLine) res.status(404).send('TrainingLine with the given id was not found.')

    // return res.send(trainingLine)
})







module.exports = router