import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import ExercisesListFiltered from '../features/exercises/ExerciseListFiltered'
import ExercisesList from '../features/exercises/ExerciseList'

const Welcome = () => {

  const {isManager, isAdmin, status, username} = useAuth()



  return (
    <div className='max-w-7xl mx-auto'>
    <h2 className="text-2xl font-semibold">Hey <span className="font-mono">{username}</span>👋</h2>
    <p className="text-sm font-thin mb-12">You are logged in as a <span className="text-white font-normal">{status}</span></p>
    <div className='space-y-20'>
      <ExercisesListFiltered />
    </div>
    </div>
  )

}

export default Welcome