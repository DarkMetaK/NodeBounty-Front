import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import './lib/dayjs'

import { AuthContextProvider } from '@contexts/AuthContext'
import { Router } from '@/Router.jsx'
import './global.css'

export function App() {
  //routes 
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Router />
      </AuthContextProvider>
    </BrowserRouter>
  )
}
