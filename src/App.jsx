import { Route, Routes } from 'react-router-dom'
import { Auth, CalendarPage } from './pages'
import { AsideNavbar, Header } from './components'

import { useWatchListData } from './hooks';
import { useState } from 'react';

function App() {
  const { watchListData } = useWatchListData([])
  const [asideActive, setAsideActive] = useState(false)

  return (
    <div>
      <Routes>
        <Route element={<Header {...{ watchListData, setAsideActive }} />} >
          <Route element={<AsideNavbar active={asideActive}  />}>
            <Route path="/" element={<CalendarPage />} />

            <Route path="/watch-list" element={<div>Watch List</div>} />
            <Route path="/trends" element={<div>Stock Trends</div>} />
            <Route path="/stocks" element={<div>Stocks</div>} />

            <Route path="/settings" element={<div>Preferences</div>} />
          </Route>
        </Route>
        <Route path="/authenticate" element={<Auth />} />
      </Routes>
    </div>
  )
}

export default App
