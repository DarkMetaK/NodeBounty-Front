import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import { getUserAccount } from '@api/get-user-account'
import { moneyWithdraw } from '@api/money-withdraw'
import { moneyDeposit } from '@api/money-deposit'
import { moneyTransfer } from '@api/money-transfer'
import { useToast } from '@hooks/useToast'
import { AppError } from '@utils/AppError'

import styles from './styles.module.css'
import { Loading } from '@components/Loading'
import { Input } from '@components/Input'
import { Button } from '@components/Button'

const transactionSchema = z
  .object({
    valor: z.coerce
      .number({ invalid_type_error: 'Insira um valor válido' })
      .min(0.01, 'O valor mínimo é de 1 centavo'),
    numeroConta: z
      .string()
      .refine(
        (value) => /^\d+$/.test(value),
        'Informe apenas números e sem espaços',
      )
      .refine(
        (value) => value.length === 20,
        'O número da conta precisa ter 20 dígitos',
      )
      .optional(),
    operation: z.string(),
  })
  .refine(
    ({ numeroConta, operation }) => operation === 'transfer' && numeroConta,
    {
      message: 'O número da conta é obrigatório para transferências',
      path: ['numeroConta'],
    },
  )

export function TransactionForm({ operation }) {
  const { showToast, ToastComponents } = useToast()
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    setFocus,
    clearErrors,
  } = useForm({
    resolver: zodResolver(transactionSchema),
    values: { operation },
  })

  useEffect(() => {
    clearErrors()
  }, [clearErrors, operation])

  const queryClient = useQueryClient()
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

  const { mutateAsync, isLoading: isSubmitting } = useMutation({
    mutationFn:
      operation === 'withdraw'
        ? moneyWithdraw
        : operation === 'deposit'
        ? moneyDeposit
        : moneyTransfer,
    onSuccess: () => {
      queryClient.invalidateQueries('account')

      showToast('Sucesso', 'Operação realizada com sucesso!')
    },
    onError: (error) => {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Erro no servidor.'
      const description = 'Falha ao realizar a operação.'
      showToast(title, description, true)

      console.error(error)
    },
  })

  async function handleOperation(data) {
    if (data.valor > profileData.saldoConta) {
      showToast(
        'Valor inválido',
        'O valor não pode ser maior que o saldo disponível',
        true,
      )

      setFocus('valor')
      return
    }

    await mutateAsync(data)
  }

  const handleInputChange = (event) => {
    const inputValue = event.target.value.replace(/\D/g, '')
    const numericValue = parseFloat(inputValue / 100).toFixed(2)

    event.target.value = numericValue
    setValue('valor', numericValue)
  }

  if (isLoadingProfileData) {
    return <Loading />
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.balance}>
          <strong>
            Saldo:{' '}
            {profileData.saldoConta.toLocaleString('default', {
              style: 'currency',
              currency: 'BRL',
            })}
          </strong>
        </div>

        <form onSubmit={handleSubmit(handleOperation)}>
          <Controller
            name="valor"
            render={({ field }) => (
              <Input
                label="Valor"
                {...field}
                onChange={(e) => {
                  handleInputChange(e)
                }}
                errors={errors.valor?.message}
              />
            )}
            control={control}
          />

          {operation === 'transfer' && (
            <Controller
              name="numeroConta"
              render={({ field }) => (
                <Input
                  label="Número da Conta"
                  type="number"
                  {...field}
                  errors={errors.numeroConta?.message}
                />
              )}
              control={control}
            />
          )}

          <Button
            title={
              operation === 'withdraw'
                ? 'Sacar'
                : operation === 'deposit'
                ? 'Depositar'
                : 'Transferir'
            }
            type="submit"
            size="lg"
            disabled={isSubmitting}
          />
        </form>
      </div>

      {ToastComponents}
    </>
  )
}
