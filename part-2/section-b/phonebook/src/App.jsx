import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {
      id: 1,
      name: 'Arto Hellas',
      phoneNumber: '040-123456'
    },
    {
      id: 2,
      name: 'Ada Lovelace',
      phoneNumber: '39-44-5323523'
    },
    {
      id: 3,
      name: 'Dan Abramov',
      phoneNumber: '12-43-234345'
    },
    {
      id: 4,
      name: 'Mary Poppendieck',
      phoneNumber: '39-23-6423122'
    }
  ])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [show, setShow] = useState('')

  const isNameGiven = (newName) => {
    return persons.some(person => person.name.toLowerCase() == newName.toLowerCase())
  }

  const addName = (event) => {
    event.preventDefault()

    if (isNameGiven(newName)) {
      alert(`${newName} is already added on the phonebook`)
      setNewName('')
      setNewPhoneNumber('')
      return
    } 

    const person = {
      id: persons.length + 1,
      name: newName,
      phoneNumber: newPhoneNumber
    }

    setPersons(persons.concat(person))
    setNewName('')
    setNewPhoneNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneNumberChange = (event) => {
    setNewPhoneNumber(event.target.value)
  }

  const handleShowChange = (event) => {
    setShow(event.target.value)
  }

  const numbersToShow = !show
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(show.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>

      Filter by names with <input value={show} onChange={handleShowChange}/>

      <form onSubmit={addName}>
        <h2>Add a new</h2>
        <div>
          Name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          Phone number: <input value={newPhoneNumber} onChange={handlePhoneNumberChange} />
        </div>
        <div style={{marginTop: '1rem'}}>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {numbersToShow.map(person => 
        <p key={person.id}>
          <strong>Name:</strong> {person.name} <strong>Phone number:</strong> {person.phoneNumber}
        </p>
      )}
    </div>
  )
}

export default App