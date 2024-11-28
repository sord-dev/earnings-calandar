import { Route, Routes } from 'react-router-dom'
import { Auth, CalendarPage, Preferences, Stocks, Trending } from './pages'
import { AsideNavbar, Header } from './components'

import { useState } from 'react';

function App() {
  const [asideActive, setAsideActive] = useState(false);

  return (
    <Routes>
      <Route element={<Header {...{ setAsideActive }} />} >
        <Route element={<AsideNavbar active={asideActive} />}>
          <Route path="/" element={<CalendarPage />} />

          <Route path="/watch-list" element={<div>Watch List</div>} />
          <Route path="/trends" element={<Trending />} />
          <Route path="/stocks" element={<Stocks />} />

          <Route path="/settings" element={<Preferences />} />
        </Route>
      </Route>
      <Route path="/authenticate" element={<Auth />} />
    </Routes>
  )
}

export default App
