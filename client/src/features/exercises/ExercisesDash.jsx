import React from 'react'
import ExercisesList from './ExerciseList'
import ExercisesListFiltered from './ExerciseListFiltered'

const ExercisesDash = () => {
  return (
    <>
    <h2>Filtered</h2>
    <ExercisesListFiltered />
    <h2>List</h2>
    <ExercisesList />
    </>
  )
}

export default ExercisesDash