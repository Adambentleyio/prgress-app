const Exercise = require('../models/Exercise')
const User = require('../models/User')
const mongoose = require('mongoose')


// @Desc get all exercises
// @route GET /exercises
// @access Private

const getAllExercises = async (req, res) => {
    const exercises = await Exercise.find().lean()

    if (!exercises?.length) {
        return res.status(400).json({message: "We can't find any exercises"})
    }

    return res.json(exercises)

}

// @Desc create an exercise
// @route POST /exercises
// @access Private

const createNewExercise = async (req, res) => {
    const { user, id, name, description, load } = req.body

    //add this line as a check to validate if object id exists in the database or not
    // if (!mongoose.Types.ObjectId.isValid(id))
    // return res.status(404).json({ msg: `No objectId in the database with id :${id}` });

    // find user
    const userIsValid = await User.findOne({user})
    if (!userIsValid) {
        return res.status(404).json({ msg: `No user with name : ${user}` });
    }

    // Confirm data
    if (!user || !name) {
        return res.status(400).json({ message: 'Make sure you are logged in and provide an exercise name' })
    }

    // Check for duplicate title
    const duplicate = await Exercise.findOne({ name }).collation({locale: 'en', strength: 2}).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate exercise title' })
    }

    // find User in mongodb and store its objectId
    const userById = await User.findById(id).lean().exec()

    if (!userById) {
        return res.status(404).json({ msg: `No user with id : ${user}` });
    }

    // Create and store the new user
    const newExercise = await Exercise.create({ userById, name, description, load })

    if (newExercise) { // Created
        return res.status(201).json({ message: 'New exercise created' })
    } else {
        return res.status(400).json({ message: 'Invalid exercise data received' })
    }

}

// @desc Update an exercise with new load
// @route PATCH /exercises/load
// @access Private
const addExerciseLoad = async (req, res) => {
    const { id, user, load } = req.body

    // Confirm data
    if (!id || !user || !load) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Confirm note exists to update
    const exercise = await Exercise.findById(id).exec()

    if (!exercise) {
        return res.status(400).json({ message: 'Note not found' })
    }

    let updatedExercise = exercise.loads.push(load)

    updatedExercise = await exercise.save()

    res.json(`'${updatedExercise}' updated`)
}



// @desc Delete an exercise
// @route DELETE /exercises
// @access Private

const deleteExercise = async (req, res) => {

    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Exercise ID required' })
    }

    // Confirm exercise exists to delete
    const exercise = await Exercise.findById(id).exec()

    if (!exercise) {
        return res.status(400).json({ message: 'Exercise not found' })
    }

    const result = await exercise.remove()

    if (result) {
        return res.json({ message: 'Exercise deleted' })
    } else {
        return res.status(400).json({ message: 'Exercise not deleted' })
    }
}


// @desc Delete exercise load
// @route DELETE /exercises/load/
// @access Private
const deleteExerciseLoad = async (req, res) => {
    const { exerciseId, loadId } = req.body

    // Confirm data
    if (!exerciseId, !loadId) {
        return res.status(400).json({ message: 'Exercise and Load ID required' })
    }

    // Confirm exercise exists to delete
    const exerciseById = await Exercise.findById(exerciseId).exec()

    // if (exerciseById) {
    //      res.json(exerciseById)
    // }

    if (!exerciseById) {
        return res.status(400).json({ message: 'Exercise not found' })
    }

    const result = exerciseById.loads

    if (result) return res.json(result)

    const loadItem = result.select

    if (!result.length) {
        return res.status(400).json({message: "Load by exerciseId can't be found"})
    }

    const reply = `Load '${result.title}' with ID ${result._id} deleted`

    res.json(reply)
}

module.exports = {
    getAllExercises,
    createNewExercise,
    addExerciseLoad,
    deleteExerciseLoad,
    deleteExercise

}