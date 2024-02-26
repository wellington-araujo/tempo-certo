import { createContext, useEffect, useState } from 'react'
import { IChildren } from '../types/children.type'
import { IWeatherInformation } from '../types/weatherInformation.type'
import { api } from '../services/api'
import { API_KEY } from '../constants/api.constants'

interface IWeatherContext {
  weatherInformation: IWeatherInformation | null
  searchWeatherInformation: (
    latitude: number,
    longitude: number,
  ) => Promise<void>
}

export interface ISearchHistoryItem {
  latitude: number
  longitude: number
}

const WeatherContext = createContext({} as IWeatherContext)

function WeatherProvider({ children }: IChildren) {
  const [weatherInformation, setWeatherInformation] =
    useState<IWeatherInformation | null>(null)

  useEffect(() => {
    const searchHistoryString: string | null =
      localStorage.getItem('search-history')

    const searchHistory: ISearchHistoryItem | null = searchHistoryString
      ? JSON.parse(searchHistoryString)
      : null

    const initializeWeatherData = async () => {
      if (searchHistory) {
        await searchWeatherInformation(
          searchHistory.latitude,
          searchHistory.longitude,
        )
      } else {
        await searchWeatherInformation(-22.9110137, -43.2093727)
      }
    }

    if (!weatherInformation) {
      initializeWeatherData()
    }
  }, [weatherInformation])

  const searchWeatherInformation = async (
    latitude: number,
    longitude: number,
  ) => {
    const { data } = await api.get(
      `/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`,
    )
    setWeatherInformation(data)
    localStorage.setItem(
      'search-history',
      JSON.stringify({ latitude, longitude }),
    )
  }

  return (
    <WeatherContext.Provider
      value={{
        weatherInformation,
        searchWeatherInformation,
      }}
    >
      {children}
    </WeatherContext.Provider>
  )
}

export { WeatherContext, WeatherProvider }
