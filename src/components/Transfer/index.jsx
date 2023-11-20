import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { useState, useContext, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@lib/api';
import { useToast } from '@hooks/useToast';
import { AppError } from '@utils/AppError';
import { Loading } from '@components/Loading'
const schema = z.object({
  valor: z.coerce.number().min(0.01, 'O valor mínimo para depósito é de 1 centavo'),
  numeroConta: z
    .string()
    .refine(value => /^\d+$/.test(value), 'Informe apenas números e sem espaços')
    .refine(value => value.length === 20, 'O número da conta precisa ter 20 dígitos'),
});


import styles from './styles.module.css';

export function Transfer() {
  const [dadosConta, setDadosConta] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const loadAccountData = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await api.get('/conta');
      setDadosConta(data);
      setIsLoading(false);
    } catch (error) {
      const isAppError = error instanceof AppError;
    }
  }, [navigate]);

  // Call the function to load data when the page opens
  useEffect(() => {
    loadAccountData();
  }, [loadAccountData]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { showToast, ToastComponents } = useToast();

  async function handleDepositar(data) {
    try {
      // Additional validation for valor against saldoConta
      if (data.valor > dadosConta.saldoConta) {
        showToast('O valor da transferência não pode ser maior que o saldo disponível');
        return;
      }
  
      const response = await api.post('/transacoes/transferir', data);
  
      if (response.status === 200) {
        console.log('Transferência realizada com sucesso:', response.data);
        showToast('Transferência realizada com sucesso', 'sucesso');
        loadAccountData();
      } else {
        console.error('Status de resposta inesperado:', response.status);
        showToast('Erro ao transferir. Por favor, tente novamente.', 'erro');
      }
    } catch (error) {
      console.error('Erro ao transferir:', error);
      showToast('Erro ao transferir. Por favor, tente novamente.', 'erro');
    }
  }
  

  const handleInputChange = (event) => {
    const inputValue = event.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    const numericValue = parseFloat(inputValue / 100).toFixed(2);

    setValue('valor', numericValue);
    event.target.value = numericValue;
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className={`mt-5 ${styles.mainContainer}`}>
      <h1 className=''>Transferir</h1>
        <div className="row mt-4">
          <div className="col-12">
            <div className={styles.withdrawContainer}>
              <div className={styles.font}>Saldo</div>
              <div className={styles.font}>
                {dadosConta.saldoConta.toLocaleString('default', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </div>
              <div className={styles.questionValue}>Valor da transferência a ser efetuado:</div>
              <form onSubmit={handleSubmit(handleDepositar)}>
                <input
                  className={styles.value}
                  {...register('valor')}
                  onChange={handleInputChange}
                  placeholder="R$0,00"
                />
                <div className={styles.questionValue2}>Informe a n° da conta:</div>
                <input
                  className={styles.value}
                  {...register('numeroConta')}
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/\D/g, ''); // Allow only numbers
                  }}
                />
                {errors.numeroConta && (
                  <p className={styles.errorMessage}>
                    {errors.numeroConta.message}
                  </p>
                )}
                {errors.valor && errors.valor.message !== 'Expected number, received nan' && (
                  <p className={styles.errorMessage}>
                    {errors.valor.message}
                  </p>
                )}
                <input type="submit" className={styles.button} value="Transferir" disabled={dadosConta.saldoConta === 0} />
              </form>
            </div>
          </div>
        </div>
      {ToastComponents}
    </div>
  );
}
