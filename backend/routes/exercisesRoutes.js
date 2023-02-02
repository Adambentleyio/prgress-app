const express = require('express')
const router = express.Router()
const exercisesController = require('../controllers/exercisesController')
// const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT)

// @route /exercises/

router.route('/')
.get(exercisesController.getAllExercises)
.post(exercisesController.createNewExercise)
.patch(exercisesController.updateUserExercise)
.delete(exercisesController.deleteExercise)

// @route /exercises/load

router.route('/load')
.delete(exercisesController.deleteExerciseLoad)
.patch(exercisesController.addExerciseLoad)

// @route /exercises/:id
router.route('/:id')
.get(exercisesController.getUsersExercises)

module.exports = router