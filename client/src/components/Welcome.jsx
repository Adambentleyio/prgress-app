import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Welcome = () => {

  const {isManager, isAdmin, status, username} = useAuth()



  return (
    <div className='max-w-7xl mx-auto'>
    <h2 className="text-2xl font-semibold">Hey <span className="font-mono">{username}</span>👋</h2>
    <p className="text-sm font-thin">You are logged in as a <span className="text-white font-normal">{status}</span></p>
    </div>
  )

}

export default Welcome