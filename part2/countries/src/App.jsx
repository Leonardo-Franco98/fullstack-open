import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import SearchResult from './components/SearchResult'
import CountryDetails from './components/CountryDetails'

function App() {
  const [search, setSearch] = useState("")
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(resp => {
        setCountries(resp.data)
      })
  }, [])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)

    setFilteredCountries(countries.filter(c => c.name.common.toLowerCase().includes(event.target.value.toLowerCase())))
    setSelectedCountry(null)
  }

  const handleCountryClick = (name) => {
    let country = countries.find(c => c.name.common === name)

    setSelectedCountry(country)
  }

  return (
    <>
      <Filter search={search} handleSearchChange={handleSearchChange} />
      <div>
        <SearchResult filteredCountries={filteredCountries} handleCountryClick={handleCountryClick} />
      </div>
      {
        selectedCountry ? (
          <CountryDetails country={selectedCountry} />
        ) : null
      }
    </>
  )
}

export default App