import { useState, useEffect } from "react"

import countriesService from "./services/countries"

function App() {
  const [countries, setCountries] = useState([])
  const [showedCountries, setShowedCountries] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    countriesService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])
  
  const handleShowedCountries = (event) => {
    setShowedCountries(event.target.value)
    setSelectedCountry(null);
  }

  const handleShowDetails = (country) => {
    setSelectedCountry(country);
  };

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
      ) : selectedCountry ? (
        <div>
          <h2>{selectedCountry.name.common}</h2>
          <p>
            <strong>Capital:&nbsp;</strong>
            {selectedCountry.capital}
          </p>
          <p>
            <strong>Area:&nbsp;</strong>
            {selectedCountry.area} km²
          </p>
          <h4>Languages:</h4>
          <ul>
            {Object.values(selectedCountry.languages).map((lang, index) => (
              <li key={index}>{lang}</li>
            ))}
          </ul>
          <img
            src={selectedCountry.flags.png}
            alt={`Flag of ${selectedCountry.name.common}`}
            style={{ width: "200px" }}
          />
          <div style={{marginTop: '1rem'}}>
            <button onClick={() => setSelectedCountry(null)}>Back to list</button>
          </div>
        </div>
      ) : (
        countriesToShow.map(country => (
          <li key={country.name.official} style={{marginTop: '1rem'}}>
            <span>{country.name.common}&nbsp;</span>
            <button onClick={() => handleShowDetails(country)}>
              Show details
            </button>
          </li>
        ))
      )}
    </div>
  )
}

export default App
