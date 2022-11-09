import React from 'react'
import { useParams } from 'react-router-dom'
import {useGetUsersQuery } from './usersApiSlice'
import EditUserForm from './EditUserForm'
import { PulseLoader } from 'react-spinners'


const EditUser = () => {

  // get the wildcard id from the url
  const { id } = useParams()

  const { user } = useGetUsersQuery('userList', {
    selectFromResult: ({ data }) => ({
        user: data?.entities[id]
    })
})


  if (!user) return <PulseLoader color={"#fff"} />

  const content = <EditUserForm user={user} />

  return content
}

export default EditUser