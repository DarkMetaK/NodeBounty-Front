import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery } from 'react-query'

import healthCardImage from '@assets/healthCard.png'
import beautyCardImage from '@assets/beautyCard.png'
import techCardImage from '@assets/techCard.png'

import { getAvailablePlans } from '@api/get-available-plans'
import { getUserAccount } from '@api/get-user-account'
import { registerSelectedPlan } from '@api/register-selected-plan'
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
  const [selectedPlan, setSelectedPlan] = useState('Beauty')
  const { logout } = useContext(authContext)
  const navigate = useNavigate()

  const userAccount = useQuery({
    queryKey: ['account'],
    queryFn: getUserAccount,
    onSuccess: () => {
      navigate('/')
    },
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  })

  const availablePlans = useQuery({
    queryKey: ['plans'],
    queryFn: getAvailablePlans,
    enabled: userAccount.isError,
    onError: (error) => {
      alert('Ocorreu um erro ao carregar os planos')
      console.log(error)
      logout()
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    staleTime: 1000 * 60 * 60 * 24, // 1 day
  })

  const { mutateAsync, isLoading: loadingPost } = useMutation({
    mutationFn: registerSelectedPlan,
    onSuccess: () => {
      navigate('/')
    },
    onError: (error) => {
      alert('Ocorreu um erro, por favor tente novamente')
      console.log(error)
    },
  })

  const isLoading = userAccount.isLoading || availablePlans.isLoading

  function handleSubmitPlan() {
    mutateAsync({ nomePlano: selectedPlan })
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
          {availablePlans.data.map((item) => (
            <button
              key={item.idPlano}
              onClick={() => setSelectedPlan(item.idPlano)}
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
                {
                  availablePlans.data.find(
                    (item) => item.idPlano === selectedPlan,
                  ).parcerias
                }
              </li>
            </ul>

            <Button
              title="Escolher plano"
              size="lg"
              onClick={handleSubmitPlan}
              disabled={loadingPost}
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
