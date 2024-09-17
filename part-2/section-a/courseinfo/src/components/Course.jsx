import Title from './Title'
import Parts from './Parts'
import TotalExercises from './TotalExercises'

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

export default Course