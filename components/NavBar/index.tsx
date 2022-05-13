import React from 'react'
import { NavBarProps } from './@types'

const NavBar: React.ComponentType<NavBarProps> = (props) => {
  return (
    <nav className="w-full">
      {props.navigations.map((nav) => (
        <button key={nav.label}>{nav.label}</button>
      ))}
    </nav>
  )
}

export default NavBar
