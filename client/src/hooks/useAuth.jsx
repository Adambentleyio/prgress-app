import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import jwtDecode from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isManager = false
    let isAdmin = false
    let isClient = false
    let status = "Employee"

    // if we have a token from the server, decode it and pull off the username and roles from the userInfo object
    // username: string
    // roles: []
    // set the status from lowest to highest
    // return username, roles, isManager, isAdmin, and status

    if (token) {
        const decoded = jwtDecode(token)
        const { username, roles} = decoded.UserInfo


        isManager = roles.includes('Manager')
        isAdmin = roles.includes('Admin')
        isClient = roles.includes('Client')


        if (isClient) status = "Client"
        if (isManager) status = "Manager"
        if (isAdmin) status = "Admin"

        return { username, roles, status, isManager, isAdmin, isClient }
    }

    return { username: '', roles: [], isManager, isAdmin, status }
}
export default useAuth