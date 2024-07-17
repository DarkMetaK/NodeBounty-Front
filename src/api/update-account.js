import { api } from '@lib/api.js'

export async function updateAccount({
  nome,
  telefone,
  cep,
  endereco,
  numero,
  senha,
}) {
  await api.put('/clientes', {
    nome,
    telefone,
    cep,
    endereco,
    numero,
    senha,
  })
}
