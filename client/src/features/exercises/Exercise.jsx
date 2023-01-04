import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useGetExercisesQuery } from './exercisesApiSlice'
import { memo } from 'react'













// const Exercise = ({ exerciseId }) => {

//     const { exercise } = useGetExercisesQuery("exercisesList", {
//         selectFromResult: ({ data }) => ({
//             exercise: data?.entities[exerciseId]
//         })
//     })

//   const navigate = useNavigate()

//   if (exercise) {

//     const created = new Date(exercise.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

//     const updated = new Date(exercise.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

//     const handleEdit = () => navigate(`/exercises/${exerciseId}`)

//     return (
//       <tr className="table__row">

//       <td className="table__cell note__status">
//           {exercise.completed
//               ? <span className="note__status--completed">Completed</span>
//               : <span className="note__status--open">Open</span>
//           }
//       </td>
//       <td className="table__cell note__created">{created}</td>
//       <td className="table__cell note__updated">{updated}</td>
//       <td className="table__cell note__title">{exercise.name}</td>
//       <td className="table__cell note__username">{exercise.user}</td>

//       <td className="table__cell">
//           <button
//               className="icon-button table__button"
//               onClick={handleEdit}
//           >
//               <FontAwesomeIcon icon={faPenToSquare} />
//           </button>
//       </td>
//   </tr>
//     )

//   } else return null
// }

// const memoizedExercise = memo(Exercise)

// export default memoizedExercise