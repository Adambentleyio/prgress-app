import React from 'react'
import { Outlet } from 'react-router-dom'
import DashboardFooter from './DashboardFooter'
import DashboardHeader from './DashboardHeader'

const DashboardLayout = () => {
  return (
    <>
    <DashboardHeader />
    <div className="dash-container">
      <Outlet />
    </div>
    <DashboardFooter />
    </>
  )
}

export default DashboardLayout