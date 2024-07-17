import { api } from '@lib/api.js'

export async function getAvailablePlans() {
  const response = await api.get('/planos')

  return response.data
}
