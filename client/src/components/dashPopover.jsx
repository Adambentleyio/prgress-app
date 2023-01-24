import { Popover, Transition } from '@headlessui/react'
import {faUser} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function dashPopover({logout, users}) {
    console.log("Popover")
  return (
    <Popover>
      <Popover.Button className="relative">
        <FontAwesomeIcon icon={faUser} className="text-2xl text-white" />
      </Popover.Button>
      <Transition
       enter="transition duration-300 ease-out"
       enterFrom="transform scale-50 opacity-0"
       enterTo="transform scale-100 opacity-100"
       leave="transition duration-75 ease-out"
       leaveFrom="transform scale-100 opacity-100"
       leaveTo="transform scale-95 opacity-0"
       >
          <Popover.Panel className="absolute z-10 mt-3 min-w-sm">
            <div className='overflow-hidden flex flex-col items-center bg-gray-500 rounded-lg shadow-md px-4 py-2 space-y-2'>
              <div>
                  <button className='overflow-hidden hover:font-semibold' onClick={logout.func}>{logout.title}</button>
              </div>
              <div>
                  <button onClick={users.func}>{users.title}</button>
              </div>
            </div>
          </Popover.Panel>
       </Transition>
    </Popover>
  )
}