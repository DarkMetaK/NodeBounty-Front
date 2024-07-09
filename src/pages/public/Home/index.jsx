import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  CalendarX,
  Coins,
  CreditCard,
  DeviceMobile,
  Gift,
  Handshake,
  Wallet,
} from 'phosphor-react'

import { useWindowSize } from '@hooks/useWindowSize'
import heroImage from '@assets/heroImage.png'
import heroImageHorizontal from '@assets/heroImageHorizontal.png'
import cardImage from '@assets/homeCardImage.png'

import styles from './styles.module.css'
import { Button } from '@components/Button'

export function PublicHome() {
  const [windowWidth] = useWindowSize()
  const navigate = useNavigate()

  return (
    <>
      <main className={styles.intro}>
        <div className={styles.container}>
          <div>
            <h1>
              O inicio da sua <span>liberdade financeira</span> começa aqui
            </h1>

            <p>
              Conquiste seus objetivos financeiros com simplicidade e inovação.
              Junte-se a nós rumo a um futuro financeiro descomplicado
            </p>

            <Button
              title="Abrir conta"
              icon={<ArrowRight size={24} weight="bold" />}
              size="lg"
              onClick={() => navigate('/cadastro')}
            />
          </div>

          <div className={styles.image}>
            <img
              src={windowWidth > 960 ? heroImage : heroImageHorizontal}
              alt="Imagem preto e branco de uma mulher sorrindo enquanto mexe ao celular"
            />
          </div>
        </div>
      </main>

      <section className={styles.services}>
        <div className={styles.container}>
          <h2>Nossos Serviços</h2>

          <ul>
            <li className={styles.serviceCard}>
              <DeviceMobile size={48} color="currentColor" />
              <h3>Conta Corrente</h3>
              <p>
                Sem mensalidade e completa, adaptada para você e seu estilo de
                vida.
              </p>
            </li>

            <li className={styles.serviceCard}>
              <Gift size={48} color="currentColor" />
              <h3>Benefícios Exclusivos</h3>
              <p>
                Receba diversos benefícios exclusivos de lojas parceiras, de
                acordo com o plano escolhido
              </p>
            </li>

            <li className={styles.serviceCard}>
              <Coins size={48} color="currentColor" />
              <h3>Investimentos</h3>
              <p>
                Simule investimentos em CDB e descubra qual o melhor
                investimento para você.
              </p>
            </li>
          </ul>
        </div>
      </section>

      <section className={styles.card}>
        <div className={styles.container}>
          <h2>Bounty Card</h2>

          <div className={styles.cardContainer}>
            <div>
              <ul>
                <li className={styles.cardItem}>
                  <CalendarX size={48} color="currentColor" />
                  <h3>Zero Anuidade</h3>
                </li>

                <li className={styles.cardItem}>
                  <Handshake size={48} color="currentColor" />
                  <h3>Descontos em Parceiros</h3>
                </li>

                <li className={styles.cardItem}>
                  <Wallet size={48} color="currentColor" />
                  <h3>Limite Flexível</h3>
                </li>

                <li className={styles.cardItem}>
                  <CreditCard size={48} color="currentColor" />
                  <h3>Parcelamentos em até 24x</h3>
                </li>
              </ul>

              <Button
                title="Pedir Cartão"
                icon={<ArrowRight size={24} weight="bold" />}
                size="lg"
                onClick={() => navigate('/cadastro')}
              />
            </div>

            <div className={styles.image}>
              <img
                src={cardImage}
                alt="Frente em verso do cartão Node Bounty preto"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
