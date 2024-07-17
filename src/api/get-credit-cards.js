import { api } from '@lib/api.js'

export async function getCreditCards() {
  const response = await api.get('/cartoes')

  return response.data
}
