import { useState, useContext, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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

export function PrivateHome() {
  const [dadosConta, setDadosConta] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const { showToast, ToastComponents } = useToast()
  const { logout } = useContext(authContext)
  const navigate = useNavigate()

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
      setDadosConta(data)
      setValue('nome', data.cliente.nome)
      setValue('endereco', data.cliente.endereco)
      setValue('cep', data.cliente.cep)
      setValue('numero', String(data.cliente.numero))
      setValue('telefone', data.cliente.telefone)
      setIsLoading(false)
    } catch (error) {
      const isAppError = error instanceof AppError
      // Verificando se o erro ocorreu pois o usuário não possui conta
      // Por não ter escolhido ainda na tela de planos.
      if (
        isAppError &&
        error.message ===
          'Cliente não possui nenhuma conta associada no sistema'
      ) {
        navigate('/planos')
      } else {
        alert('Um erro ocorreu')
        console.log(error)
      }
    }
  }, [navigate, setValue])

  // Chamando função para carregar os dados quando a página abrir
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


 async function handleResgatar() {
      try {
        await api.post('/transacoes/resgatar')
        loadAccountData()
      } catch (error) {
        const isAppError = error instanceof AppError
        const title = isAppError ? error.message : 'Erro no servidor.'
        const description = isAppError
          ? 'Verifique os dados e tente novamente.'
          : 'Tente novamente mais tarde.'

        showToast(title, description, true)
      }
  }


  
  return isLoading ? (
    <Loading />
  ) : (
    <div style={{ flex: 1 }}>
      <main className={styles.containerHome}>
        <div className={styles.userInfo}>
          <div>
            <p>
              Plano: <strong>{dadosConta.plano.idPlano}</strong>
            </p>
            <p>Conta: {dadosConta.numeroConta}</p>
          </div>
          <h1>Bem vindo, {dadosConta.cliente.nome}</h1>
        </div>
        <div className={styles.balance}>
          <strong>
            Saldo:{' '}
            {dadosConta.saldoConta.toLocaleString('default', {
              style: 'currency',
              currency: 'BRL',
            })}
          </strong><br />
          <strong>
            Valor Cashback disponível:{' '}
            {dadosConta.cashbackConta.toLocaleString('default', {
              style: 'currency',
              currency: 'BRL',
            })}
          </strong>
          <Button titulo="Resgatar cashback" onClick={handleResgatar} />
          
        </div>
      </main>

      <section className={styles.containerUpdate}>
        <h2>Meus dados:</h2>
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

      {ToastComponents}
    </div>
  )
}
