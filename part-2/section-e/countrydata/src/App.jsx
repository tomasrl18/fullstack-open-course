import { useState, useEffect } from "react"

import countriesService from "./services/countries"

function App() {
  const [countries, setCountries] = useState([])
  const [showedCountries, setShowedCountries] = useState('')

  useEffect(() => {
    countriesService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])
  
  const handleShowedCountries = (event) => {
    setShowedCountries(event.target.value)
  }

  const countriesToShow = !showedCountries
    ? countries
    : countries.filter(country =>
      country.name.common.toLowerCase().includes(showedCountries.toLowerCase())
    )

  return (
    <div>
      <label htmlFor="countries">Find country: </label>
      <input id="countries" value={showedCountries} onChange={handleShowedCountries} />

      {countriesToShow.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : countriesToShow.length === 1 ? (
        <div>
          <h2>{countriesToShow[0].name.common}</h2>
          <p>
            <strong>Capital:&nbsp;</strong>
            {countriesToShow[0].capital}
          </p>
          <p>
            <strong>Area:&nbsp;</strong>
            {countriesToShow[0].area} km²
          </p>
          <h4>Languages:</h4>
          <ul>
            {Object.values(countriesToShow[0].languages).map((lang, index) => (
              <li key={index}>{lang}</li>
            ))}
          </ul>
          <img
            src={countriesToShow[0].flags.png}
            alt={`Flag of ${countriesToShow[0].name.common}`}
            style={{ width: "200px" }}
          />
        </div>
      ) : (
        countriesToShow.map(country => (
          <p key={country.name.official}>{country.name.common}</p>
        ))
      )}
    </div>
  )
}

export default App
