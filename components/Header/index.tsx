import React, { useState } from 'react'
import Link from 'next/link'
import clsx from 'classNames'
import { ShoppingCartIcon, MenuIcon } from '@heroicons/react/solid'
import SideNav from '../SideNav'
import Button from '../Button'
import NavBar from '../NavBar'
import { NavBarProps } from '../NavBar/@types'
import { useTheme } from '../../utils/hooks'
import { useQuery } from '@apollo/client'
import { GET_AUTH_USER } from '../../graphql/queries/getAuthUser'

const navigations: NavBarProps['navigations'] = [
  {
    label: 'journals',
    options: [
      {
        label: 'biolife',
        link: '/',
      },
      {
        label: 'Bioenergy',
        link: '/',
      },
      {
        label: 'all life',
        link: '/',
      },
      {
        label: 'biofuel',
        link: '/',
      },
      {
        label: 'biprotein',
        link: '/',
      },
    ],
  },
  {
    label: 'information',
    link: '/',
  },
  {
    label: 'author services',
    link: '/',
  },
  {
    label: 'initiatives',
    link: '/',
  },
  {
    label: 'about us',
    link: '/',
  },
]

const Header: React.ComponentType = () => {
  const [openSideNav, setSideNav] = useState(false)
  const { data } = useQuery(GET_AUTH_USER)
  const theme = useTheme('light')

  const handleCloseNav = () => {
    setSideNav(false)
  }

  const toggleSideNav = () => {
    setSideNav(!openSideNav)
  }

  return (
    <header className={clsx(`bg-${theme.color.primary}`, 'w:full')}>
      <SideNav
        open={openSideNav}
        onClose={handleCloseNav}
        navigations={navigations}
      />
      <div className=" container mx-auto py-2 flex flex-nowrap items-center">
        <Button
          className="mr-2 md:hidden hover:bg-slate-600/20"
          variant="icon"
          onClick={toggleSideNav}
        >
          <MenuIcon className="h-6 w-6 text-white" />
        </Button>
        <h5 className="text-3xl md:text-4xl font-serif text-white">Pubsgate</h5>
        <div className="grow"></div>
        <div className="flex space-x-4 md:space-x-20">
          {data ? (
            <div className="p-2">
              <span className="text-white text-lg capitalize">
                {`${data.loggedInUser.firstName} ${data.loggedInUser.lastName}`}
              </span>
            </div>
          ) : (
            <div className="flex items-center">
              <Link href="/login">
                <a className="flex items-center justify-items-center text-white text-base md:text-lg hover:text-slate-500 hover:underline">
                  Sign in
                </a>
              </Link>
              <div className="text-white text-base md:text-lg px-1 md:px-3">
                /
              </div>
              <Link href="/signup">
                <a className="flex items-center justify-items-center text-white text-base md:text-lg hover:text-slate-500 hover:underline">
                  Sign up
                </a>
              </Link>
            </div>
          )}
          <Link href="/">
            <a className="flex items-center justify-center md:bg-black rounded-lg text-white md:text-white py-2 px-3 text-base md:text-lg hover:text-slate-500 hover:md:bg-slate-500 hover:md:text-white active:text-amber-500">
              <ShoppingCartIcon className="h-6 w-6 md:mr-3" />
              <span className="hidden md:inline">Cart</span>
            </a>
          </Link>
        </div>
      </div>
      <NavBar navigations={navigations} />
    </header>
  )
}

export default Header
