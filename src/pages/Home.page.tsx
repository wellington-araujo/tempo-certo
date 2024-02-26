import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ILocationSuggestions } from '../types/locationSuggestions.type'
import { api } from '../services/api'
import { API_KEY } from '../constants/api.constants'
import { WeatherContext } from '../providers/weather.provider'

function HomePage() {
  const { searchWeatherInformation, weatherInformation } =
    useContext(WeatherContext)

  const [searchValue, setSearchValue] = useState('')
  const [locationSuggestions, setLocationSuggestions] = useState<
    ILocationSuggestions[]
  >([])

  useEffect(() => {
    setLocationSuggestions([])

    const getSuggestions = async () => {
      const { data } = await api.get(
        `/geo/1.0/direct?q=${searchValue}&limit=5&appid=${API_KEY}`,
      )
      setLocationSuggestions(data)
    }

    if (searchValue.length > 1) {
      getSuggestions()
    }
  }, [searchValue])

  async function changeWeatherInformation(latitude: number, longitude: number) {
    await searchWeatherInformation(latitude, longitude)
    console.log(weatherInformation)
  }

  return (
    <div className="min-h-screen">
      <header className="sticky w-full border-b">
        <nav className="mx-auto flex max-w-[606px] items-center py-2">
          <Link to="/" className="text-2xl font-semibold">
            Tempo<span className="text-brand-color">Certo</span>
          </Link>
        </nav>
      </header>
      <section className="relative flex h-40 items-baseline justify-center bg-[url('/imgs/bg-1.jpg')] bg-cover">
        <div className="mt-10 w-80 overflow-hidden rounded-md bg-white shadow-md">
          <input
            type="text"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            className="w-80 rounded-t px-4 py-2 outline-none"
          />
          <ul
            className={`${locationSuggestions.length > 0 && 'border-t-2 border-brand-color'} divide-y-2`}
          >
            {locationSuggestions.length > 0 &&
              locationSuggestions.map((location) => {
                return (
                  <li
                    key={location.lat}
                    onClick={() =>
                      changeWeatherInformation(location.lat, location.lon)
                    }
                    className="cursor-pointer px-4 py-2 hover:bg-zinc-100"
                  >
                    <h3 className="mb-[-5px] text-lg">{location.name}</h3>
                    <span className="text-sm text-zinc-400">
                      {location.state
                        ? `${location.state}, ${location.country}`
                        : `${location.country}`}
                    </span>
                  </li>
                )
              })}
          </ul>
        </div>
      </section>
    </div>
  )
}

export { HomePage }
