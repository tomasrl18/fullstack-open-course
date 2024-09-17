const TotalExercises = ({ parts }) => {
  function getTotalExercises() {
    let total = 0;

    parts.forEach(part => {
      total += part.exercises
    });

    return total;
  }

  const totalExercises = getTotalExercises()
  
  return (
    <p style={{fontWeight: 'bold'}}>
      Total of {totalExercises} exercises
    </p>
  )
}

const Title = ({courseName}) => {
  return <h1>{courseName}</h1>
}

const Parts = ({ parts }) => {
  return (
    parts.map(part => 
      <p key={part.id}>
        {part.name} {part.exercises}
      </p>
    )
  )
}

const Course = ({ courses }) => {
  return (
    <>
      <h1>Web development curriculum</h1>
      {courses.map(course => 
        <div key={course.id}>
          <Title courseName={course.name} />

          <Parts parts={course.parts} />

          <TotalExercises parts={course.parts} />
        </div>
      )}
    </>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return <Course courses={courses} />
}

export default App