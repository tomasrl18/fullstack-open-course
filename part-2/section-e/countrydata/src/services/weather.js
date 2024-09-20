import axios from 'axios'

const API_KEY = import.meta.env.VITE_SOME_KEY

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'

const getWeatherOfACountry = (countryName) => {
    const request = axios.get(`${baseUrl}?q=${countryName}&appid=${API_KEY}`)
    return request.then(response => response.data)
}

export default { getWeatherOfACountry }