import { useState } from 'react';
import { useQuery,useApolloClient } from '@apollo/client';

import Persons from './components/Persons'
import PersonForm from './components/PersonForm';
import Notify from './components/Notify'
import PhoneForm from './components/PhoneForm';
import LoginForm from './components/LoginForm'

import { ALL_PERSONS } from './queries';

const App = () => {
  const [token, setToken] = useState(null)
  
  const result = useQuery(ALL_PERSONS)
  const [errorMessage, setErrorMessage] = useState(null)

  const client = useApolloClient()

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  if (result.loading)  {
    return <div>loading...</div>
  }
  
  if (!token) {
    return (
      <>
        <Notify errorMessage={errorMessage} />
        <LoginForm setToken={setToken} setError={notify} />
      </>
    )
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (!token) {
    return (
      <>
        <Notify errorMessage={errorMessage} />
        <LoginForm setToken={setToken} setError={notify} />
      </>
    )
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <button onClick={logout}>logout</button>
      <Persons persons = {result.data.allPersons}/>
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </div>
  )
}

export default App