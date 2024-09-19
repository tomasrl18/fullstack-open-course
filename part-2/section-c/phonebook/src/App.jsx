import { useState, useEffect } from 'react'

import axios from 'axios'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [show, setShow] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

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
      number: newPhoneNumber
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

      <Filter show={show} event={handleShowChange}/>

      <h2>Add a new</h2>

      <PersonForm
        eventOnSubmit={addName}
        newNameValue={newName}
        eventName={handleNameChange}
        newPhoneNumberValue={newPhoneNumber}
        eventPhoneNumbwe={handlePhoneNumberChange}
      />

      <h2>Numbers</h2>

      <Persons numbersToShow={numbersToShow}/>
    </div>
  )
}

export default App