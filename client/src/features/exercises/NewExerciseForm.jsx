import React from 'react'

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewExerciseMutation } from "./exercisesApiSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"
import useAuth from '../../hooks/useAuth'

const NewExerciseForm = ({ users }) => {

    const [addNewExercise, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewExerciseMutation()

    const navigate = useNavigate()

    const {username} = useAuth()

    const [name, setName] = useState('')
    const [text, setText] = useState('')
    const [userId, setUserId] = useState('')

    useEffect(() => {
        if (isSuccess) {
            setName('')
            setText('')
            setUserId('')
            navigate('/dash/exercises')
        }
    }, [isSuccess, navigate])

    const onNameChanged = e => setName(e.target.value)
    const onTextChanged = e => setText(e.target.value)
    const onUserIdChanged = e => setUserId(e.target.value)

    const canSave = [name].every(Boolean) && !isLoading

    const sentenceCase = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    let id = users.filter(user => user.username === username).map(user => user.id).toString()

    const onSaveNoteClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewExercise({ user:username, id, name, description:text })
        }
    }

    const options = users.map(user => {
        return (
            <option
                key={user.id}
                value={user.id}
            > {user.username}</option >
        )
    })

    return (
      <>

      <div className="sm:flex-auto">
        <h1 className="text-2xl font-extrabold inline text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Add Exercise</h1>
        <p className="mt-2 text-gray-300 max-w-sm">Give it a name and a description.</p>
      </div>
            <form className="space-y-8 divide-y divide-gray-200">
              <div className="space-y-8 divide-y divide-gray-200">
                <div>
                  <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <label htmlFor="username" className="block text-sm font-medium text-gray-50">
                        Exercise name
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="text"
                          value={sentenceCase(name)}
                          onChange={onNameChanged}
                          name="exercise"
                          id="exercise"
                          autoComplete="exercise"
                          className="block text-gray-900 font-medium w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-6">
                      <label htmlFor="about" className="block text-sm font-medium text-gray-50">
                        Technique description
                      </label>
                      <div className="mt-1">
                        <textarea
                          value={sentenceCase(text)}
                          onChange={onTextChanged}
                          id="about"
                          name="about"
                          rows={3}
                          className="block text-gray-900 font-medium w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"

                        />
                      </div>
                    </div>
                  </div>
                  <button
                  className="bg-indigo-500 inline-block rounded-lg mt-8 py-4 px-6 space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Save"
                  onClick={onSaveNoteClicked} disabled={!canSave}
                  >
                      <FontAwesomeIcon icon={faSave} />
                    <p className='inline'>Save</p>
                  </button>
                </div>
                </div>

            </form>
            </>
          )
}

export default NewExerciseForm