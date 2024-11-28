import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { PreferenceContextProvider } from './contexts/preferences.context.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PreferenceContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PreferenceContextProvider>
  </StrictMode>
)
