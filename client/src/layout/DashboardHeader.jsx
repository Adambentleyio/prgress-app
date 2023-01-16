import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSendLogoutMutation } from '../features/auth/authApiSlice'
import { selectCurrentToken } from '../features/auth/authSlice'
import { useSelector } from 'react-redux'
import  useAuth  from '../hooks/useAuth'


export default function DashboardHeader() {

  const navigate = useNavigate()

  // useAuth hook to check if manager, coach, client, or employee
  const { isManager, isCoach, isAdmin } = useAuth()

  const [sendLogout, {
    isLoading,
    isError,
    isSuccess,
    err
  }] = useSendLogoutMutation()

  const token = useSelector(state => state.auth.token)

    // check isSuccess and when TRUE navigate to '/'
    useEffect(() => {
      if (isSuccess) navigate('/')
    }, [isSuccess, navigate])

  // early returns as soon as isLoading or isError occurs

  if (isLoading) return <p>Logging out...</p>

  if (isError) return <p>An error occured ➡ {err.data?.message}</p>

  let secondaryNav

  if (isManager || isCoach || isAdmin) {
    secondaryNav = (
      <>
        <div className='flex space-x-2'>
        <Link to="/dash/exercises" className=" font-medium hover:text-indigo-50"><p>Exercises</p></Link>
        <Link to="/dash/notes/new-note" className=" font-medium hover:text-indigo-50"><p>New Log</p></Link>
        <Link to="/dash/notes" className=" font-medium hover:text-indigo-50"><p>Journal</p></Link>
        </div>
        <div className='flex space-x-2'>
          <Link to="/dash/users" className="font-medium hover:text-indigo-50"><p>All Users</p></Link>
          <Link to="/dash/users/new-user" className="font-medium hover:text-indigo-50"><p>Add New User</p></Link>
        </div>
    </>
    )
  } else {
    secondaryNav = (
      <>
        <Link to="/dash/notes" className="text-base font-medium text-white hover:text-indigo-50"><p>Workout Logs</p></Link>
      </>
    )
  }


  const logoutButton = (
    <button className="icon-button" onClick={sendLogout}>
      <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
  )
  const loginButton = (
    <button className="icon-button">
      <Link to='/login'>Login</Link>
    </button>
  )


  return (
    <>
    <header className="bg-base md:mb-6">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between border-b border-indigo-500 py-6 lg:border-none">
          <div className="flex items-center">
            <a href="#">
              <span className="sr-only">PRGRESS</span>
              <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=white" alt="" />
            </a>
            <div className="hidden ml-10 space-x-8 lg:flex lg:items-center">
              {secondaryNav}

            </div>
          </div>
          <div className="ml-10 space-x-4">
            {!token && loginButton}
            {logoutButton}
          </div>
        </div>
        <div className="flex flex-wrap justify-center space-x-6 py-4 lg:hidden">
          {secondaryNav}
        </div>
      </nav>
    </header>
    </>

  )
}