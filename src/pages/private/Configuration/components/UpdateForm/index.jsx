import { useState, useCallback, useEffect, useContext } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'

import { api } from '@lib/api'
import { useToast } from '@hooks/useToast'
import { AppError } from '@utils/AppError'
import { authContext } from '@contexts/AuthContext.jsx'

import { Loading } from '@components/Loading'
import { Input } from '@components/Input'
import { Button } from '@components/Button'
import styles from './styles.module.css'

const schema = z.object({
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
  const [isLoading, setIsLoading] = useState(true)
  const { showToast, ToastComponents } = useToast()

  const { logout } = useContext(authContext)

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
  })

  // Carregando dados da conta
  const loadAccountData = useCallback(async () => {
    try {
      setIsLoading(true)
      const { data } = await api.get('/conta')
      setValue('nome', data.cliente.nome)
      setValue('endereco', data.cliente.endereco)
      setValue('cep', data.cliente.cep)
      setValue('numero', String(data.cliente.numero))
      setValue('telefone', data.cliente.telefone)
      setIsLoading(false)
    } catch (error) {
      alert('Um erro ocorreu')
      console.log(error)
    }
  }, [setValue])

  useEffect(() => {
    loadAccountData()
  }, [loadAccountData])

  async function handleAtualizarUsuario(formData) {
    try {
      await api.put('/clientes', formData)
      loadAccountData() // Chamando a função para carregar os dados novamente
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Erro no servidor.'
      const description = isAppError
        ? 'Verifique os dados e tente novamente.'
        : 'Tente novamente mais tarde.'

      showToast(title, description, true)
    }
  }

  async function handleDeletarConta() {
    const proceedWithDeleting = window.confirm(
      'Você deseja realmente apagar a conta?',
    )

    if (proceedWithDeleting) {
      try {
        await api.delete('/clientes')
        logout()
      } catch (error) {
        const isAppError = error instanceof AppError
        const title = isAppError ? error.message : 'Erro no servidor.'
        const description = isAppError
          ? 'Verifique os dados e tente novamente.'
          : 'Tente novamente mais tarde.'

        showToast(title, description, true)
      }
    }
  }

  return isLoading ? (
    <Loading />
  ) : (
    <section>
      <form
        className={styles.form}
        onSubmit={handleSubmit(handleAtualizarUsuario)}
      >
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
            titulo="Alterar Dados"
            tipo="primario"
            type="submit"
            style={{
              maxWidth: '20rem',
              alignSelf: 'center',
              width: '100%',
            }}
            disabled={isSubmitting}
          />
        </div>
        {ToastComponents}
      </form>
      <Button
        titulo="Deletar Conta"
        tipo="primario"
        type="submit"
        style={{
          maxWidth: '20rem',
          margin: '1.25rem auto 0 auto',
          alignSelf: 'center',
          width: '100%',
        }}
        onClick={handleDeletarConta}
      />
    </section>
  )
}
