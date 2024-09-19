import { useState, useEffect } from 'react'

import personService from './services/persons'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [show, setShow] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const isNameInDB = (newName) => {
    return persons.some(person => person.name.toLowerCase() == newName.toLowerCase())
  }

  const isPhoneInDB = (newPhone) => {
    return persons.some(person => person.number == newPhone)
  }

  const editPhoneNumber = () => {
    const person = persons.find(person => person.name === newName)
    const changedPerson = { ...person, number: newPhoneNumber }

    personService
      .update(changedPerson.id, changedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== changedPerson.id ? person : returnedPerson))
        setNewName('')
        setNewPhoneNumber('')
      })
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (isNameInDB(newName) && isPhoneInDB(newPhoneNumber)) {
      alert(`${newName} is already added on the phonebook`)
      setNewName('')
      setNewPhoneNumber('')
      return
    }

    if (isNameInDB(newName) && !isPhoneInDB(newPhoneNumber)) {
      let res = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);

      if (res) {
        editPhoneNumber()

        return
      }
    }

    const person = {
      name: newName,
      number: newPhoneNumber,
    }

    personService
      .create(person)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewPhoneNumber('')
      })
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

  const handleDelete = (id) => {
    setPersons(persons.filter(person => person.id !== id));
  }

  const numbersToShow = !show
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(show.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>

      <Filter show={show} event={handleShowChange}/>

      <h2>Add a new</h2>

      <PersonForm
        eventOnSubmit={addPerson}
        newNameValue={newName}
        eventName={handleNameChange}
        newPhoneNumberValue={newPhoneNumber}
        eventPhoneNumbwe={handlePhoneNumberChange}
      />

      <h2>Numbers</h2>

      <Persons numbersToShow={numbersToShow} onDelete={handleDelete} />
    </div>
  )
}

export default App