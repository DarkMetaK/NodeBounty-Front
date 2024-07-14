import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import dayjs from 'dayjs'

import graphImage from '@assets/grafo.png'

import { api } from '@lib/api'
import { useToast } from '@hooks/useToast'
import { AppError } from '@utils/AppError'

import { Input } from '@components/Input'
import { Button } from '@components/Button'
import styles from './styles.module.css'

const signUpSchema = z
  .object({
    nome: z
      .string({ required_error: 'Esse campo é obrigatório' })
      .refine((name) => name.trim().length, {
        message: 'Digite um nome válido.',
      }),
    cpf: z
      .string({ required_error: 'Esse campo é obrigatório' })
      .refine((cpf) => cpf.trim().replace(/_/gi, '').length === 14, {
        message: 'Digite um CPF válido',
      }),
    rg: z
      .string({ required_error: 'Esse campo é obrigatório' })
      .refine((rg) => rg.trim().replace(/_/gi, '').length === 12, {
        message: 'Digite um RG válido',
      }),
    dataNascimento: z.string({ required_error: 'Esse campo é obrigatório' }),
    telefone: z
      .string({ required_error: 'Esse campo é obrigatório' })
      .refine((telefone) => telefone.trim().replace(/_/gi, '').length === 17, {
        message: 'Digite um telefone válido',
      }),
    email: z
      .string({ required_error: 'Esse campo é obrigatório' })
      .email('E-mail inválido'),
    cep: z
      .string({ required_error: 'Esse campo é obrigatório' })
      .refine((cep) => cep.trim().replace(/_/gi, '').length === 9, {
        message: 'Digite um CEP válido',
      }),
    endereco: z.string({ required_error: 'Esse campo é obrigatório' }),
    numero: z.string({ required_error: 'Esse campo é obrigatório' }),
    senha: z
      .string({ required_error: 'Esse campo é obrigatório' })
      .min(8, 'A senha deve conter no mínimo 8 caracteres'),
    confirmarSenha: z.string({ required_error: 'Esse campo é obrigatório' }),
  })
  .refine((schema) => schema.senha === schema.confirmarSenha, {
    message: 'As senhas não coincidem',
    path: ['confirmarSenha'],
  })
  .refine(
    (schema) =>
      dayjs(schema.dataNascimento).isBefore(dayjs().subtract(18, 'years')),
    {
      message: 'O usuário deve ser maior de 18 anos para criar uma conta',
      path: ['dataNascimento'],
    },
  )
  .refine(
    ({ cpf }) => {
      cpf = cpf.replace(/[^\d]+/g, '')
      if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false

      const cpfDigits = cpf.split('').map((el) => +el)
      const rest = (count) => {
        return (
          ((cpfDigits
            .slice(0, count - 12)
            .reduce((soma, el, index) => soma + el * (count - index), 0) *
            10) %
            11) %
          10
        )
      }

      return rest(10) === cpfDigits[9] && rest(11) === cpfDigits[10]
    },
    {
      message: 'Digite um CPF válido',
      path: ['cpf'],
    },
  )

export function SignUp() {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setFocus,
  } = useForm({
    resolver: zodResolver(signUpSchema),
  })

  const navigate = useNavigate()
  const { showToast, ToastComponents } = useToast()

  useEffect(() => {
    const firstError = Object.keys(errors).reduce((acc, field) => {
      return errors[acc] ? acc : field
    }, null)

    if (firstError) {
      setFocus(firstError)
    }
  }, [errors, setFocus])

  async function handleRegisterUser(data) {
    try {
      await api.post('/clientes', { ...data })
      navigate('/login')
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Erro no servidor.'
      const description = isAppError
        ? 'Certifique-se que o e-mail, cpf e rg fornecidos são únicos.'
        : 'Tente novamente mais tarde.'

      showToast(title, description, true)
    }
  }

  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.information}>
          <h1>
            Preencha todos os campos para pedir sua conta e cartão de crédito
          </h1>

          <div>
            <img src={graphImage} alt="" />
          </div>
        </div>

        <form
          className={styles.form}
          onSubmit={handleSubmit(handleRegisterUser)}
        >
          <fieldset>
            <legend>Dados Pessoais</legend>

            <Controller
              name="nome"
              render={({ field }) => (
                <Input
                  label="Nome Completo"
                  type="text"
                  {...field}
                  errors={errors.nome?.message}
                />
              )}
              control={control}
            />

            <Controller
              name="cpf"
              render={({ field }) => (
                <Input
                  label="CPF"
                  type="text"
                  placeholder="123.456.789-10"
                  mask="999.999.999-99"
                  {...field}
                  errors={errors.cpf?.message}
                />
              )}
              control={control}
            />

            <Controller
              name="rg"
              render={({ field }) => (
                <Input
                  label="RG"
                  type="text"
                  placeholder="12.345.678-9"
                  mask="99.999.999-*"
                  {...field}
                  errors={errors.rg?.message}
                />
              )}
              control={control}
            />

            <Controller
              name="dataNascimento"
              render={({ field }) => (
                <Input
                  label="Data de Nascimento"
                  type="date"
                  {...field}
                  errors={errors.dataNascimento?.message}
                />
              )}
              control={control}
            />

            <Controller
              name="telefone"
              render={({ field }) => (
                <Input
                  label="Telefone"
                  type="text"
                  placeholder="+55 11 99999-9999"
                  mask="+5\5 99 99999-9999"
                  {...field}
                  errors={errors.telefone?.message}
                />
              )}
              control={control}
            />
            <Controller
              name="email"
              render={({ field }) => (
                <Input
                  label="E-mail"
                  type="email"
                  {...field}
                  errors={errors.email?.message}
                />
              )}
              control={control}
            />
          </fieldset>

          <fieldset>
            <legend>Endereço</legend>

            <Controller
              name="cep"
              render={({ field }) => (
                <Input
                  label="CEP"
                  type="text"
                  placeholder="01234-567"
                  mask="99999-999"
                  {...field}
                  errors={errors.cep?.message}
                />
              )}
              control={control}
            />
            <Controller
              name="endereco"
              render={({ field }) => (
                <Input
                  label="Endereço"
                  type="text"
                  {...field}
                  errors={errors.endereco?.message}
                />
              )}
              control={control}
            />
            <Controller
              name="numero"
              render={({ field }) => (
                <Input
                  label="Numero"
                  type="text"
                  {...field}
                  errors={errors.numero?.message}
                />
              )}
              control={control}
            />
          </fieldset>

          <fieldset>
            <legend>Conta</legend>

            <Controller
              name="senha"
              render={({ field }) => (
                <Input
                  label="Senha"
                  type="password"
                  {...field}
                  errors={errors.senha?.message}
                />
              )}
              control={control}
            />
            <Controller
              name="confirmarSenha"
              render={({ field }) => (
                <Input
                  label="Confirmar Senha"
                  type="password"
                  {...field}
                  errors={errors.confirmarSenha?.message}
                />
              )}
              control={control}
            />
          </fieldset>

          <Button title="Criar Conta" type="submit" disabled={isSubmitting} />
        </form>
      </div>

      {ToastComponents}
    </main>
  )
}
