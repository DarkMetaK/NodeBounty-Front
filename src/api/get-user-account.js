import { api } from '@lib/api.js'

export async function getUserAccount() {
  const response = await api.get('/conta')

  return response.data
}
