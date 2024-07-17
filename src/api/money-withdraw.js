import { api } from '@lib/api.js'

export async function moneyWithdraw({ valor }) {
  await api.post('/transacoes/sacar', {
    valor,
  })
}
