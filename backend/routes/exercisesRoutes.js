const express = require('express')
const router = express.Router()
const exercisesController = require('../controllers/exercisesController')
// const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT)

// @route /exercises/

router.route('/')
.get(exercisesController.getAllExercises)
.post(exercisesController.createNewExercise)
.patch(exercisesController.addExerciseLoad)
.delete(exercisesController.deleteExercise)

// @route /exercises/load

router.route('/load')
.delete(exercisesController.deleteExerciseLoad)

module.exports = router