import { useState } from 'react'

import styles from './styles.module.css'
import { TransactionForm } from '@components/TransactionForm'
import { StatementList } from '@components/StatementList'

const operations = ['withdraw', 'deposit', 'transfer', 'statement']
const title = {
  withdraw: 'Sacar',
  deposit: 'Depositar',
  transfer: 'Transferir',
  statement: 'Extrato',
}

export function Transactions() {
  const [selectedOperation, setSelectedOperation] = useState('withdraw')

  return (
    <div style={{ flex: 1 }} className={styles.container}>
      <header className={styles.options}>
        {operations.map((item) => (
          <button
            key={item}
            onClick={() => setSelectedOperation(item)}
            style={
              selectedOperation === item
                ? {
                    background: '#19972D',
                  }
                : null
            }
          >
            {title[item]}
          </button>
        ))}
      </header>

      <main>
        {selectedOperation !== 'statement' ? (
          <TransactionForm operation={selectedOperation} />
        ) : (
          <StatementList />
        )}
      </main>
    </div>
  )
}
