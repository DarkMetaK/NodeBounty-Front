import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from 'react-query'
import 'bootstrap/dist/css/bootstrap.min.css'

import './lib/dayjs'

import './global.css'
import { AuthContextProvider } from '@contexts/AuthContext'
import { queryClient } from '@lib/react-query'
import { ScrollToTop } from '@components/ScrollToTop'
import { Router } from '@/Router.jsx'

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthContextProvider>
          <ScrollToTop />
          <Router />
        </AuthContextProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
