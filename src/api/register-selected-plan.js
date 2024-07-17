import { api } from '@lib/api.js'

export async function registerSelectedPlan({ nomePlano }) {
  await api.post('/conta', {
    nomePlano,
  })
}
