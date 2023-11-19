import dayjs from 'dayjs'

import styles from './styles.module.css'

export function TransactionItem({ data }) {
  function formatarValor(number) {
    return number.toLocaleString('default', {
      style: 'currency',
      currency: 'BRL',
    })
  }

  return (
    <div className={styles.transacaoContainer}>
      <p>
        Tipo:{' '}
        {data.transacao.emissor === null
          ? 'Depósito'
          : data.transacao.receptor === null
          ? 'Saque'
          : 'Transferência'}
      </p>
      <p>Valor: {formatarValor(data.transacao.valorTransacao)}</p>
      <p>
        Data:{' '}
        {dayjs(data.transacao.dataTransacao).format('DD [de] MMMM [de] YYYY')}
      </p>
      {data.transacao.emissor && data.transacao.receptor && (
        <>
          <p>
            Transferência de: {data.transacao.emissor.cliente.nome} -{' '}
            {data.transacao.emissor.numeroConta}
          </p>
          <p>
            Para: {data.transacao.receptor.cliente.nome} -{' '}
            {data.transacao.receptor.numeroConta}
          </p>
        </>
      )}
    </div>
  )
}
