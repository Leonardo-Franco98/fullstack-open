import CountryDetails from "./CountryDetails"

const SearchResult = ({ filteredCountries, handleCountryClick }) => {
    if (filteredCountries.length > 10) {
        return <p>Too many matches, specify another field</p>
    }

    if (filteredCountries.length > 1) {
        return (
            <ul>
                {filteredCountries.map(c => {
                    return (
                        <li key={c.name.common}>{c.name.common} 
                            <button onClick={() => handleCountryClick(c.name.common)}>Show</button>
                        </li>
                    )
                })}
            </ul>
        )
    }

    if (filteredCountries.length > 0) {
        return <CountryDetails country={filteredCountries[0]} />
    }

    return null
}

export default SearchResult