const Hello = (props) => {
  return (
    <div>

      <p>Hello {props.name}</p>
    </div>
  )
}

const App = () => {
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Tomás"/>
      <Hello name="Sombo"/>
      <Hello name="ErMati"/>
    </div>
  )
}

export default App