import React from 'react'

const Boldmark = (props) => {
  return (
    <pre {...props.attributes}>
      <strong>{children}</strong>
    </pre>
  )
}

export default Boldmark