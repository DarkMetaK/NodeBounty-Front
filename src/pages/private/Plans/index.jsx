import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import healthCardImage from '@assets/healthCard.png'
import beautyCardImage from '@assets/beautyCard.png'
import techCardImage from '@assets/techCard.png'

import { api } from '@lib/api'
import { AppError } from '@utils/AppError'
import { authContext } from '@contexts/AuthContext.jsx'

import { Loading } from '@components/Loading'
import { Button } from '@components/Button'
import styles from './styles.module.css'

const planCustomStyles = {
  Beauty: [
    '#6F48C9',
    beautyCardImage,
    'produtos de beleza e cuidados pessoais',
  ],
  Tech: ['#1A3296', techCardImage, 'produtos relacionados a tecnologia'],
  Health: [
    '#19972D',
    healthCardImage,
    'produtos relacionados a saúde e bem estar',
  ],
}

export function Plans() {
  const [plans, setPlans] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedPlan, setSelectedPlan] = useState('Beauty')

  const navigate = useNavigate()
  const { logout } = useContext(authContext)

  useEffect(() => {
    async function retrievePlansData() {
      try {
        setIsLoading(true)
        const response = await api.get('/conta')

        if (response.status === 200) {
          navigate('/')
        }
      } catch (error) {
        console.log(error)
        try {
          const { data } = await api.get('/planos')
          setPlans(data)
          setIsLoading(false)
        } catch (error) {
          alert('Falha ao tentar carregar os planos')
          console.log(error)
          logout()
        }
      }
    }
    retrievePlansData()
  }, [logout, navigate])

  async function handleSubmitPlan() {
    try {
      await api.post('/conta', {
        nomePlano: selectedPlan,
      })
      navigate('/')
    } catch (error) {
      alert('Ocorreu um erro ao escolher o plano.')
      console.log(error)
    }
  }

  if (isLoading) {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Loading />
      </div>
    )
  }

  return (
    <main className={styles.container}>
      <div className={styles.intro}>
        <h1>Escolha um dos planos</h1>
        <p>
          No Node Bounty temos diferentes opções de planos, para diferentes
          objetivos. Não se preocupe, é possível mudar sua escolha depois!
        </p>
      </div>

      <div className={styles.content}>
        <header className={styles.options}>
          {plans.map((item) => (
            <button
              key={item.idPlano}
              onClick={() => {
                setSelectedPlan(item.idPlano)
              }}
              style={
                selectedPlan === item.idPlano
                  ? {
                      background: planCustomStyles[item.idPlano][0],
                    }
                  : null
              }
            >
              {item.idPlano}
            </button>
          ))}
        </header>

        <article>
          <div className={styles.description}>
            <ul>
              <li>
                <span
                  style={{
                    background: planCustomStyles[selectedPlan][0],
                  }}
                />
                Ausência de anuidade
              </li>
              <li>
                <span
                  style={{
                    background: planCustomStyles[selectedPlan][0],
                  }}
                />
                Cashback exclusivo de 5% em {planCustomStyles[selectedPlan][2]}
              </li>
              <li>
                <span
                  style={{
                    background: planCustomStyles[selectedPlan][0],
                  }}
                />
                Descontos nas lojas parceiras:{' '}
                {plans.find((item) => item.idPlano === selectedPlan).parcerias}
              </li>
            </ul>

            <Button
              title="Escolher plano"
              size="lg"
              onClick={handleSubmitPlan}
              disabled={isLoading}
            />
          </div>

          <div className={styles.image}>
            <img src={planCustomStyles[selectedPlan][1]} alt="" />
          </div>
        </article>
      </div>
    </main>
  )
}
