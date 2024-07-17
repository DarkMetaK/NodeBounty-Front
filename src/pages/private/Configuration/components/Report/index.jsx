import { useQuery } from 'react-query'

import { getTransactions } from '@api/get-transactions'

import { MonthlyHistogram } from '@components/MonthlyHistogram'
import { PieGraph } from '@components/PieGraph'
import { Loading } from '@components/Loading'
import styles from './styles.module.css'

export function Report() {
  const { data, isLoading } = useQuery({
    queryKey: ['transactions'],
    queryFn: getTransactions,
    onError: (error) => {
      alert('Um erro ocorreu')
      console.log(error)
    },
    initialData: [],
  })

  const incomeTransactions = data
    .filter((transaction) => transaction.role === 'entrada')
    .map((item) => {
      return {
        date: new Date(item.transacao.dataTransacao)
          .toISOString()
          .split('T')[0],
        value: item.transacao.valorTransacao,
      }
    })

  const incomeTotal = incomeTransactions.reduce(
    (acc, item) => ({ ...acc, y: (acc.y += item.value) }),
    {
      x: 'Entradas',
      y: 0,
    },
  )

  const outcomeTransactions = data
    .filter((transaction) => transaction.role === 'saida')
    .map((item) => {
      return {
        date: new Date(item.transacao.dataTransacao)
          .toISOString()
          .split('T')[0],
        value: item.transacao.valorTransacao,
      }
    })

  const outcomeTotal = outcomeTransactions.reduce(
    (acc, item) => ({ ...acc, y: (acc.y += item.value) }),
    {
      x: 'Saídas',
      y: 0,
    },
  )

  function formatNumberToCurrency(number) {
    return number.toLocaleString('default', {
      style: 'currency',
      currency: 'BRL',
    })
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <section>
      <div className={styles.graphs}>
        <div className={styles.graphItem}>
          <strong>
            Entradas - Total: {formatNumberToCurrency(incomeTotal.y)}
          </strong>
          <MonthlyHistogram data={incomeTransactions} />
        </div>

        <div className={styles.graphItem}>
          <strong>
            Saídas - Total: {formatNumberToCurrency(outcomeTotal.y)}
          </strong>
          <MonthlyHistogram data={outcomeTransactions} color="red" />
        </div>

        <div className={styles.graphItem}>
          <strong>Comparativo</strong>
          <PieGraph data={[incomeTotal, outcomeTotal]} />
        </div>
      </div>
    </section>
  )
}
