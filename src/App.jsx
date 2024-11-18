import { Route, Routes } from 'react-router-dom'
import { Auth, CalendarPage } from './pages'
import { AsideNavbar, Header } from './components'

import { useWatchListData } from './hooks';

function App() {
  const { watchListData } = useWatchListData([])

  return (
    <div>
      <Routes>
        <Route element={<Header {...{ watchListData }} />} >
          <Route element={<AsideNavbar />}>

            <Route path="/" element={<CalendarPage />} />
          </Route>
        </Route>
        <Route path="/authenticate" element={<Auth />} />
      </Routes>
    </div>
  )
}

export default App
