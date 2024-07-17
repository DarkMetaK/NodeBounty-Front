import { api } from '@lib/api.js'

export async function deleteAccount() {
  await api.delete('/clientes')
}
