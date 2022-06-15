import React from 'react'
import { Header } from './';
import { Helmet } from "react-helmet";

const Layout = ({children}) => {
  return (
    <div>
       <Helmet> <style> {"body { backgroun-iImage: linear-gradient(-225deg, #69EACB 0%, #EACCF8 48%, #6654F1 100%);}"}</style> </Helmet> 
      <Header />  
      {children}
    </div>
  )
}

export default Layout