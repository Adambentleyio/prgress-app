import React from 'react';
import { PulseLoader } from 'react-spinners';
import { useGetUsersQuery } from '../users/usersApiSlice';
import NewExerciseForm from './NewExerciseForm';

const NewExercise = () => {

const { users } = useGetUsersQuery('usersList', {
  selectFromResult: ({ data }) => ({
      users: data?.ids.map(id => data?.entities[id])
  })
})

if (!users?.length) return <PulseLoader color={'#FFF'}/>

const content = <NewExerciseForm users={users} />

return content
}

export default NewExercise