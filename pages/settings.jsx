import React,{useState, useEffect} from 'react'
const settings = () => {
    const [storage, setStorage] = useState('');
    const div1 = {
      backgroundImage: "linear-gradient(-225deg, #69EACB 0%, #EACCF8 48%, #6654F1 100%)",
    }
  return (
    <div className="m-auto grid md:grid-cols-4 grid-cols-1">
        <span className="w-1/3 h-12 rounded-full cursor-pointer" style={div1} onClick={()=>window.localStorage.setItem('background',div1.backgroundImage)}></span>
    </div>
  )
}

export default settings;