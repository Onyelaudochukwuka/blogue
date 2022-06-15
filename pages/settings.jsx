import React,{useState, useEffect} from 'react'
const div1 = {
  backgroundImage: "linear-gradient(-225deg, #69EACB 0%, #EACCF8 48%, #6654F1 100%)";
}
const settings = () => {
  const [storage setStorage] = useEffect('');
  //background-image: linear-gradient(-225deg, #69EACB 0%, #EACCF8 48%, #6654F1 100%);
  return (
    <div className="m-auto grid md:grid-cols-4 grid-cols-1">
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500" style={div1}></div>
    </div>
  )
}

export default settings