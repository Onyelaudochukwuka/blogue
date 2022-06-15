import React, {useEffect} from 'react'
import { Header } from './';

const Layout = ({children}) => {
  useEffect(()=> {
        document.body.style.backgroundImage= window.localStorage.getItem('background') ? window.localStorage.getItem('background') : "linear-gradient(-225deg, #231557 0%, #44107A 29%, #FF1361 67%, #FFF800 100%)";
  },[window.localStorage.getItem('background')])
  return (
    <div className="h-screen">
      <Header />  
      {children}
    </div>
  )
}

export default Layout