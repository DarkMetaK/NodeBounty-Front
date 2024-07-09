import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import './lib/dayjs'

import './global.css'
import { AuthContextProvider } from '@contexts/AuthContext'
import { Router } from '@/Router.jsx'

export function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Router />
      </AuthContextProvider>
    </BrowserRouter>
  )
}
