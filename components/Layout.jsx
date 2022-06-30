import React, {useEffect} from 'react'
import { Header } from './';
import Head from 'next/head';
const Layout = ({children}) => {
  return (
    <div>
      <Head>
        <title>Blogue</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />  
      {children}
    </div>
  )
}

export default Layout