import { useEffect, useState } from 'react'
import { api } from '../services/api'

function HomePage() {
  const [dataApi, setDataApi] = useState({})

  useEffect(() => {
    async function getDataApi() {
      const { data } = await api.get(
        '?lat=44.34&lon=10.99&appid=861f363180a5f9bbea875454c4ec4870',
      )
      setDataApi(data)
    }

    getDataApi()
    console.log(dataApi)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div className="grid h-screen place-items-center text-5xl">Home</div>
}

export { HomePage }
