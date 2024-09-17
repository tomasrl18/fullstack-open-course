const Persons = ({ numbersToShow }) => {
    return (
        <>
            {numbersToShow.map(person => 
                <p key={person.id}>
                <strong>Name:</strong> {person.name} <strong>Phone number:</strong> {person.phoneNumber}
                </p>
            )}
        </>
    )
}

export default Persons