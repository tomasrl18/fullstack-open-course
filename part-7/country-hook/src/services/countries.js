import axios from 'axios'
const baseUrl = 'https://restcountries.com/v3.1'

const getCountryByName = (countryName) => {
    const request = axios.get(`${baseUrl}/name/${countryName}`)
    return request.then(response => {
      if (response.data.length > 0) {
        return {
          found: true,
          data: response.data[0] // Tomar el primer país en caso de que haya más de uno
        }
      } else {
        return { found: false }
      }
    })
    .catch(error => {
      // En caso de error, devolver que no se encontró el país
      return { found: false }
    })
}

export default { getCountryByName }
