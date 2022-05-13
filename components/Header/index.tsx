import React, { useState } from 'react'
import Link from 'next/link'
import { ShoppingCartIcon, MenuIcon } from '@heroicons/react/solid'
import SideNav from '../SideNav'
import Button from '../Button'

const Header = () => {
  const [openSideNav, setSideNav] = useState(false)

  const handleCloseNav = () => {
    setSideNav(false)
  }

  return (
    <React.Fragment>
      <SideNav open={openSideNav} onClose={handleCloseNav} />
      <header className="bg-gray-200 w:full">
        <div className=" container mx-auto p-3 flex flex-nowrap items-center">
          <Button
            className="mr-2 md:hidden"
            icon
            onClick={() => setSideNav(!openSideNav)}
          >
            <MenuIcon className="h-6 w-6 text-slate-500" />
          </Button>
          <h5 className="text-3xl md:text-4xl font-serif text-amber-600">
            Pubsgate
          </h5>
          <div className="grow"></div>
          <div className="flex space-x-4 md:space-x-20">
            <div className="flex items-center">
              <Link href="/">
                <a className="flex items-center justify-items-center text-amber-600 text-base md:text-lg hover:text-amber-700 hover:underline">
                  Sign in
                </a>
              </Link>
              <div className="text-amber-600 text-base md:text-lg px-1 md:px-3">
                /
              </div>
              <Link href="/">
                <a className="flex items-center justify-items-center text-amber-600 text-base md:text-lg hover:text-amber-700 hover:underline">
                  Sign up
                </a>
              </Link>
            </div>
            <Link href="/">
              <a className="flex items-center justify-center md:bg-amber-600 rounded-lg text-amber-600 md:text-white py-2 px-3 text-base md:text-lg hover:text-amber-700 hover:md:bg-amber-700 hover:md:text-white active:text-amber-500">
                <ShoppingCartIcon className="h-6 w-6 md:mr-3" />
                <span className="hidden md:inline">Cart</span>
              </a>
            </Link>
          </div>
        </div>
      </header>
    </React.Fragment>
  )
}

export default Header
