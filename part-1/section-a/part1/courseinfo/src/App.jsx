const Header = (props) => {
  return <h1>{props.courseName}</h1>
}

const Content = (...props) => {
  return (
    <>
      <Part part={props[0].parts[0]} />
      <Part part={props[0].parts[1]} />
      <Part part={props[0].parts[2]} />
    </>
  )
}

const Part = (props) => {
  return <p>{props.part.name} {props.part.exercises}</p>
}

const Total = (...props) => {
  let exercisesPart1 = props[0].parts[0].exercises
  let exercisesPart2 = props[0].parts[1].exercises
  let exercisesPart3 = props[0].parts[2].exercises

  let totalExercises = exercisesPart1 + exercisesPart2 + exercisesPart3
  return <p>Number of exercises {totalExercises}</p>
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <>
      <Header courseName={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </>
  )
}

export default App