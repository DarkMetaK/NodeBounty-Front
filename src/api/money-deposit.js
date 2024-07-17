import { api } from '@lib/api.js'

export async function moneyDeposit({ valor }) {
  await api.post('/transacoes/depositar', {
    valor,
  })
}
