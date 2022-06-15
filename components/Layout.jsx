import React from 'react'
import { Header } from './';

const Layout = ({children}) => {
  return (
    <body className="bg-gradient-to-r from-violet-500 to-fuchsia-500 h-screen">
      <Header />  
      {children}
    </body>
  )
}

export default Layout