import { api } from '@lib/api.js'

export async function registerUser({
  nome,
  cpf,
  rg,
  dataNascimento,
  telefone,
  email,
  cep,
  endereco,
  numero,
  senha,
}) {
  await api.post('/clientes', {
    nome,
    cpf,
    rg,
    dataNascimento,
    telefone,
    email,
    cep,
    endereco,
    numero,
    senha,
  })
}
