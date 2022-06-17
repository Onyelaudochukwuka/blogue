import React, {useEffect} from 'react'
import { Header } from './';

const Layout = ({children}) => {
  return (
    <div>
      <Header />  
      {children}
    </div>
  )
}

export default Layout