const Persons = ({ numbersToShow }) => {
    return (
        <>
            {numbersToShow.map(person => 
                <p key={person.id}>
                <strong>Name:</strong> {person.name} <strong>Phone number:</strong> {person.number}
                </p>
            )}
        </>
    )
}

export default Persons