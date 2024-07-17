import { api } from '@lib/api.js'

export async function deleteCreditCard(id) {
  await api.delete(`/cartoes/${id}`)
}
