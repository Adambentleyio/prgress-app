import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { faUser} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSendLogoutMutation } from '../features/auth/authApiSlice'
import { selectCurrentToken } from '../features/auth/authSlice'
import { useSelector } from 'react-redux'
import  useAuth  from '../hooks/useAuth'
import Popover from '../components/dashPopover'
import ProfileDashMenu from '../components/ProfileDashMenu'


export default function DashboardHeader() {

  const navigate = useNavigate()

  // useAuth hook to check if manager, coach, client, or employee
  const { isManager, isCoach, isAdmin, username } = useAuth()

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

  if (isManager || isCoach || isAdmin ) {
    secondaryNav = (
      <>
        <div className='flex space-x-2'>
        <Link to="/dash/exercises/filtered" className=" font-medium hover:text-indigo-50"><p>Tracked</p></Link>
        <span>|</span>
        <Link to="/dash/exercises" className=" font-medium hover:text-indigo-50"><p>Exercise List</p></Link>
        <span>|</span>
        <Link to="/dash/notes/new-note" className=" font-medium hover:text-indigo-50"><p>New Log</p></Link>
        <span>|</span>
        <Link to="/dash/notes" className=" font-medium hover:text-indigo-50"><p>Journals</p></Link>
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

  const popOverData = {
    logout: {
      func: () => sendLogout(),
      title: "Logout"
    },
    users: {
      func: () => navigate('/dash/users'),
      title: "People"
  }
}

  const logoutButton = (
    <Popover
    logout={popOverData.logout}
     users={popOverData.users}
  />
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
        {/* Main block nav */}
        <div className="flex w-full items-center justify-between border-b border-indigo-500 py-6 lg:border-none">
          <div className="flex items-center">
            <Link to="/dash">
              <span className="sr-only">PRGRESS</span>
              <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=white" alt="" />
            </Link>
            {/* large screens div */}
            <div className="hidden ml-10 space-x-8 lg:flex lg:items-center">
              {secondaryNav}
            </div>
          </div>
          <div className="ml-10 space-x-4">
            <p className='p-2 inline text-sm text-gray-300 font-light font-mono tracking-tighter'>Logged in as: {username}</p>
            {!token && loginButton}
            {/* {logoutButton} */}
            <ProfileDashMenu logout={popOverData.logout} users={popOverData.users} />
          </div>
        </div>
        {/* Small screens div under main nav  */}
        <div className="flex flex-wrap justify-center space-x-6 py-4 lg:hidden">
          {secondaryNav}
        </div>
      </nav>
    </header>
    </>

  )
}