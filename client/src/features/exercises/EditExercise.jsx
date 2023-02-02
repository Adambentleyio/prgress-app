import { useParams } from 'react-router-dom'
import { useGetExercisesQuery } from './exercisesApiSlice'
import { useGetUsersQuery } from '../users/usersApiSlice'
import EditExerciseForm from './EditExerciseForm'
import useAuth from '../../hooks/useAuth'
import PulseLoader from 'react-spinners/PulseLoader'

const EditExercise = () => {
    const { id } = useParams()

    // destructure returns from useAuth
    const { username, isManager, isAdmin } = useAuth()

    const { exercise } = useGetExercisesQuery('exercisesList', {
        selectFromResult: ({ data }) => ({
            exercise: data?.entities[id]
        })
    })

    console.log('exercise', exercise)

    const {users} = useGetUsersQuery('usersList', {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map(id => data?.entities[id])
        })
        })

        if (!exercise ||  !users?.length) return <PulseLoader color={'#fff'} />
        if (!exercise) return <PulseLoader color={'#fff'} />

        // if (!isManager && !isAdmin) {
        //     if (exercise.user !== username) {
        //         return <p className='errmsg'>No access</p>
        //     }
        // }

    const content = <EditExerciseForm exercise={exercise} users={users} />

    return content
}
export default EditExercise