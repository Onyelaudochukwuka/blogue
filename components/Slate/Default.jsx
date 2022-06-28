import React from 'react'

const Default = (props) => {
  return (
      <p {...props.attributes}>
         {props.children}
      </p>  )
}

export default Default