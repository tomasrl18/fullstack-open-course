import personService from '../services/persons'

const Persons = ({ numbersToShow, onDelete }) => {
    const deletePerson = ({ id, name }) => {
        let res = window.confirm(`Delete ${name} ?`);

        if (res) {
            personService
                .destroy(id)
                .then(() => {
                    onDelete(id)
                })
                .catch(error => {
                    console.error('Error al eliminar el contacto:', error)
                });
        }
    }

    return (
        <>
            {numbersToShow.map(person => 
                <p key={person.id}>
                    <strong>Name:</strong> {person.name} <strong>Phone number:</strong> {person.number}
                    <button
                        style={{marginLeft: '1rem'}}
                        onClick={() => deletePerson(person)}>
                        Delete
                    </button>
                </p>
            )}
        </>
    )
}

export default Persons