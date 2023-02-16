const Exercise = require('../models/Exercise')
const User = require('../models/User')
const mongoose = require('mongoose')
const { aggregate } = require('../models/Note')


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

//@route GET /exercises/:id

const getUsersExercises = async (req, res) => {

    // get the id from the url
    const { id } = req.params

    // find Exercises that match the user
    const exercises = await Exercise.aggregate([
        {
            $match: { userById: mongoose.Types.ObjectId(id)}
        }
    ])

    if (!exercises?.length) {
        return res.status(400).json({message: "We can't find any exercises that match the user Id"})
    }

    return res.json(exercises)

}

// @Desc create an exercise
// @route POST /exercises
// @access Private
// @requires user, id, name
// @optional description, load

const createNewExercise = async (req, res) => {
    const { user, id, name, description, load } = req.body

    //add this line as a check to validate if object id for user exists in the database or not
    if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ msg: `No objectId in the database with id :${id}` });

    // find user by username string
    const userIsValid = await User.findOne({user})

    if (!userIsValid) {
        return res.status(404).json({ msg: `No user with name : ${user}` });
    }

    // Confirm data of username by string and exercise name by string
    if (!user || !name) {
        return res.status(400).json({ message: 'Make sure you are logged in and provide an exercise name' })
    }

    // find User in mongodb and store its objectId
    const userById = await User.findById(id).lean().exec()

    // Check for duplicate entry for user
    const duplicate = await Exercise.findOne({ name }).collation({locale: 'en', strength: 2}).lean().exec()

    if (duplicate === userById) {
        return res.status(409).json({ message: 'Duplicate exercise title' })
    }

    // aggregate exercises for user
    const exercisesForUser = await Exercise.aggregate([
        {
            $match: { userById: mongoose.Types.ObjectId(id)}
        }
    ])

    const existingTrackedExercise = exercisesForUser.filter(exercise => exercise.name === name)
    console.log(existingTrackedExercise)

    if (existingTrackedExercise.length) {
        return res.status(409).json({ message: 'You are already tracking this exercise' })
    }

    if (!userById) {
        return res.status(404).json({ msg: `No user with id : ${user}` });
    }

    // Create and store the new exercise
    const newExercise = await Exercise.create({ userById, name, description, load })

    if (newExercise) { // Created
        return res.status(201).json({ message: 'New exercise created', newExercise })
    } else {
        return res.status(400).json({ message: 'Invalid exercise data received' })
    }

}

// @desc Update a user exercise
// @route PATCH /exercises
// @access Private
const updateUserExercise = async (req, res) => {
    const { id, user, name, description } = req.body

    // Confirm data
    if (!id || !user || !name) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Confirm note exists to update
    const exercise = await Exercise.findById(id).exec()

    if (!exercise) {
        return res.status(400).json({ message: 'Note not found' })
    }

    exercise.name = name
    exercise.description = description

    const updatedExercise = await exercise.save()

    res.json(`'${updatedExercise}' updated`)
}

// @desc Update an exercise with new load
// @route PATCH /exercises/load
// @access Private
const addExerciseLoad = async (req, res) => {
    const { id, user, load, reps, note } = req.body

    // Confirm data
    if (!id || !user || !load) {
        return res.status(400).json({ message: `All fields are required: id: ${id} + user: ${user} + load: ${load} `  })
    }

    // Confirm note exists to update
    const exercise = await Exercise.findById(id).exec()

    if (!exercise) {
        return res.status(400).json({ message: 'Note not found' })
    }

    const newLoad = {load, reps, note}

    let updatedExercise = exercise.loads.push(newLoad)

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
    getUsersExercises,
    createNewExercise,
    updateUserExercise,
    addExerciseLoad,
    deleteExerciseLoad,
    deleteExercise,


}