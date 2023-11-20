import { useState, useContext, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import { api } from '@lib/api.js';
import dayjs from 'dayjs';
import { Loading } from '@components/Loading';
import { UnitExctract } from '@components/UnitExtract';


export function Extract() {
  const [filtro, setFiltro] = useState('');
  const navigate = useNavigate();
  const [dadosConta, setDadosConta] = useState({});
  const [dadosTransacao, setDadosTransacao] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


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

  useEffect(() => {
    async function buscarDadosTransacao() {
      try {
        setIsLoading(true);
        const { data } = await api.get('/transacoes');
        setDadosTransacao(data);
        setIsLoading(false);
      } catch (error) {
        alert('Um erro ocorreu');
        console.log(error);
      }
    }

    buscarDadosTransacao();
  }, []);

  function obterTipoTransacao(transacao) {
    if (transacao.emissor === null) {
      return 'Depósito';
    } else if (transacao.receptor === null) {
      return 'Saque';
    } else {
      return 'Transferência';
    }
  }

  function getCorPorTipoTransacao(transacao) {
    if (transacao.emissor === null) {
      return styles.corDeposito;
    } else if (transacao.receptor === null) {
      return styles.corSaque;
    } else {
      return styles.corTransferencia;
    }
  }
  return (
    <div className={`mt-5 ${styles.mainContainer}`}>
      <h1 className=''>Extrato</h1>
      {isLoading ? (
        <Loading />

      ) : (
        <div className={styles.extrato}>
          {dadosTransacao.length === 0 && (
            <div className={styles.alert}>Não há histórico de transações realizadas</div>
          )}
          {dadosTransacao.map((item) => (
            <div key={item.id} className={`${styles.transacao}`}>
              <UnitExctract key={item.transacao.idTransacao} data={item} owner={dadosConta.cliente.idCliente} />
            </div>
          ))}


        </div>
      )}
    </div>
  );
}
