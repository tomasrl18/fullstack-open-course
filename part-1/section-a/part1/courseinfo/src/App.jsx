const Header = (props) => {
  return <h1>{props.course.name}</h1>
}

const Content = (props) => {
  let course = props.course
  
  return (
    <>
      <Part part={course.parts[0]} />
      <Part part={course.parts[1]} />
      <Part part={course.parts[2]} />
    </>
  )
}

const Part = (props) => {
  let part = props.part

  return <p>{part.name} {part.exercises}</p>
}

const Total = (props) => {
  let courseParts = props.course.parts

  let exercisesPart1 = courseParts[0].exercises
  let exercisesPart2 = courseParts[0].exercises
  let exercisesPart3 = courseParts[0].exercises

  let totalExercises = exercisesPart1 + exercisesPart2 + exercisesPart3
  return <p>Number of exercises {totalExercises}</p>
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }
  
  return (
    <>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </>
  )
}

export default App