import React, { useEffect } from 'react'
import { SideNavProps } from './@types'
import { XIcon } from '@heroicons/react/solid'

const SideNav: React.ComponentType<SideNavProps> = (props) => {
  useEffect(() => {
    if (props.open) {
      document.body.style.setProperty('overflow', 'hidden')
    } else {
      document.body.style.setProperty('overflow', 'scroll')
    }
  }, [props.open])

  return (
    <React.Fragment>
      {props.open && (
        <React.Fragment>
          <div className="fixed inset-0 bg-black/60" aria-hidden="true" />
          <div className="w-60 h-screen shadow-lg bg-white px-1 absolute">
            <div className="flex flex-end">
              <button onClick={props.onClose}>
                <XIcon className="w-6 h-6" />
              </button>
            </div>

            <ul>
              <li>
                <a
                  className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
                  href="#!"
                >
                  Sidenav link 1
                </a>
              </li>
              <li>
                <a
                  className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
                  href="#!"
                >
                  Sidenav link 2
                </a>
              </li>
              <li>
                <a
                  className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
                  href="#!"
                >
                  Sidenav link 2
                </a>
              </li>
            </ul>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default SideNav
