import { useState } from 'react'
import { useQuery } from 'react-query'
import { Eye, EyeSlash } from 'phosphor-react'
import dayjs from 'dayjs'

import logoCard from '@assets/logo-card.svg'
import cardChip from '@assets/cardChip.png'

import { getUserAccount } from '@api/get-user-account'

import styles from './styles.module.css'
import { Loading } from '../Loading'

export function CreditCard({ number, expiresDate, cvc }) {
  const [numberIsHidden, setNumberIsHidden] = useState(true)

  const { data, isLoading } = useQuery({
    queryKey: ['account-card'],
    queryFn: getUserAccount,
    staleTime: Infinity,
  })

  function formattedName() {
    if (data) {
      const nameArr = data.cliente.nome.split(' ')
      const name = nameArr[0][0] + '. ' + nameArr[1]
      return name
    }
  }

  const formattedNumber = (number) => {
    if (numberIsHidden) {
      return '•••• •••• •••• ' + number.substr(12, 4)
    } else {
      return number.replace(/(\d{4})/g, '$1 ')
    }
  }

  const formattedCvc = (cvc) => {
    if (numberIsHidden) {
      return '•••'
    } else {
      return cvc
    }
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className={`${styles.container} ${styles[data.plano.idPlano]}`}>
      <div className={styles.logo}>
        <img src={logoCard} alt="" />
      </div>

      <div className={styles.chip}>
        <img src={cardChip} alt="" />
      </div>

      <div className={styles.content}>
        <p>{formattedName()}</p>

        <div className={styles.number}>
          <p>{formattedNumber(number)}</p>
          <button onClick={() => setNumberIsHidden(!numberIsHidden)}>
            {numberIsHidden ? (
              <Eye size={24} color="#FFF" weight="bold" />
            ) : (
              <EyeSlash size={24} color="#FFF" weight="bold" />
            )}
          </button>
        </div>

        <div className={styles.security}>
          <time dateTime={expiresDate} title={expiresDate}>
            {dayjs(expiresDate).format('YY/MM')}
          </time>
          <p>{formattedCvc(cvc)}</p>
        </div>
      </div>
    </div>
  )
}
