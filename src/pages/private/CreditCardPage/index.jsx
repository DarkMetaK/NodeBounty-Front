import { useMutation, useQuery, useQueryClient } from 'react-query'

import { getCreditCards } from '@api/get-credit-cards'
import { createCreditCard } from '@api/create-credit-card'
import { deleteCreditCard } from '@api/delete-credit-card'
import { useToast } from '@hooks/useToast'
import { AppError } from '@utils/AppError'

import styles from './styles.module.css'
import { Button } from '@components/Button'
import { CreditCard } from '@components/CreditCard'
import { ConfirmDialog } from '@components/ConfirmDialog'
import { Loading } from '@components/Loading'

export function CreditCardPage() {
  const { showToast, ToastComponents } = useToast()
  const queryClient = useQueryClient()

  const { data: cards, isLoading } = useQuery({
    queryKey: ['cards'],
    queryFn: getCreditCards,
    onError: (error) => {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Erro no servidor.'
      const description = 'Falha ao carregar os dados.'

      showToast(title, description, true)
      console.log(error)
    },
    staleTime: Infinity,
  })

  const { mutateAsync: handleCreateCard, isLoading: isSubmitting } =
    useMutation({
      mutationFn: createCreditCard,
      onSuccess: () => {
        queryClient.invalidateQueries('cards')

        const title = 'Sucesso'
        const description = 'Novo cartão de crédito gerado com sucesso.'
        showToast(title, description)
      },
      onError: (error) => {
        const isAppError = error instanceof AppError
        const title = isAppError ? error.message : 'Erro no servidor.'
        const description = isAppError
          ? 'Não foi possível prosseguir com a geração do cartão.'
          : 'Tente novamente mais tarde.'

        showToast(title, description, true)
        console.log(error)
      },
    })

  const { mutateAsync: handleDeleteCard, isLoading: isDeleting } = useMutation({
    mutationFn: deleteCreditCard,
    onSuccess: () => {
      queryClient.invalidateQueries('cards')

      const title = 'Sucesso'
      const description = 'O cartão foi deletado com sucesso.'
      showToast(title, description)
    },
    onError: (error) => {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Erro no servidor.'
      const description = isAppError
        ? 'Não foi possível prosseguir com a remoção do cartão.'
        : 'Tente novamente mais tarde.'

      showToast(title, description, true)
      console.log(error)
    },
  })

  if (isLoading) {
    return <Loading />
  }

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1>Seus cartões</h1>
        <Button
          title="Gerar Cartão"
          onClick={handleCreateCard}
          disabled={isSubmitting}
        />
      </header>

      <ul className={styles.list}>
        {cards.map((cartao) => (
          <li key={cartao.idCartao}>
            <CreditCard
              number={cartao.numeroCartao}
              expiresDate={cartao.validadeCartao}
              cvc={cartao.cvcCartao}
            />

            <ConfirmDialog
              trigger={
                <Button
                  title="Deletar"
                  variant="secondary"
                  disabled={isDeleting}
                />
              }
              title="Deseja continuar?"
              description="Essa ação é irreversível, uma vez deletado, não será mais possível utilizar este cartão."
              onConfirm={() => handleDeleteCard(cartao.idCartao)}
              isLoading={isDeleting}
            />
          </li>
        ))}
      </ul>

      {ToastComponents}
    </main>
  )
}
