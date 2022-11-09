import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

// check the roles to include manager or admin
// if !isManager || !isAdmin then navigate back to login
// set Outlet or login

import React from 'react'

const RequireAuth = ( { allowedRoles }) => {

    const location = useLocation()
    const {roles} = useAuth()

    let content = (
        roles.some(role => allowedRoles.includes(role))
        ? <Outlet />
        : <Navigate to="/login" state={{ from: location}} replace />
            )


    return content
}

export default RequireAuth