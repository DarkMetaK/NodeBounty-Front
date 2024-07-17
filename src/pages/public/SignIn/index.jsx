import { useContext, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query'

import signInImage from '@assets/signInImage.png'

import { signIn } from '@api/sign-in'
import { authContext } from '@contexts/AuthContext'
import { useToast } from '@hooks/useToast'
import { AppError } from '@utils/AppError'

import { Input } from '@components/Input'
import { Button } from '@components/Button'
import styles from './styles.module.css'

const signInSchema = z.object({
  email: z
    .string({ required_error: 'Esse campo é obrigatório' })
    .email('E-mail inválido'),
  senha: z.string({ required_error: 'Esse campo é obrigatório' }),
})

export function SignIn() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setFocus,
  } = useForm({
    resolver: zodResolver(signInSchema),
  })

  const { saveToken } = useContext(authContext)
  const { showToast, ToastComponents } = useToast()
  const navigate = useNavigate()

  useEffect(() => {
    const firstError = Object.keys(errors).reduce((acc, field) => {
      return errors[acc] ? acc : field
    }, null)

    if (firstError) {
      setFocus(firstError)
    }
  }, [errors, setFocus])

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      saveToken(data.token)
      navigate('/planos')
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

  async function handleSignIn(data) {
    await mutateAsync({
      email: data.email,
      senha: data.senha,
    })
  }

  return (
    <main className={styles.container}>
      <div>
        <img src={signInImage} alt="" />
      </div>

      <div className={styles.form}>
        <h1>Acesse sua conta</h1>
        <form onSubmit={handleSubmit(handleSignIn)}>
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

          <Button title="Entrar" type="submit" size="lg" disabled={isLoading} />
        </form>

        <Link to="/cadastro">Ainda não sou cliente</Link>

        {ToastComponents}
      </div>
    </main>
  )
}
