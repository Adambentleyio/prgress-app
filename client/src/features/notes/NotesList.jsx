import { useGetNotesQuery } from "./notesApiSlice"
import Note from './Note'
import useAuth from "../../hooks/useAuth";
import { PulseLoader } from 'react-spinners'
import dateConverter from '../../utils/dateConverter'
import { useNavigate } from "react-router-dom";



const NotesList = () => {

  const { username, isManager, isAdmin } = useAuth();

    const {
        data: notes,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetNotesQuery('notesList', { /*options for listening and then dispatching new queries to redux store */
        pollingInterval: 600000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    const navigate = useNavigate()

    const handleEdit = (id) => navigate(`/dash/notes/${id}`)
    const handleNewNoteNavigate = () => navigate('/dash/notes/new-note')

    let content

    if (isLoading) {
        content = <PulseLoader color={'#fff'} />
    }

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids, entities } = notes

        return (
          <div>
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
            <h1 className="text-2xl font-extrabold inline text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Workout Logs</h1>
                <p className="mt-2 font-semibold text-gray-100 max-w-2xl">Add new entries for each workout or maintain a log per lift. With unoppinionated text inputs you can keep notes in whatever format works for you</p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <button
                onClick={handleNewNoteNavigate}
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
              >
                Add workout log
              </button>
            </div>
          </div>
          <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="">
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-300 sm:pl-6">
                    Date
                  </th>

                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-300">
                    Excerpt
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {ids.map((notesId) => {
                  const entry = entities[notesId]
                  return (
                  <tr key={entry.title}>
                    <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-300 sm:w-auto sm:max-w-none sm:pl-6">
                      {dateConverter(entry.createdAt)}
                      <dl className="font-normal lg:hidden">
                        <dt className="sr-only">Description</dt>
                        <dd className="mt-1 truncate text-gray-400 text-xs">{entry.text}</dd>
                        <dt className="sr-only sm:hidden">Email</dt>
                        {/* <dd className="mt-1 truncate text-gray-300 sm:hidden">{entities[exerciseId].id}</dd> */}
                      </dl>
                    </td>
                    {/* <td className="hidden px-3 py-4 text-sm text-gray-300 lg:table-cell">{entry.text || "-"}</td> */}
                    {/* // latest load */}
                    <td className="px-3 py-4 text-sm text-gray-300">{entry.text}</td>
                    <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 space-x-2">
                      {isAdmin || isManager && (
                        <button onClick={() => handleEdit(entry.id)} className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium text-white shadow-sm hover:cursor-pointer hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">
                        Edit<span className="sr-only">, {entry.title}</span>
                      </button>
                      ) }
                    </td>

                  </tr>
                )})}
              </tbody>
            </table>
          </div>
        </div>)
    }
}
export default NotesList