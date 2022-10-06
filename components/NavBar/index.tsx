import { Menu } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import React from 'react'
import { NavBarProps } from './@types'
import clsx from 'classNames'

const NavBar: React.ComponentType<NavBarProps> = (props) => {
  return (
    <nav className="w-full bg-primary-dark hidden md:block">
      <div className="container mx-auto flex flex-nowrap items-center space-x-3 py-2">
        {props.navigations.map((nav) =>
          nav.options && nav.options.length ? (
            <Menu as="div" key={nav.label}>
              {({ open }) => (
                <>
                  <Menu.Button className="bg-white text-slate-600 py-1 px-2 rounded-lg capitalize flex flex-nowrap items-center border-solid border border-transparent active:border-primary-light hover:underline">
                    <span className="px-1 text-inherit">{nav.label}</span>
                    <ChevronDownIcon
                      className={clsx(
                        'h-4 w-4 text-inherit mt-2 transition-rotate duration-200 ease-in',
                        {
                          'rotate-180': open,
                        },
                      )}
                    />
                  </Menu.Button>
                  {nav.options && nav.options.length && (
                    <Menu.Items
                      className="bg-white absolute flex flex-col w-40 mt-2 rounded-lg drop-shadow-xl shadow-xl z-50"
                      as="section"
                    >
                      {nav.options.map((option, i) => (
                        <Menu.Item key={i + 1}>
                          {({ active }) => (
                            <Link href={option.link}>
                              <a
                                className={clsx(
                                  { 'bg-red-500': active },
                                  `p-3 capitalize text-slate-600 hover:bg-primary-light/10`,
                                )}
                              >
                                {option.label}
                              </a>
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  )}
                </>
              )}
            </Menu>
          ) : (
            <Link href={nav.link as string} key={nav.label}>
              <a className="bg-white text-slate-600 py-1 px-2 rounded-lg capitalize flex flex-nowrap items-center border-solid border-2 border-transparent active:border-primary-light hover:underline">
                {nav.label}
              </a>
            </Link>
          ),
        )}
      </div>
    </nav>
  )
}

export default NavBar
