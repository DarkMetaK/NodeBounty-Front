import { api } from '@lib/api.js'

export async function signIn({ email, senha }) {
  const response = await api.post('/clientes/login', {
    email,
    senha,
  })

  return response.data
}
