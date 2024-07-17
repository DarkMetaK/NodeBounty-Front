import { api } from '@lib/api.js'

export async function createCreditCard() {
  await api.post('/cartoes')
}
