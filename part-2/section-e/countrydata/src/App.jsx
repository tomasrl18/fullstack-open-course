import { useState, useEffect } from "react"

import countriesService from "./services/countries"
import weatherService from "./services/weather"

import Country from "./components/Country"
import Countries from "./components/Countries"

function App() {
  const [countries, setCountries] = useState([])
  const [showedCountries, setShowedCountries] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCountryWeather, setSelectedCountryWeather] = useState(null);

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

    weatherService
      .getWeatherOfACountry(country.name.common.toLowerCase())
      .then(returnedCountryWeater => {
        setSelectedCountryWeather(returnedCountryWeater)
      })
      .catch(err => console.error(err))
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
          <Country
            selectedCountry={selectedCountry}
            selectedCountryWeather={selectedCountryWeather}
          />

          <div style={{marginTop: '1rem'}}>
            <button onClick={() => {setSelectedCountry(null); setSelectedCountryWeather(null)}}>Back to list</button>
          </div>
        </div>
      ) : (
        <Countries countriesToShow={countriesToShow} handleShowDetailsEvent={handleShowDetails}/>
      )}
    </div>
  )
}

export default App
