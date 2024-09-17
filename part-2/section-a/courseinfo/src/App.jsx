const Course = ({ course }) => {
  const parts = course.parts
  
  function getTotalExercises() {
    let total = 0;

    parts.forEach(part => {
      total += part.exercises
    });

    return total;
  }

  let totalExercises = getTotalExercises()
  
  return (
    <>
      <h1>{course.name}</h1>
      {parts.map(part => 
        <p key={part.id}>
          {part.name} {part.exercises}
        </p>
      )}
      <p style={{fontWeight: "bold"}}>Total of {totalExercises} exercises</p>
    </>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 1,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App