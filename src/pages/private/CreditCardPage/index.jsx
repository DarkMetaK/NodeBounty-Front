import React, { useState, useEffect } from 'react'
import { Button } from '@components/Button'
import { CreditCard } from '@components/CreditCard'
import { ConfirmDialog } from '@components/Dialog'
import { Loading } from '@components/Loading'
import styles from './styles.module.css'
import { api } from '@lib/api.js'
import { useToast } from '@hooks/useToast'




export function CreditCardPage() {
  const [cartoes, setCartoes] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [erro, setErro] = useState(null)
  const [cardToDelete, setCardToDelete] = useState(null)
  const [avisoGeracao, setAvisoGeracao] = useState(false);
  const { showToast, ToastComponents } = useToast()
  const [isConfirmDialogOpen, setConfirmDialogOpen] = useState(false);

   function openConfirmDialog() {
    setConfirmDialogOpen(true);
  }

  function closeConfirmDialog() {
    setConfirmDialogOpen(false);
  }

  useEffect(() => {
    const consulta = async () => {
      setIsLoading(true)
      try {
        const { data } = await api.get('/cartoes')
        setCartoes(data)
      } catch (error) {
        alert('Um erro ocorreu, por favor tente novamente')
        setErro(error.message)
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    consulta()
  }, [])
  
  // console.log(cartoes[0].conta.plano.idPlano)
  async function GerarCartao() {
    console.log('Tentando gerar cartão...')
  
    try {
      const { data } = await api.post('/cartoes')
      setCartoes((cartoes) => [...cartoes, data]);
      setAvisoGeracao(true); // Mostra o aviso de geração bem-sucedida
    } catch (error) {
      alert('Um erro ocorreu, por favor tente novamente');
      setErro(error.message);
      console.log(error);
    }
      showToast("Cartão", "Novo cartão gerado!", false)
  }
  

  async function deletarCartao(idCartaoDeletar) {
    // Set the card ID to be deleted in the state
    setCardToDelete(idCartaoDeletar)
  }

  // Use a confirmation dialog before deleting
  useEffect(() => {
    if (cardToDelete !== null) {
        async function deleteConfirmedCard() {
          try {
            const { data } = await api.delete(`/cartoes/${cardToDelete}`)
            setCartoes((cartoes) =>
              cartoes.filter((cartao) => cartao.idCartao !== cardToDelete),
            )
          } catch (error) {
            alert('Um erro ocorreu, por favor tente novamente')
            setErro(error.message)
            console.log(error)
          }
        }
        deleteConfirmedCard()
      
      // Reset the cardToDelete state
      setCardToDelete(null)
      showToast("Cartão", "Cartão foi excluido com sucesso!", false)
    }
  }, [cardToDelete])

  console.log(cartoes)

  return isLoading ? (
    <Loading />
  ) : (
    <div className="container">
      <div>
        {cartoes.map((cartao) => (
          <div key={cartao.idCartao}>
            <CreditCard
              numeroCartao={cartao.numeroCartao}
              validadeCartao={cartao.validadeCartao}
              cvcCartao={cartao.cvcCartao}
              color={cartao.conta.plano.idPlano === 'Beauty' ? 'bgBeauty' : cartao.conta.plano.idPlano === 'Tech' ? 'bgTech' : 'bgHealth' }
            />
            <div className="row justify-content-center mt-1">
              <div className="col-2 text-left">
                <Button
                  id={cartao.idCartao}
                  titulo="Deletar Cartão"
                  onClick={openConfirmDialog} 
                />
              </div>
            </div>
            <ConfirmDialog
        isOpen={isConfirmDialogOpen}
        onCancel={closeConfirmDialog}
        onConfirm={() => {
          closeConfirmDialog();
          deletarCartao(cartao.idCartao);
        }}
      />
          </div>
        ))}
      </div>
      {ToastComponents}
      {erro && <p>Erro na consulta: {erro}</p>}

      <div className="row justify-content-center mt-1">
        <div className={'col-md-auto' + styles.cartao}>
          <div className={styles.cartao}>
            <Button
              titulo="Gerar Cartão"
              onClick={GerarCartao}
              tipo="secundario"
            />
          </div>
        </div>
        <div className="elementos-container"></div>
        
      </div>
    </div>
    
  )
}
