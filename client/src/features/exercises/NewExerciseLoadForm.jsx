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
        setName('')
        setDescription('')
        setUserId('')
        navigate('/dash/exercises')
    }

}, [isSuccess, isSuccess, navigate])

    return (
    <div>
    <div>
      <label htmlFor="price" className="block font-medium">
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
        <button disabled={!canSave} onClick={onAddExerciseLoadClicked}>Click me</button>
      </div>
    </div>
    </div>
  )
}

export default NewExerciseLoadForm