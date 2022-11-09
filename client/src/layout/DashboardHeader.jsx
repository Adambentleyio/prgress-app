import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useSendLogoutMutation } from '../features/auth/authApiSlice'
import { selectCurrentToken } from '../features/auth/authSlice'
import { useSelector } from 'react-redux'



const DashboardHeader = () => {

  const [sendLogout, {
    isLoading,
    isError,
    isSuccess,
    err
  }] = useSendLogoutMutation()

  const token = useSelector(state => state.auth.token)
  console.log(token)


  // check isSuccess and when TRUE navigate to '/'
  useEffect(() => {
    if (isSuccess) Navigate('/')
  }, [isSuccess, Navigate])

  // early returns as soon as isLoading or isError occurs

  if (isLoading) return <p>Logging out...</p>

  if (isError) return <p>An error occured ➡ {err.data?.message}</p>

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
    <header className='dash-header'>
      <div className="dash-header__container">
         <Link to="/dash"><h1>PRGRESS</h1></Link>
         <nav className='dash-header__nav'>
          {logoutButton}
          {loginButton}
         </nav>
      </div>

    </header>
    </>
  )
}

export default DashboardHeader