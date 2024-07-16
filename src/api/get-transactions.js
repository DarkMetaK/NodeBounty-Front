import { api } from '@lib/api.js'

export async function getTransactions() {
  const response = await api.get('/transacoes')

  return response.data
}
