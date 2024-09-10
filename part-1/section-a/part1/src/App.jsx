const Hello = (props) => {
  console.log(props);
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  )
}

const App = () => {
  const age = 20

  return (
    <>
      <h1>Greetings</h1>
      <Hello name="Tomás" age={age + 1}/>
      <Hello name="Sombo" age={age + 2}/>
      <Hello name="ErMati" age={2}/>
    </>
  )
}

export default App