import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import dayjs from 'dayjs'

import { Input } from '@components/Input'
import { Button } from '@components/Button'
import styles from './styles.module.css'

const schema = z.object({
    nome: z
        .string({ required_error: 'Esse campo é obrigatório' })
        .refine((name) => name.trim().length, {
            message: 'Digite um nome válido.',
        }),
    dataNascimento: z.string({ required_error: 'Esse campo é obrigatório' }),
    rg: z
        .string({ required_error: 'Esse campo é obrigatório' })
        .refine((rg) => rg.trim().replace(/_/gi, '').length === 12, {
            message: 'Digite um RG válido'
        }),
    cpf: z
        .string({ required_error: 'Esse campo é obrigatório' })
        .refine((cpf) => cpf.trim().replace(/_/gi, '').length === 14, {
            message: 'Digite um CPF válido'
        }),
    cep: z
        .string({ required_error: 'Esse campo é obrigatório' })
        .refine((cep) => cep.trim().replace(/_/gi, '').length === 9, {
            message: 'Digite um CEP válido'
        }),
    endereco: z.string({ required_error: 'Esse campo é obrigatório' }),
    telefone: z
        .string({ required_error: 'Esse campo é obrigatório' })
        .refine((telefone) => telefone.trim().replace(/_/gi, '').length === 17, {
            message: 'Digite um telefone válido'
        }),
    email: z
        .string({ required_error: 'Esse campo é obrigatório' })
        .email('E-mail inválido'),
    senha: z
        .string({ required_error: 'Esse campo é obrigatório' })
        .min(8, 'A senha deve conter no mínimo 8 caracteres'),
    confirmarSenha: z.string({ required_error: 'Esse campo é obrigatório' }),
})
.refine((schema) => schema.senha === schema.confirmarSenha, {
    message: 'As senhas não coincidem',
    path: ['confirmarSenha'],
})
.refine((schema) => dayjs(schema.dataNascimento).isBefore(new Date(), 'date'), {
    message: 'A data de nascimento não pode ser superior ou igual a data atual',
    path: ['dataNascimento']
})

export function Cadastro() {
    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
      } = useForm({
        resolver: zodResolver(schema),
      })

    function cadastrarUsuario(data) {
        console.log(data)
    }

    return (
        <main className={styles.container}>
            <h1>Abrir conta</h1>
            <form className={styles.form} onSubmit={handleSubmit(cadastrarUsuario)}>
                <div>
                    <Controller
                        name="nome"
                        render={({field: { onChange, onBlur, value }}) => (
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
                        name="dataNascimento"
                        render={({field: { onChange, onBlur, value }}) => (
                            <Input
                                label="Data de Nascimento"
                                type="date"
                                onChange={onChange}
                                onBlur={onBlur}
                                value={value}
                                errors={errors.dataNascimento?.message}
                            />
                        )}
                        control={control}
                    />
                    <Controller
                        name="rg"
                        render={({field: { onChange, onBlur, value }}) => (
                            <Input
                                label="RG"
                                type="text"
                                onChange={onChange}
                                onBlur={onBlur}
                                value={value}
                                errors={errors.rg?.message}
                                placeholder="12.345.678-9"
                                mask="99.999.999-*"
                            />
                        )}
                        control={control}
                    />
                    <Controller
                        name="cpf"
                        render={({field: { onChange, onBlur, value }}) => (
                            <Input
                                label="CPF"
                                type="text"
                                onChange={onChange}
                                onBlur={onBlur}
                                value={value}
                                errors={errors.cpf?.message}
                                placeholder="123.456.789-10"
                                mask="999.999.999-99"
                            />
                        )}
                        control={control}
                    />
                    <Controller
                        name="cep"
                        render={({field: { onChange, onBlur, value }}) => (
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
                        render={({field: { onChange, onBlur, value }}) => (
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
                </div>
                <div>
                    <Controller
                        name="telefone"
                        render={({field: { onChange, onBlur, value }}) => (
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
                        name="email"
                        render={({field: { onChange, onBlur, value }}) => (
                            <Input
                                label="E-mail"
                                type="email"
                                onChange={onChange}
                                onBlur={onBlur}
                                value={value}
                                errors={errors.email?.message}
                            />
                        )}
                        control={control}
                    />
                    <Controller
                        name="senha"
                        render={({field: { onChange, onBlur, value }}) => (
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
                    <Controller
                        name="confirmarSenha"
                        render={({field: { onChange, onBlur, value }}) => (
                            <Input
                                label="Confirmar Senha"
                                type="password"
                                onChange={onChange}
                                onBlur={onBlur}
                                value={value}
                                errors={errors.confirmarSenha?.message}
                            />
                        )}
                        control={control}
                    />
                    <Button
                        titulo="Concluir"
                        tipo="primario"
                        type="submit"
                        style={{maxWidth: '20rem', alignSelf: 'center', width: '100%'}}
                        disabled={isSubmitting}
                    />
                </div>
            </form>
        </main>
    )
}