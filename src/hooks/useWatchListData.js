import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function useWatchListData(defaultValue = []) {
    const [watchListData, setWatchlistData] = useState(defaultValue)
    const navigate = useNavigate()

    useEffect(() => {
      const getWatchlistData = async () => {
        try {
          const response = await axios.get('http://localhost:3003/api/tickers', { withCredentials: true })
          const data = response.data
          console.log(data)
          setWatchlistData(data)
        } catch (error) {
          if (error.response.status === 401) {
            navigate('/authenticate')
          } else {
            console.log(error)
          }
        }
      }
      getWatchlistData()
    }, [])
  
  return { watchListData }
}

export default useWatchListData