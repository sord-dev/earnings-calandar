import { Route, Routes, useNavigate } from 'react-router-dom'
import { Auth, CalendarPage } from './pages'
import { Header } from './components'
import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const navigate = useNavigate()
  const [watchListData, setWatchlistData] = useState([])

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


  return (
    <div>
      <Routes>
        <Route element={<Header {...{ watchListData }} />} >
          <Route path="/" element={<CalendarPage />} />
        </Route>
        <Route path="/authenticate" element={<Auth />} />
      </Routes>
    </div>
  )
}

export default App
