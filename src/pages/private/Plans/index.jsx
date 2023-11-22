import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { api } from '@lib/api.js'
import { authContext } from '@contexts/AuthContext.jsx'

import { Loading } from '@components/Loading'
import { Button } from '@components/Button'

export function Plans() {
  const [plans, setPlans] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedPlan, setSelectedPlan] = useState('Beauty')
  const navigate = useNavigate()
  const { logout } = useContext(authContext)

  useEffect(() => {
    async function retrievePlansData() {
      // Verificando se o usuário possui uma conta já registrada. Caso tenha, redirecionar direto para a tela da conta
      try {
        setIsLoading(true)
        const response = await api.get('/conta')

        // Usuário possui conta, redirecionar para home
        if (response.status === 200) {
          navigate('/')
        }
      } catch (error) {
        // Usuário não possui conta, pegar os dados dos planos
        try {
          const { data } = await api.get('/planos')
          setPlans(data)
          setIsLoading(false)
        } catch (error) {
          alert('Ocorreu um erro ao carregar os planos')
          console.log(error)
          logout()
        }
      }
    }
    retrievePlansData()
  }, [logout, navigate])

  async function handleSubmitPlan(e) {
    e.preventDefault()

    try {
      await api.post('/conta', {
        nomePlano: selectedPlan,
      })
      navigate('/')
    } catch (error) {
      alert('Ocorreu um erro, por favor tente novamente')
      console.log(error)
    }
  }

  return isLoading ? (
    <Loading />
  ) : (
    <main style={{ flex: 1 }}>
      <form onSubmit={handleSubmitPlan}>
        <div className={' container mt-5'}>
          <div className="row justify-content-center">
            <div className="col-lg-3 col-lg-9 col-12">
              <div>
                <div>
                  <h2>Escolha seu Plano</h2>
                  <div>
                    <div>
                      <div>
                        <p>
                          Acúmulo de pontos.<br></br> Ausência de taxas de
                          manutenção e anuidade do cartão.
                        </p>
                      </div>
                    </div>
                    <div className={'card-group'}>
                      <div className={'card bg-transparent border-white'}>
                        <div className="card-body text-white">
                          <h4 className="card-title">
                            {' '}
                            <strong>Plano {plans[0].idPlano}</strong>
                          </h4>
                          <p className="card-text ">
                            Cashback exclusivo de{' '}
                            <b>{plans[0].porcentagemCashback}%</b> para produtos
                            de beleza.
                          </p>
                          <p>
                            Com desconto nas parcerias:
                            <p>
                              <b>{plans[0].parcerias}</b>
                            </p>
                          </p>
                        </div>
                        <div className="card-footer"></div>
                      </div>
                      <div className="card bg-transparent border-white">
                        <div className="card-body text-white ">
                          <h4 className="card-title">
                            {' '}
                            <strong>Plano {plans[1].idPlano}</strong>
                          </h4>
                          <p className="card-text">
                            Cashback exclusivo de{' '}
                            <b>{plans[1].porcentagemCashback}%</b> para produtos
                            de tech.
                          </p>
                          <p>
                            Com desconto nas parcerias:
                            <p>
                              <b>{plans[1].parcerias}</b>
                            </p>
                          </p>
                        </div>
                        <div className="card-footer"></div>
                      </div>
                      <div className="card bg-transparent border-white">
                        <div className="card-body text-white">
                          <h4 className="card-title">
                            {' '}
                            <strong>Plano {plans[2].idPlano}</strong>
                          </h4>
                          <p className="card-text">
                            Cashback exclusivo de{' '}
                            <b>{plans[2].porcentagemCashback}%</b> para produtos
                            de esporte e saúde.
                          </p>
                          <p>
                            Com desconto nas parcerias:
                            <p>
                              <b>{plans[2].parcerias}</b>
                            </p>
                          </p>
                        </div>
                        <div className="card-footer"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <p></p>{' '}
                </div>
                <div className="row justify-content-center">
                  <div className="col-lg-9">
                    <div className="row justify-content-center">
                      <select
                        name="nomePlano"
                        value={selectedPlan}
                        onChange={(e) => setSelectedPlan(e.target.value)}
                      >
                        {plans.map((plan) => (
                          <option value={plan.idPlano} key={plan.idPlano}>
                            {plan.idPlano}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="row justify-content-center">
                      <Button titulo="Confirmar plano" type="submit" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </main>
  )
}
