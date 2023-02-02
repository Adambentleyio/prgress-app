import { useAddNewExerciseMutation, useGetExercisesQuery } from "./exercisesApiSlice"
// import Exercise from './Exercise'
import useAuth from "../../hooks/useAuth";
import { PulseLoader } from 'react-spinners';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useGetUsersQuery } from "../users/usersApiSlice";


export default function ExercisesList() {

    const { username, isManager, isAdmin } = useAuth();
    const navigate = useNavigate();

    const { users } = useGetUsersQuery('usersList', {
      selectFromResult: ({ data }) => ({
          users: data?.ids.map(id => data?.entities[id])
      })
    })

    const {
        data: exercises,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetExercisesQuery('exercisesList', { /*options for listening and then dispatching new queries to redux store */
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    useEffect(() => {
      if (addExerciseIsSuccess) {
        navigate('/dash/exercises/filtered')
      }
    })

    const [addNewExercise, {
      isLoading: addExerciseIsLoading,
      isSuccess: addExerciseIsSuccess,
    }] = useAddNewExerciseMutation()

    const userById = users?.find(user => user.username === username)?.id

    const onTrackExerciseClicked = async (exerciseName) => {
      await addNewExercise({ name:exerciseName, user: username, id: userById })
    }

    const handleEdit = (id) => navigate(`/dash/exercises/${id}`)

    let content

    if (isLoading) {
        content = <PulseLoader color={'#fff'} />
    }

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {

        const { ids, entities } = exercises


            return (
            <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-end">
              <div className="sm:flex-auto">
                <h1 className="text-2xl font-extrabold inline text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Exercises</h1>
                <p className="mt-2 font-semibold text-gray-100">
                All exercises in the database.
                </p>
                <p className="mt-2 text-sm text-gray-300 max-w-sm">You can add an exercise to your list by clicking track, or add new exercises.</p>
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                <button
                  onClick={() => navigate('/dash/exercises/new-exercise')}
                  type="button"
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                >
                  Add Exercise
                </button>
              </div>
            </div>
            <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-300 sm:pl-6">
                      Name
                    </th>

                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300">
                      Description
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ids.map((exerciseId) => {
                    const entry = entities[exerciseId]
                    return (
                    <tr key={entities[exerciseId].id}>
                      <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-300 sm:w-auto sm:max-w-none sm:pl-6">
                        {entities[exerciseId].name}
                        <dl className="font-normal lg:hidden">
                          <dt className="sr-only">Description</dt>
                          <dd className="mt-1 truncate text-gray-400 text-xs">{entry.description}</dd>
                          <dt className="sr-only sm:hidden">Email</dt>
                          {/* <dd className="mt-1 truncate text-gray-300 sm:hidden">{entities[exerciseId].id}</dd> */}
                        </dl>
                      </td>
                      {/* <td className="hidden px-3 py-4 text-sm text-gray-300 lg:table-cell">{entry.description || "-"}</td> */}
                      {/* // latest load */}
                      <td className="px-3 py-4 text-sm text-gray-300">{entry.description}</td>
                      <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 space-y-2 md:space-x-2 md:space-y-0">
                        {isAdmin | isManager && (
                          <button onClick={() => handleEdit(entities[exerciseId].id)} className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium text-white shadow-sm hover:cursor-pointer hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">
                          Edit<span className="sr-only">, {entities[exerciseId].name}</span>
                        </button>
                        ) }

                        <button onClick={() => onTrackExerciseClicked(entities[exerciseId].name)} className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">
                          Track<span className="sr-only">, {entities[exerciseId].name}</span>
                        </button>
                      </td>

                    </tr>
                  )})}
                </tbody>
              </table>
            </div>
          </div>)
          }}