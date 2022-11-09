import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Welcome = () => {

  const {isManager, isAdmin, status} = useAuth()

  let employeeList

  if (!isManager || !isAdmin & status) {
    employeeList = (
    <>
    <Link to="/dash/notes"><p>All Notes</p></Link>
    </>
    )
  } else {
    employeeList = (
    <>
    <Link to="/dash/notes/new-note"><p>New Note</p></Link>
    <Link to="/dash/notes"><p>All Notes</p></Link>
    <Link to="/dash/users"><p>All Users</p></Link>
    <Link to="/dash/users/new-user"><p>Add New User</p></Link>
    </>
    )
  }

  return employeeList

}

export default Welcome