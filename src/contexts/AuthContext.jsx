import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from 'react-query'

import { api } from '../lib/api'

export const authContext = createContext({})

export function AuthContextProvider({ children }) {
  const [token, setToken] = useState(null)
  const [authIsLoading, setAuthIsLoading] = useState(false)
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  // Recuperando token do localstorage caso exista
  useEffect(() => {
    async function retrieveToken() {
      setAuthIsLoading(true)
      const token = localStorage.getItem('node-bounty')
      if (token) {
        setToken(token)
        api.defaults.headers.common.Authorization = `Bearer ${token}`
      }
      setAuthIsLoading(false)
    }
    retrieveToken()
  }, [])

  // Passando o método de logout para as configs do axios
  useEffect(() => {
    api.registerInterceptTokenManager(logout)
  }, [logout])

  // Método para salvar o token no localstorage e depois no estado
  function saveToken(token) {
    localStorage.setItem('node-bounty', token)
    setToken(token)
    api.defaults.headers.common.Authorization = `Bearer ${token}`
  }

  // Método para remover o token (Fazer logout)
  function logout() {
    localStorage.removeItem('node-bounty')
    setToken(null)
    api.defaults.headers.common.Authorization = null
    navigate('/')
    queryClient.invalidateQueries()
  }

  return (
    <authContext.Provider
      value={{
        token,
        authIsLoading,
        saveToken,
        logout,
      }}
    >
      {children}
    </authContext.Provider>
  )
}
