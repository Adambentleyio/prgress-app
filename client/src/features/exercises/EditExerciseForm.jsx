import { useState, useEffect } from "react"
import { useUpdateExerciseMutation, useDeleteExerciseMutation } from "./exercisesApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import useAuth from "../../hooks/useAuth"
import NewExerciseLoadForm from "./NewExerciseLoadForm"

const EditExerciseForm = ({ exercise, users }) => {

    const { isManager, isAdmin } = useAuth()

    const [updateExercise, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateExerciseMutation()

    const [deleteExercise, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteExerciseMutation()

    const navigate = useNavigate()

    const [name, setName] = useState(exercise.name)
    const [description, setDescription] = useState(exercise.description)
    // const [completed, setCompleted] = useState(exercise.completed)
    const [userId, setUserId] = useState(exercise.user)

    useEffect(() => {

        if (isSuccess || isDelSuccess) {
            setName('')
            setDescription('')
            setUserId('')
            navigate('/dash/exercises')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onTitleChanged = e => setName(e.target.value)
    const onTextChanged = e => setDescription(e.target.value)
    const onUserIdChanged = e => setUserId(e.target.value)

    const canSave = [name, description, userId].every(Boolean) /*&& !isLoading*/

    const onSaveNoteClicked = async (e) => {
        if (canSave) {
            await updateExercise({ id: exercise.id, user: userId, name, description })
        }
    }

    const onDeleteNoteClicked = async () => {
        await deleteExercise({ id: exercise.id })
    }

    const dateConverter = mongoDbDate => {
        return new Date(mongoDbDate).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric'})
    }

    const options = users.map(user => {
        return (
            <option
                key={user.id}
                value={user.id}

            > {user.username}</option >
        )
    })

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validTitleClass = !name ? "form__input--incomplete" : ''
    const validTextClass = !description ? "form__input--incomplete" : ''

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''


    let deleteButton = null
    if (isManager || isAdmin) {
        deleteButton = (
            <button
                className="icon-button"
                title="Delete"
                onClick={onDeleteNoteClicked}
            >
                <FontAwesomeIcon icon={faTrashCan} />
            </button>
        )
    }

    const content = (
        <>
            <p className={errClass}>{errContent}</p>

            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
                    <h2 className="text-lg font-bold text-indigo-600">{exercise.name}</h2>
                </div>
                <NewExerciseLoadForm id={exercise.id} user={exercise.user} />
                <label className="form__label" htmlFor="note-title">
                    Title:</label>
                <input
                    className={`form__input ${validTitleClass} text-gray-900`}
                    id="note-title"
                    name="title"
                    type="text"
                    autoComplete="off"
                    value={name}
                    onChange={onTitleChanged}
                />

                <label className="form__label" htmlFor="note-text">
                    Text:</label>
                <textarea
                    className={`form__input form__input--text ${validTextClass} text-gray-800`}
                    id="note-text"
                    name="text"
                    value={description}
                    onChange={onTextChanged}
                />
                <div className="form__row">
                    <div className="form__divider">

                        <label className="form__label form__checkbox-container" htmlFor="note-username">
                            ASSIGNED TO:</label>
                        <select
                            id="note-username"
                            name="username"
                            className="form__select text-gray-800 "
                            value={userId}
                            onChange={onUserIdChanged}
                        >
                            {options}
                        </select>
                    </div>
                    <div className="form__divider">
                        <p className="form__created">Created:<br />{dateConverter(exercise.createdAt)}</p>
                        <p className="form__updated">Updated:<br />{dateConverter(exercise.updatedAt)}</p>
                    </div>
                </div>
                <div className="flex space-x-4">
                    <ul>
                    {exercise.loads?.map(load => {
                        return (
                            <div className="my-4" key={load._id}>

                                 <li className="text-sm">
                                    <p className="font-bold text-md">{load.load} Kg</p>

                                 </li>
                                 <li className="text-sm">
                                    <p className="font-bold text-md">{load.note}</p>
                                 </li>
                                 <li className="text-sm">
                                    <p className="font-bold text-md">{dateConverter(load.date)}</p>
                                 </li>

                            </div>
                        )
                    }
                    )}
                    </ul>
                </div>
                <div className="space-x-3">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveNoteClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        {deleteButton}
                    </div>
            </form>
        </>
    )

    return content
}

export default EditExerciseForm