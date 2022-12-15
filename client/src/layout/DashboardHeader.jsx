import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useSendLogoutMutation } from '../features/auth/authApiSlice'
import { selectCurrentToken } from '../features/auth/authSlice'
import { useSelector } from 'react-redux'



export default function DashboardHeader() {

  const [sendLogout, {
    isLoading,
    isError,
    isSuccess,
    err
  }] = useSendLogoutMutation()

    // check isSuccess and when TRUE navigate to '/'
    useEffect(() => {
      if (isSuccess) Navigate('/')
    }, [isSuccess, Navigate])


  const token = useSelector(state => state.auth.token)
  console.log(token)

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

    const navigation = [
  { name: 'Solutions', href: '#' },
  { name: 'Pricing', href: '#' },
  { name: 'Docs', href: '#' },
  { name: 'Company', href: '#' },
]


  return (
    <>
    <header className="bg-indigo-600">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between border-b border-indigo-500 py-6 lg:border-none">
          <div className="flex items-center">
            <a href="#">
              <span className="sr-only">Your Company</span>
              <img className="h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=white" alt="" />
            </a>
            <div className="ml-10 hidden space-x-8 lg:block">
              {navigation.map((link) => (
                <a key={link.name} href={link.href} className="text-base font-medium text-white hover:text-indigo-50">
                  {link.name}
                </a>
              ))}
            </div>
          </div>
          <div className="ml-10 space-x-4">
            {!token && loginButton}
            {logoutButton}
          </div>
        </div>
        <div className="flex flex-wrap justify-center space-x-6 py-4 lg:hidden">
          {navigation.map((link) => (
            <a key={link.name} href={link.href} className="text-base font-medium text-white hover:text-indigo-50">
              {link.name}
            </a>
          ))}
        </div>
      </nav>
    </header>
    </>

  )
}