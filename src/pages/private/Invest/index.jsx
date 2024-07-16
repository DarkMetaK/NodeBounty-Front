import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'

import { Input } from '@components/Input'
import { Button } from '@components/Button'
import styles from './styles.module.css'

const schema = z.object({
  initialInvestment: z.coerce
    .number()
    .min(1000, 'O investimento inicial mínimo deve ser de R$ 1000'),
  monthlyInvestment: z.coerce.number(),
  amountOfMonths: z.coerce
    .number()
    .min(3, 'O tempo mínimo de investimento é de 3 meses'),
})

export function Invest() {
  const [resultValue, setResultValue] = useState(14521.63)
  const [totalInvested, setTotalInvested] = useState(12200)

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      initialInvestment: 5000,
      monthlyInvestment: 300,
      amountOfMonths: 24,
    },
  })

  function handleEstimateInvestment(data) {
    const rentabilidadeMensal = 0.01 // Mensal de 1% ao mês
    let balance = data.initialInvestment
    let totalInvested = balance

    // Adicionando os investimentos mensais ao saldo
    for (let i = 0; i < data.amountOfMonths; i++) {
      balance += data.monthlyInvestment
      totalInvested += data.monthlyInvestment

      const rendimentoMensal = balance * rentabilidadeMensal
      balance += rendimentoMensal
    }
    setTotalInvested(totalInvested)
    setResultValue(balance)
  }

  function currencyStringConversor(number) {
    return number.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
  }

  return (
    <main className={styles.containerInvestment}>
      <h1>Simulador Investimentos</h1>

      <div className={styles.gridContainer}>
        <div>
          <form
            className={styles.form}
            onSubmit={handleSubmit(handleEstimateInvestment)}
          >
            <Controller
              name="initialInvestment"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Valor de investimento inicial"
                  type="number"
                  min={1000}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  errors={errors.initialInvestment?.message}
                />
              )}
              control={control}
            />
            <Controller
              name="monthlyInvestment"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Valor de investimento mensal"
                  type="number"
                  min={0}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  errors={errors.monthlyInvestment?.message}
                />
              )}
              control={control}
            />
            <Controller
              name="amountOfMonths"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Quanto meses pretende deixar o dinheiro investido?"
                  type="number"
                  min={3}
                  max={360}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  errors={errors.amountOfMonths?.message}
                />
              )}
              control={control}
            />
            <Button
              title="Calcular Investimento"
              type="submit"
              style={{
                maxWidth: '20rem',
                alignSelf: 'center',
                width: '100%',
              }}
              disabled={isSubmitting}
            />
          </form>
        </div>

        <div className={styles.investmentResult}>
          <div className={styles.investmentResultValues}>
            <span>Em {getValues('amountOfMonths')} meses você teria:</span>
            <strong>{currencyStringConversor(resultValue)}</strong>
          </div>
          <div className={styles.investmentInfo}>
            <p>Total investido: {currencyStringConversor(totalInvested)}</p>
            <p>
              No CDB seu dinheiro renderia:{' '}
              {currencyStringConversor(resultValue - totalInvested)}
            </p>
          </div>
          <div className={styles.profitabilityInfo}>
            <p>Valores utilizados no simulador de investimentos:</p>
            <p>- Data da última atualização: 08/11/2023</p>
            <p>- Porcentagem de rentabilidade mensal: 1% a.m.</p>
          </div>
        </div>
      </div>
    </main>
  )
}
