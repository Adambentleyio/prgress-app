import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {useAddExerciseLoadMutation} from './exercisesApiSlice'

// @desc update an exercise load
// @route PATCH /exercises/load
// @access Private

const NewExerciseLoadForm = ({id, user}) => {

  const [addExerciseLoad, { isLoading, isError, isSuccess, error, data }] = useAddExerciseLoadMutation()
  const [load, setLoad] = useState()
  const [reps, setReps] = useState()
  const [note, setNote] = useState()

  // addExerciseLoad inputs a load on an exercise linked to a user
  // needs users id, exercise id and load data.

  const onAddExerciseLoadClicked = async (e) => {
    e.preventDefault()
    await addExerciseLoad({ id, load, reps, user, note })
  }

  let canSave = [id, load, user, reps].every(Boolean) && !isLoading && [load, reps].every(Number)

  const navigate = useNavigate()

  useEffect(() => {

    if (isSuccess || isSuccess) {
        navigate('/dash/exercises')
    }

}, [isSuccess, isSuccess, navigate])

    return (
    <div>
    <div className='space-y-4 mb-8'>
      <label className="block font-medium">
        Load
      </label>

      <div className="relative inline-block rounded-md shadow-sm md:inline md:space-x-2">
        <input
          type="number"
          name="load"
          id="load"
          value={load}
          onChange={e => setLoad(e.target.value)}
          className="rounded-md text-gray-900 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 "
          placeholder="0"
          aria-describedby="load-kilograms"
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <span className="text-gray-500 sm:text-sm" id="price-currency">
            Kg
          </span>
        </div>
      </div>
      <div className="relative inline-block rounded-md shadow-sm md:inline md:space-x-2">
        <input
          type="number"
          value={reps}
          onChange={e => setReps(e.target.value)}
          className="rounded-md text-gray-900 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 "
          placeholder="0"
          aria-describedby="load-kilograms" />
           <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <span className="text-gray-500 sm:text-sm" id="price-currency">
            Reps
          </span>
        </div>
        </div>
      <textarea
          type="text"
          value={note}
          onChange={e => setNote(e.target.value)}
          className="block w-full rounded-md text-gray-900 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 my-2 "
          aria-describedby="load-kilograms"
          placeholder='Notes...' />
        <button className='py-2 px-4 bg-white rounded-md font-medium text-indigo-700 disabled:text-gray-500 disabled:opacity-25' disabled={!canSave} onClick={onAddExerciseLoadClicked}>Add new <span className="font-semibold font-display">PR</span></button>
      </div>
    </div>


  )
}

export default NewExerciseLoadForm