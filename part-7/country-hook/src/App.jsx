import React, { useState, useEffect } from 'react'
import countriesService from "./services/countries"

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (name) {
      countriesService
        .getCountryByName(name)
        .then(returnedCountry => {
          setCountry(returnedCountry)
        })
    }
  }, [name])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        Not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data.name.common} </h3>
      <div>
        <strong>Capital:</strong> {country.data.capital[0]}
      </div>
      <div>
        <strong>Population:</strong> {country.data.population}
      </div>
      <img src={country.data.flags.png} height='100' alt={country.data.flags.alt} />
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button style={{ marginLeft: '1rem' }}>Find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App