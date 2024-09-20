const Countries = ({ countriesToShow, handleShowDetailsEvent }) => {
    return (
        countriesToShow.map(country => (
            <li key={country.name.official} style={{marginTop: '1rem'}}>
              <span>{country.name.common}&nbsp;</span>
              <button onClick={() => handleShowDetailsEvent(country)}>
                Show details
              </button>
            </li>
        ))
    )
}

export default Countries