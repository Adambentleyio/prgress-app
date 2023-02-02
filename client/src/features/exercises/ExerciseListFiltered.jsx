import { useGetUsersExercisesQuery } from "./exercisesApiSlice"
// import Exercise from './Exercise'
import useAuth from "../../hooks/useAuth";
import { PulseLoader } from 'react-spinners';
import { useNavigate } from "react-router-dom";
import { useGetUsersQuery } from "../users/usersApiSlice";

export default function ExercisesListFiltered() {

    const { username, isManager, isAdmin } = useAuth();
    const navigate = useNavigate();

    const { users } = useGetUsersQuery('usersList', {
      selectFromResult: ({ data }) => ({
          users: data?.ids.map(id => data?.entities[id])
      })
    })

    const id = users?.find(user => user.username === username)?.id

    const {
        data: exercises,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersExercisesQuery(id)


//     { /*options for listening and then dispatching new queries to redux store */
//     pollingInterval: 60000,
//     refetchOnFocus: true,
//     refetchOnMountOrArgChange: true
// }
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
              <h1 className="text-2xl font-extrabold inline text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Your lifts</h1>
                <p className="mt-2 text-sm text-gray-300">Add new attempts and personal records to your list of exercises by clicking edit.</p>
                <p className="mt-2 text-sm text-gray-300 max-w-sm">Qucik load coming soon</p>
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
                    <th
                      scope="col"
                      className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-300 lg:table-cell"
                    >
                      Description
                    </th>

                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300">
                      Latest
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
                    <tr key={entities[exerciseId].name}>
                      <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-300 sm:w-auto sm:max-w-none sm:pl-6">
                        {entities[exerciseId].name}
                        <dl className="font-normal lg:hidden">
                          <dt className="sr-only">Description</dt>
                          <dd className="mt-1 truncate text-gray-400 text-xs">{entry.description}</dd>
                          <dt className="sr-only sm:hidden">Email</dt>
                          {/* <dd className="mt-1 truncate text-gray-300 sm:hidden">{entities[exerciseId].id}</dd> */}
                        </dl>
                      </td>
                      <td className="hidden px-3 py-4 text-sm text-gray-300 lg:table-cell">{entry.description}</td>
                      {/* // latest load */}
                      <td className="px-3 py-4 text-sm text-gray-300">{entry.loads.length? entry.loads[0].load : "-"}</td>
                      <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button onClick={() => handleEdit(entities[exerciseId].id)} className="text-indigo-600 hover:text-indigo-900">
                          Edit<span className="sr-only">, {entities[exerciseId].name}</span>
                        </button>
                      </td>
                    </tr>
                  )})}
                </tbody>
              </table>
            </div>
          </div>)
          }}