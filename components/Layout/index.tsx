import { UserIcon } from '@heroicons/react/24/solid'
import React from 'react'
import Footer from '../Footer'
import Header from '../Header'
import { LayoutProps } from './@types'

const HeaderTwo = () => {
  return (
    <header className="bg-primary w-full">
      <div className=" container mx-auto py-2 flex flex-nowrap items-center">
        <h5 className="text-3xl md:text-4xl font-serif text-white">Pubsgate</h5>
        <div className="grow" />
        <button className="p-3 rounded-full bg-layout-col">
          <UserIcon className="w-5 h-5 text-gray-500" />
        </button>
      </div>
    </header>
  )
}

const Layout: React.ComponentType<LayoutProps> = (props) => {
  const variant = props.variant || 1
  const header = {
    1: <Header />,
    2: <HeaderTwo />,
  }

  return (
    <React.Fragment>
      {header[variant]}
      {props.children}
      <Footer />
    </React.Fragment>
  )
}

export default Layout
