import { useQuery } from 'react-query'

import { getTransactions } from '@api/get-transactions'
import { getUserAccount } from '@api/get-user-account'
import { useToast } from '@hooks/useToast'
import { AppError } from '@utils/AppError'

import styles from './styles.module.css'
import { Loading } from '@components/Loading'
import { StatementItem } from '@components/StatementItem'

export function StatementList() {
  const { showToast, ToastComponents } = useToast()

  const { data: transactions, isLoading: isLoadingTransactions } = useQuery({
    queryKey: ['transactions'],
    queryFn: getTransactions,
    onError: (error) => {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Erro no servidor.'
      const description = 'Falha ao carregar os dados das transações.'
      showToast(title, description, true)

      console.log(error)
    },
  })

  const { data: profileData, isLoading: isLoadingProfileData } = useQuery({
    queryKey: ['account'],
    queryFn: getUserAccount,
    onError: (error) => {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Erro no servidor.'
      const description = 'Falha ao carregar os dados da conta.'
      showToast(title, description, true)

      console.log(error)
    },
  })

  if (isLoadingTransactions || isLoadingProfileData) {
    return <Loading />
  }

  console.log(profileData)

  return (
    <>
      <div className={styles.container}>
        {transactions.length === 0 ? (
          <div className={styles.empty}>
            <p>Não há histórico de transações realizadas</p>
          </div>
        ) : (
          <ul>
            {transactions.map((item) => (
              <li key={item.id}>
                <StatementItem
                  key={item.transacao.idTransacao}
                  data={item}
                  owner={profileData.cliente.idCliente}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
      {ToastComponents}
    </>
  )
}
