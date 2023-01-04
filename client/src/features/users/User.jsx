import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

import { useGetUsersQuery } from './usersApiSlice'
import { memo } from 'react'

const User = ({ userId }) => {

    const { user } = useGetUsersQuery('userList', {
        selectFromResult: ({ data }) => ({
            user: data?.entities[userId]
        })
    })

    const navigate = useNavigate()

    if (user) {
        const handleEdit = () => navigate(`/dash/users/${userId}`)

        const userRolesString = user.roles.toString().replaceAll(',', ', ')

        const cellStatus = user.active ? '' : 'table__cell--inactive'

        return (
            <tr key={user.id}>
              <td className=" px-3 py-4 text-sm text-gray-300 lg:table-cell">{user.username}</td>
              <td className=" px-3 py-4 text-sm text-gray-300 sm:table-cell">{userRolesString}</td>
              <td className="py-4 pl-3 pr-4 text-sm font-medium sm:pr-6">
              <button
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
              </td>
            </tr>

    )

        // return (
        //     <tr className="table__row user">
        //         <td className={`table__cell ${cellStatus}`}>{user.username}</td>
        //         <td className={`table__cell ${cellStatus}`}>{userRolesString}</td>
        //         <td className={`table__cell ${cellStatus}`}>
        //             <button
        //                 className="icon-button table__button"
        //                 onClick={handleEdit}
        //             >
        //                 <FontAwesomeIcon icon={faPenToSquare} />
        //             </button>
        //         </td>
        //     </tr>
        // )

    } else return null
}






const memoizedUser = memo(User)

export default memoizedUser