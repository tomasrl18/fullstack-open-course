const Header = (props) => {
  return (
    <>
      <h1>{props.courseName}</h1>
    </>
  )
}

const Content = (props) => {
  return (
    <>
      <Part part={props.part1} exercises={props.exercises1} />
      <Part part={props.part2} exercises={props.exercises2} />
      <Part part={props.part3} exercises={props.exercises3} />
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>
        {props.part} {props.exercises}
      </p>
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.totalExercise}</p>
    </>
  )
}

const App = () => {
  const exercises1 = 10
  const exercises2 = 7
  const exercises3 = 14

  return (
    <>
      <Header courseName='Half Stack application development' />
      <Content part1='Fundamentals of React' part2='Using props to pass data' part3='State of a component' exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} />
      <Total totalExercise={exercises1 + exercises2 + exercises3} />
    </>
  )
}

export default App