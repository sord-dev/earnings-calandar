import { Route, Routes } from 'react-router-dom'
import { Auth, CalendarPage, Stocks } from './pages'
import { AsideNavbar, Header } from './components'

import { useEffect, useState } from 'react';

function App() {
  const [asideActive, setAsideActive] = useState(false);

  return (
    <Routes>
      <Route element={<Header {...{ setAsideActive }} />} >
        <Route element={<AsideNavbar active={asideActive} />}>
          <Route path="/" element={<CalendarPage />} />

          <Route path="/watch-list" element={<div>Watch List</div>} />
          <Route path="/trends" element={<div>Stock Trends</div>} />
          <Route path="/stocks" element={<Stocks />} />

          <Route path="/settings" element={<div>Preferences</div>} />
        </Route>
      </Route>
      <Route path="/authenticate" element={<Auth />} />
    </Routes>
  )
}

export default App
