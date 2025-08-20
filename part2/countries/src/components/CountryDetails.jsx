import { useState, useEffect } from "react"
import axios from "axios"

const CountryDetails = ({ country }) => {
    const [weather, setWeather] = useState(null)

    const weatherAPIKey = import.meta.env.VITE_WEATHER_API_KEY

    useEffect(() => {
        axios.get(`http://api.weatherapi.com/v1/current.json?key=${weatherAPIKey}&q=${country.capitalInfo.latlng[0]},${country.capitalInfo.latlng[1]}&aqi=no`)
            .then(resp => {
                setWeather(resp.data.current)
    console.log(resp.data.current)
            })
    }, [])

    let langs = []
    for (let l in country.languages) {
        langs.push(country.languages[l])
    } 

    return (
        <>
            <h1>{country.name.common}</h1>
            <p>Capital: {country.capital[0]}</p>
            <p>Area: {country.area} km2</p>
            <h2>Languages:</h2>
            <ul>
                {langs.map(l => <li key={l}>{l}</li>)}
            </ul>
            <img src={country.flags.png} alt={country.flags.alt} />
            {
                weather ? (
                    <>
                        <h2>Weather in {country.capital[0]}</h2>
                        <p>Temperature: {weather.temp_c} Celsius</p>
                        <img src={weather.condition.icon} alt={weather.condition.text} />
                        <p>Wind: {weather.wind_kph} Km/h</p>
                    </>
                ) : null
            }
        </>
    )
}

export default CountryDetails