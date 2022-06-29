
const Boldmark = (props) => {
  return (
    <pre {...props.attributes}>
      <strong>{props.children}</strong>
    </pre>
  )
}

export default Boldmark