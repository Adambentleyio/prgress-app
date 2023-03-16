import { useGetUsersExercisesQuery } from "./exercisesApiSlice"
import { useAddExerciseLoadMutation } from "./exercisesApiSlice";
import useAuth from "../../hooks/useAuth";
import { PulseLoader } from 'react-spinners';
import { useNavigate } from "react-router-dom";
import { useGetUsersQuery } from "../users/usersApiSlice";
import Modal from "../../components/Modal";
import { useEffect, useState } from "react";

export default function ExercisesListFiltered() {

    const { username, isManager, isAdmin } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [modalLoadData, setModalLoadData] = useState({
      reps: '',
      load: '',
    });
    const [loadData, setLoadData] = useState({});
    const [addExerciseLoad, { isLoading: addLoadLoading, isError: addLoadIsError, isSuccess: addLoadIsSuccess, error: addLoadError, data }] = useAddExerciseLoadMutation();

    const onAddExerciseLoadClicked = async (e) => {
      e && e.preventDefault()
      setLoadData({
        ...loadData,
        reps: modalLoadData.reps,
        load: modalLoadData.load})

      await addExerciseLoad({
        id: loadData.id,
        user: loadData.userById,
        reps: modalLoadData.reps,
        load: modalLoadData.load}),
        setIsOpen(false)
    }

    const navigate = useNavigate();

    useEffect(() => {

      if (addLoadIsSuccess) {
          navigate('/dash/exercises')
      }

  }, [addLoadIsSuccess, navigate])

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

    const handleEdit = (id) => navigate(`/dash/exercises/${id}`)

    const handleLoadModal = (entry) => {
      let { id, name, userById, description } = entry
      setIsOpen(true)
      setLoadData({ id, name, userById, description})
      console.log(loadData)
    }

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
            <div>
              {/* Modal goes here */}
              <Modal
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              handleOnAddLoad={onAddExerciseLoadClicked}
              modalLoadData={modalLoadData}
              setModalLoadData={setModalLoadData}
              loadData={loadData}
              setLoadData={setLoadData}>

              </Modal>
              {/* End of modal */}
            <div className="sm:flex sm:items-end">
              <div className="sm:flex-auto">
              <h1 className="text-2xl font-extrabold inline text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Your lifts</h1>
                <p className="mt-2 font-semibold text-gray-100">Add new attempts and personal records to your list of exercises by clicking edit.</p>
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
            <div className="mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
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
                      <td className="px-2 text-right text-sm sm:pr-6">
                        <button className="text-indigo-600 hover:text-indigo-300" onClick={() => handleLoadModal(entry)}>Add</button>
                      </td>
                      <td className="px-2 text-right text-sm sm:pr-6">
                      <button onClick={() => handleEdit(entities[exerciseId].id)} className="text-gray-500 hover:text-indigo-300">
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