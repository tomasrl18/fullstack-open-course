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

export default TotalExercises