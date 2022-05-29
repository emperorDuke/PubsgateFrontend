import React from 'react'
import Footer from '../Footer'
import Header from '../Header'
import { LayoutProps } from './@types'

const Layout: React.ComponentType<LayoutProps> = (props) => {
  return (
    <React.Fragment>
      <Header />
      {props.children}
      <Footer />
    </React.Fragment>
  )
}

export default Layout
