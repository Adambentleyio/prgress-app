import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const DashboardFooter = () => {

  const { isManager, isCoach, isAdmin } = useAuth()

  let secondaryNav

  if (isManager || isCoach || isAdmin) {
    secondaryNav = (
      <>
        <Link to="/dash/notes/new-note" className="text-base font-medium text-white hover:text-indigo-50"><p>New Note</p></Link>
        <Link to="/dash/notes" className="text-base font-medium text-white hover:text-indigo-50"><p>All Notes</p></Link>
        <Link to="/dash/users" className="text-base font-medium text-white hover:text-indigo-50"><p>All Users</p></Link>
        <Link to="/dash/users/new-user" className="text-base font-medium text-white hover:text-indigo-50"><p>Add New User</p></Link>
    </>
    )
  } else {
    secondaryNav = (
      <>
        <Link to="/dash/notes" className="text-base font-medium text-white hover:text-indigo-50"><p>All Notes</p></Link>
      </>
    )
  }

  return (
    <footer className='bg-indigo-700'>
      <div className="flex w-full items-center justify-between border-b border-indigo-500 py-6 lg:border-none">
          <div className="flex items-center">
            <Link to="/dash" className='mx-4'>
              <span className="sr-only">PRGRESS</span>
              <img className="h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=white" alt="" />
            </Link>
            {/* Large screens secondary Nav */}
            <div className="hidden ml-10 space-x-8 lg:flex">
              {secondaryNav}
            </div>
            {/* Small screens secondary Nav */}
            <div className="flex flex-wrap justify-center space-x-6 py-4 lg:hidden">
              {secondaryNav}
            </div>
          </div>
        </div>

      </footer>
  )
}

export default DashboardFooter