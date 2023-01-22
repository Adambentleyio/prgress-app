import { Popover } from '@headlessui/react'
import {faUser} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { logOut } from '../features/auth/authSlice'

export default function dashPopover({logout, users}) {
    console.log("Popover")
  return (
    <Popover>
      <Popover.Button className="relative">
        <FontAwesomeIcon icon={faUser} className="text-2xl text-white" />
      </Popover.Button>
      <Popover.Panel className="absolute z-10 bg-gray-500">
        <div>
          <div>
              <button className="hover:bg-gray-400 px-6" onClick={logout.func}>{logout.title}</button>
          </div>
          <div>
              <button className="hover:bg-gray-400 px-6" onClick={users.func}>{users.title}</button>
          </div>
        </div>
      </Popover.Panel>
    </Popover>
  )
}