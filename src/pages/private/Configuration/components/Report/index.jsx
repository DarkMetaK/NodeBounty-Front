import { useEffect, useState } from 'react'
import { CaretUp, CaretDown } from 'phosphor-react'

import { api } from '@lib/api'

import { MonthlyHistogram } from '@components/MonthlyHistogram'
import { PieGraph } from '@components/PieGraph'
import { Loading } from '@components/Loading'
import { TransactionItem } from '@components/TransactionItem'
import styles from './styles.module.css'

export function Report() {
  const [dadosTransacao, setDadosTransacao] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [showCharts, setShowCharts] = useState(true)
  const [showHistory, setShowHistory] = useState(true)

  useEffect(() => {
    async function buscarDadosTransacao() {
      try {
        setIsLoading(true)
        const { data } = await api.get('/transacoes')
        setDadosTransacao(data)
        setIsLoading(false)
      } catch (error) {
        alert('Um erro ocorreu')
        console.log(error)
      }
    }
    buscarDadosTransacao()
  }, [])

  const transacoesEntrada = dadosTransacao
    .filter((transacao) => transacao.role === 'entrada')
    .map((item) => {
      return {
        date: new Date(item.transacao.dataTransacao)
          .toISOString()
          .split('T')[0],
        value: item.transacao.valorTransacao,
      }
    })

  const entradasTotal = transacoesEntrada.reduce(
    (acc, item) => ({ ...acc, y: (acc.y += item.value) }),
    {
      x: 'Entradas',
      y: 0,
    },
  )

  const transacoesSaida = dadosTransacao
    .filter((transacao) => transacao.role === 'saida')
    .map((item) => {
      return {
        date: new Date(item.transacao.dataTransacao)
          .toISOString()
          .split('T')[0],
        value: item.transacao.valorTransacao,
      }
    })

  const saidasTotal = transacoesSaida.reduce(
    (acc, item) => ({ ...acc, y: (acc.y += item.value) }),
    {
      x: 'Saídas',
      y: 0,
    },
  )

  function formatarValor(number) {
    return number.toLocaleString('default', {
      style: 'currency',
      currency: 'BRL',
    })
  }

  return isLoading ? (
    <Loading />
  ) : (
    <section>
      <div className={styles.graficos}>
        <button onClick={() => setShowCharts(!showCharts)}>
          Gráficos {showCharts ? <CaretUp /> : <CaretDown />}
        </button>
        {showCharts && (
          <>
            <div className={styles.graficoItem}>
              <strong>
                Entradas - Total: {formatarValor(entradasTotal.y)}
              </strong>
              <MonthlyHistogram data={transacoesEntrada} />
            </div>
            <div className={styles.graficoItem}>
              <strong>Saídas - Total: {formatarValor(saidasTotal.y)}</strong>
              <MonthlyHistogram data={transacoesSaida} color="red" />
            </div>
            <div className={styles.graficoItem}>
              <strong>Comparativo</strong>
              <PieGraph data={[entradasTotal, saidasTotal]} />
            </div>
          </>
        )}
      </div>

      {/* Listando as transações daqui pra baixo */}
      <div className={styles.history}>
        <button onClick={() => setShowHistory(!showHistory)}>
          Histórico {showHistory ? <CaretUp /> : <CaretDown />}
        </button>
        {showHistory &&
          dadosTransacao.map((item) => (
            <TransactionItem key={item.transacao.idTransacao} data={item} />
          ))}
      </div>
    </section>
  )
}
