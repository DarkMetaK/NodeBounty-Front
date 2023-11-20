import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { useState, useContext, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@lib/api';
import { useToast } from '@hooks/useToast';
import { AppError } from '@utils/AppError';
import { Loading } from '@components/Loading'
import styles from './styles.module.css';


export function Withdraw() {
  const [dadosConta, setDadosConta] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { showToast, ToastComponents } = useToast();

  const schema = z.object({
    valor: z
      .coerce
      .number()
      .min(0.01, 'O valor mínimo para saque é de 1 centavo')
      .refine(data => {
        if (dadosConta.saldoConta === undefined) {
          return true; // Skip the validation if saldoConta is undefined
        }
  
        return data <= dadosConta.saldoConta;
      }, {
        message: 'O valor máximo de saque é de ' + (
          dadosConta.saldoConta !== undefined
            ? dadosConta.saldoConta.toLocaleString('default', {
                style: 'currency',
                currency: 'BRL',
              })
            : ''
        ),
      }),
  });
  

  const loadAccountData = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await api.get('/conta');
      setDadosConta(data);
      setIsLoading(false);
    } catch (error) {
      const isAppError = error instanceof AppError;
      // Handle error
    }
  }, [navigate]);

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

  const handleSacar = async (data) => {
    try {
      const response = await api.post('/transacoes/sacar', { valor: data.valor });

      if (response.status === 200) {
        console.log('Saque realizado com sucesso:', response.data);
        showToast('Saque realizado com sucesso', 'sucesso');
        loadAccountData();
      } else {
        console.error('Status de resposta inesperado:', response.status);
        showToast('Erro ao sacar. Por favor, tente novamente.', 'erro');
      }
    } catch (error) {
      console.error('Erro ao depositar:', error);
      showToast('Erro ao sacar. Por favor, tente novamente.', 'erro');
    }
  };

  const handleInputChange = (event) => {
    if (dadosConta.saldoConta !== undefined) {
      const inputValue = event.target.value.replace(/\D/g, '');
      const numericValue = parseFloat(inputValue / 100).toFixed(2);
  
      setValue('valor', numericValue);
      event.target.value = numericValue;
    }
  };
  

  return isLoading ? (
    <Loading />
  ) : (
    <div className={`mt-5 ${styles.mainContainer}`}>
      <h1 className=''>Sacar</h1>
        <div className="row mt-4">
          <div className="col-12">
            <div className={styles.withdrawContainer}>
              <div className={styles.font}>Saldo</div>
              <div className={styles.font}>{' '}
                {dadosConta.saldoConta.toLocaleString('default', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </div>
              <div className={styles.questionValue}>Informe o valor do saque a ser efetuado:</div>
              <form onSubmit={handleSubmit(handleSacar)}>
                <input
                  className={styles.value}
                  {...register('valor')}
                  onChange={handleInputChange}
                  placeholder="R$0,00"
                  type='text'
                />
                {errors.valor && errors.valor.message !== 'Expected number, received nan' && (
                  <p className={styles.errorMessage}>
                    {errors.valor.message}
                  </p>
                )}
                <input type="submit" className={styles.button}  disabled={dadosConta.saldoConta === 0} value="Sacar" />
              </form>
            </div>
          </div>
        </div>
      {ToastComponents}
    </div>
  );
}
