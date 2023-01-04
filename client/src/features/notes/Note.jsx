import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useGetNotesQuery } from './notesApiSlice'
import { memo } from 'react'


const Note = ({ noteId }) => {

    const { note } = useGetNotesQuery("notesList", {
        selectFromResult: ({ data }) => ({
            note: data?.entities[noteId]
        })
    })

  const navigate = useNavigate()

  if (note) {
    const created = new Date(note.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

    const updated = new Date(note.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

    const handleEdit = () => navigate(`/dash/notes/${noteId}`)

    return (
            <tr key={note.id}>
              <td className="py-4 pl-4 text-sm font-medium text-gray-300 sm:w-auto sm:max-w-none sm:pl-6">
              {note.completed
              ? <span className="">Completed</span>
              : <span className="">Open</span>
          }
              </td>
              <td className="hidden px-3 py-4 text-sm text-gray-300 lg:table-cell">{created}</td>
              <td className="hidden px-3 py-4 text-sm text-gray-300 sm:table-cell">{updated}</td>
              <td className="px-3 py-4 text-sm text-gray-300">{note.title}</td>
              <td className="px-3 py-4 text-sm text-gray-300">{note.username}</td>
              <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                <button onClick={() => handleEdit()} className="text-indigo-600 hover:text-indigo-900">
                  Edit<span className="sr-only">, {note.title}</span>
                </button>
              </td>
            </tr>

    )

  } else return null
}

const memoizedNote = memo(Note)

export default memoizedNote