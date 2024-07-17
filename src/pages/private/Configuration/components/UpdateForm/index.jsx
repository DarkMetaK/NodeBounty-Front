import { useContext } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import { getUserAccount } from '@api/get-user-account'
import { updateAccount } from '@api/update-account'
import { deleteAccount } from '@api/delete-account'
import { useToast } from '@hooks/useToast'
import { AppError } from '@utils/AppError'
import { authContext } from '@contexts/AuthContext.jsx'

import { Loading } from '@components/Loading'
import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { ConfirmDialog } from '@components/ConfirmDialog'
import styles from './styles.module.css'

const updateFormSchema = z.object({
  nome: z
    .string()
    .refine((name) => name.trim().length, {
      message: 'Digite um nome válido.',
    })
    .optional(),
  endereco: z.string(),
  cep: z
    .string()
    .refine((cep) => cep.trim().replace(/_/gi, '').length === 9, {
      message: 'Digite um CEP válido',
    })
    .optional(),
  numero: z.string(),
  telefone: z
    .string()
    .refine((telefone) => telefone.trim().replace(/_/gi, '').length === 17, {
      message: 'Digite um telefone válido',
    })
    .optional(),
  senha: z
    .string()
    .min(8, 'A senha deve conter no mínimo 8 caracteres')
    .optional(),
})

export function UpdateForm() {
  const { showToast, ToastComponents } = useToast()
  const queryClient = useQueryClient()

  const { logout } = useContext(authContext)
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(updateFormSchema),
  })

  const { isLoading: isLoadingProfileData } = useQuery({
    queryKey: ['account'],
    queryFn: getUserAccount,
    onSuccess: (data) => {
      setValue('nome', data.cliente.nome)
      setValue('endereco', data.cliente.endereco)
      setValue('cep', data.cliente.cep)
      setValue('numero', String(data.cliente.numero))
      setValue('telefone', data.cliente.telefone)
    },
    onError: (error) => {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Erro no servidor.'
      const description = 'Falha ao carregar os dados da conta.'
      showToast(title, description, true)

      console.log(error)
    },
  })

  const { mutateAsync: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateAccount,
    onSuccess: () => {
      queryClient.invalidateQueries('account')
      queryClient.invalidateQueries('account-card')

      const title = 'Dados atualizados'
      const description = 'Suas informações foram atualizadas com sucesso!'

      showToast(title, description)
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

  const { mutateAsync: deleteUser, isLoading: isDeleting } = useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      logout()
    },
    onError: (error) => {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Erro no servidor.'
      const description = isAppError
        ? 'Verifique os dados e tente novamente.'
        : 'Tente novamente mais tarde.'

      showToast(title, description, true)
      console.log(error)
    },
  })

  async function handleUpdateUser(data) {
    await updateUser(data)
  }

  if (isLoadingProfileData) {
    return <Loading />
  }

  return (
    <section>
      <form className={styles.form} onSubmit={handleSubmit(handleUpdateUser)}>
        <div>
          <Controller
            name="nome"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Nome Completo"
                type="text"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                errors={errors.nome?.message}
              />
            )}
            control={control}
          />
          <Controller
            name="cep"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="CEP"
                type="text"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                errors={errors.cep?.message}
                placeholder="01234-567"
                mask="99999-999"
              />
            )}
            control={control}
          />
          <Controller
            name="endereco"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Endereço"
                type="text"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                errors={errors.endereco?.message}
              />
            )}
            control={control}
          />
          <Controller
            name="numero"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Numero"
                type="text"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                errors={errors.numero?.message}
              />
            )}
            control={control}
          />
        </div>
        <div>
          <Controller
            name="telefone"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Telefone"
                type="text"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                errors={errors.telefone?.message}
                placeholder="+55 11 99999-9999"
                mask="+5\5 99 99999-9999"
              />
            )}
            control={control}
          />
          <Controller
            name="senha"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Senha"
                type="password"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                errors={errors.senha?.message}
              />
            )}
            control={control}
          />
          <Button
            title="Alterar Dados"
            type="submit"
            style={{
              maxWidth: '20rem',
              alignSelf: 'center',
              width: '100%',
            }}
            disabled={isUpdating || isDeleting}
          />
        </div>
      </form>

      <ConfirmDialog
        trigger={
          <Button
            title="Deletar Conta"
            type="submit"
            style={{
              maxWidth: '20rem',
              margin: '1.25rem auto',
              alignSelf: 'center',
              width: '100%',
            }}
            disabled={isDeleting}
            variant="secondary"
          />
        }
        title="Deseja continuar?"
        description="Essa ação é irreversível, uma vez deletada, não será possível recuperar suas informações."
        onConfirm={deleteUser}
        isLoading={isDeleting}
      />

      {ToastComponents}
    </section>
  )
}
