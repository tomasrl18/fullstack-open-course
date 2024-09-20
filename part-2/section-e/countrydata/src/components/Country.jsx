const Country = ({ selectedCountry, selectedCountryWeather }) => {
  return (
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
      <h2>Weather in {selectedCountry.capital}</h2>

      {selectedCountryWeather ? (
        <div>
          <p>
            <strong>Temperature:&nbsp;</strong>
            {Math.round(selectedCountryWeather.main.temp - 273.15)}ºC
          </p>
          <img
            src={`https://openweathermap.org/img/wn/${selectedCountryWeather.weather[0].icon}@2x.png`}
            alt={`Icon weather of ${selectedCountry.name.common}`}
          />
          <p>
            <strong>Wind speed:&nbsp;</strong>
            {selectedCountryWeather.wind.speed} m/s
          </p>
        </div>
      ) : (
        <p>
            Loading weather data...
        </p>
      )}
    </div>
  )
}

export default Country