const express = require('express')
const router = express.Router()
const exercisesController = require('../controllers/exercisesController')
// const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT)

// @route /exercises/

router.route('/')
.get(exercisesController.getAllExercises)
.post(exercisesController.createNewExercise)
// need to create an edit exercise controller
.delete(exercisesController.deleteExercise)

// @route /exercises/load

router.route('/load')
.delete(exercisesController.deleteExerciseLoad)
.patch(exercisesController.addExerciseLoad)

router.route('/users')
.get(exercisesController.getUsersExercises)

module.exports = router