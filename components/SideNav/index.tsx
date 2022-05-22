import React, { useEffect } from 'react'
import { SideNavProps } from './@types'
import Button from '../Button'
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
          <div className="fixed inset-0 bg-black/60 z-50" aria-hidden="true" />
          <aside className="w-60 h-screen shadow-lg bg-white px-1 py-3 absolute z-50">
            <div className="flex">
              <div className="grow"></div>
              <Button onClick={props.onClose} variant="icon">
                <XIcon className="w-6 h-6" />
              </Button>
            </div>

            <ul>
              {props.navigations.map((navigation) => (
                <li key={navigation.label}>{navigation.label}</li>
              ))}
            </ul>
          </aside>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default SideNav
