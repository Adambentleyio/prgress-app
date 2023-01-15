import React from 'react'

// @desc update an exercise load
// @route PATCH /exercises/load
// @access Private

const NewExerciseLoadForm = ({id}) => {


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
    </div>
    </div>
  )
}

export default NewExerciseLoadForm