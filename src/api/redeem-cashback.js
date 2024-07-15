import { api } from '@lib/api.js'

export async function redeemCashback() {
  await api.post('/transacoes/resgatar')
}
