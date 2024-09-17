import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {
      id: 1,
      name: 'Arto Hellas',
      phoneNumber: 123456789
    }
  ])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')

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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
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
      {persons.map(person => 
        <p key={person.id}>
          <strong>Name:</strong> {person.name} <strong>Phone number:</strong>{person.phoneNumber}
        </p>
      )}
    </div>
  )
}

export default App