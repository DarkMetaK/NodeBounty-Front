import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import { getUserAccount } from '@api/get-user-account'
import { redeemCashback } from '@api/redeem-cashback'
import { useToast } from '@hooks/useToast'
import { AppError } from '@utils/AppError'

import { Loading } from '@components/Loading'
import { Button } from '@components/Button'
import styles from './styles.module.css'

const partners = {
  Beauty: [
    {
      nome: 'MAC',
      conta: '97126063061062518244',
    },
    {
      nome: 'MakeB',
      conta: '12345678901234567890',
    },
    {
      nome: 'Vult',
      conta: '23456789012345678901',
    },
  ],
  Tech: [
    {
      nome: 'Kabum',
      conta: '34567890123456789012',
    },
    {
      nome: 'Pichau',
      conta: '45678901234567890123',
    },
    {
      nome: 'TeraByte Shop',
      conta: '56789012345678901234',
    },
  ],
  Health: [
    {
      nome: 'Growth',
      conta: '67890123456789012345',
    },
    {
      nome: 'OficialFarma',
      conta: '78901234567890123456',
    },
    {
      nome: 'Drogasil',
      conta: '89012345678901234567',
    },
  ],
}

const colors = {
  Beauty: '#6F48C9',
  Tech: '#536dd4',
  Health: '#19972D',
}

export function PrivateHome() {
  const { showToast, ToastComponents } = useToast()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data, isLoading: isLoadingProfileData } = useQuery({
    queryKey: ['account'],
    queryFn: getUserAccount,
    onError: (error) => {
      const isAppError = error instanceof AppError
      if (
        isAppError &&
        error.message ===
          'Cliente não possui nenhuma conta associada no sistema'
      ) {
        navigate('/planos')
      } else {
        alert('Um erro ocorreu')
        console.log(error)
      }
    },
    staleTime: 1000 * 60 * 1, // 1 minute
  })

  const { mutateAsync: handleRedeemCashback, isLoading: isSubmittingRedeem } =
    useMutation({
      mutationFn: redeemCashback,
      onSuccess: () => {
        queryClient.invalidateQueries('account')
      },
      onError: (error) => {
        const isAppError = error instanceof AppError
        const title = isAppError ? error.message : 'Erro no servidor.'
        const description = isAppError
          ? 'Verifique os dados e tente novamente.'
          : 'Tente novamente mais tarde.'

        showToast(title, description, true)
      },
    })

  return isLoadingProfileData ? (
    <Loading />
  ) : (
    <div style={{ flex: 1 }}>
      <main className={styles.containerHome}>
        <div className={styles.userInfo}>
          <div>
            <p>
              Plano:{' '}
              <strong style={{ color: colors[data.plano.idPlano] }}>
                {data.plano.idPlano}
              </strong>
            </p>
            <p>Conta: {data.numeroConta}</p>
          </div>
          <h1>Bem vindo, {data.cliente.nome}</h1>
        </div>

        <div className={styles.balance}>
          <strong>
            Saldo:{' '}
            {data.saldoConta.toLocaleString('default', {
              style: 'currency',
              currency: 'BRL',
            })}
          </strong>

          <p>
            Valor Cashback disponível:{' '}
            {data.cashbackConta.toLocaleString('default', {
              style: 'currency',
              currency: 'BRL',
            })}
          </p>

          <Button
            title="Resgatar cashback"
            onClick={handleRedeemCashback}
            disabled={isSubmittingRedeem}
          />
        </div>

        <section className={styles.partners}>
          <h2>Parceiros do seu plano:</h2>
          <p>
            Ganhe cashback de {data.plano.porcentagemCashback}% ao realizar
            compras em nossos parceiros
          </p>
          <ul className={styles.partnersList}>
            {partners[data.plano.idPlano].map((item) => (
              <li key={item.conta}>
                <strong>{item.nome}</strong>
                <span>Número conta: {item.conta}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>

      {ToastComponents}
    </div>
  )
}
