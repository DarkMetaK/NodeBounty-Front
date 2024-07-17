import { Link } from 'react-router-dom'

import Logo from '@assets/logo.svg'

import styles from './styles.module.css'

export function Footer() {
  return (
    <footer className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src={Logo} alt="Logo do Node Bounty" />
        </div>

        <div className={styles.service}>
          <h6>Atendimento</h6>
          <Link to="/sobre">Perguntas Frequentes</Link>

          <ul>
            <li>
              <strong>Canais de atendimento</strong>
              <p>
                Segunda à Sexta das 9h até 21h
                <br />
                Sábado das 9h às 15h
              </p>
            </li>

            <li>
              <strong>Capitais</strong>
              <p>9999 9999</p>
            </li>

            <li>
              <strong>Demais localidades</strong>
              <p>0800 999 9999</p>
            </li>
          </ul>
        </div>

        <div className={styles.links}>
          <h6>Informações</h6>
          <p>
            Sobre
            <br />
            Node Invest+
            <br />
            Produtos
            <br />
            Entrar
            <br />
            Criar conta
            <br />
            Termos e Condições
          </p>
        </div>
      </div>
    </footer>
  )
}
