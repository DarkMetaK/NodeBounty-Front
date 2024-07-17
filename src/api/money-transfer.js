import { api } from '@lib/api.js'

export async function moneyTransfer({ valor, numeroConta }) {
  await api.post('/transacoes/transferir', {
    valor,
    numeroConta,
  })
}
