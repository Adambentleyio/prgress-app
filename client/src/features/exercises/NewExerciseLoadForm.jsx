import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {useAddExerciseLoadMutation} from './exercisesApiSlice'

// @desc update an exercise load
// @route PATCH /exercises/load
// @access Private

const NewExerciseLoadForm = ({id, user}) => {

  const [addExerciseLoad, { isLoading, isError, isSuccess, error, data }] = useAddExerciseLoadMutation()
  const [load, setLoad] = useState(null)

  // addExerciseLoad inputs a load on an exercise linked to a user
  // needs users id, exercise id and load data.

  const onAddExerciseLoadClicked = async (e) => {
    e.preventDefault()
    await addExerciseLoad({ id, load, user })
  }

  let canSave = [id, load, user].every(Boolean) && !isLoading

  const navigate = useNavigate()

  useEffect(() => {

    if (isSuccess || isSuccess) {
        navigate('/dash/exercises')
    }

}, [isSuccess, isSuccess, navigate])

    return (
    <div>
    <div>
      <label onSubmit={e => e.preventDefault() } className="block font-medium">
        Load
      </label>
      <div className="relative inline rounded-md shadow-sm">
        <input
          type="text"
          name="price"
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
        <button className='mx-2 py-2 px-4 bg-white rounded-md border-gray-300 font-medium text-indigo-700 disabled:text-gray-500 disabled:opacity-25' disabled={!canSave} onClick={onAddExerciseLoadClicked}>Add</button>
    </div>
    </div>
  )
}

export default NewExerciseLoadForm