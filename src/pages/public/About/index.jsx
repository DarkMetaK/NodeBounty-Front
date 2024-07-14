import { CaretDown } from 'phosphor-react'

import aboutImage from '@assets/aboutImage.png'

import styles from './styles.module.css'

export function About() {
  function handleFaqItemClick(e) {
    const dt = e.currentTarget.children[0]
    const dd = e.currentTarget.children[1]
    const isClosed = e.currentTarget.dataset.open === 'false'

    if (isClosed) {
      dt.children[0].style.transform = 'rotate(180deg)'

      dd.style.maxHeight = 'none'
      e.currentTarget.dataset.open = 'true'
    } else {
      dt.children[0].style.transform = 'rotate(0deg)'

      dd.style.maxHeight = '0px'
      e.currentTarget.dataset.open = 'false'
    }
  }

  return (
    <>
      <main className={styles.intro}>
        <div className={styles.container}>
          <div className={styles.info}>
            <h1>
              Sobre o <span>Node Bounty</span>
            </h1>
            <p>
              Bem-vindo ao Node Bounty, a revolução digital em serviços
              bancários! Nossa missão é transformar a maneira como você gerencia
              suas finanças, oferecendo uma plataforma moderna, segura e
              eficiente. Com o Node Bounty, você pode abrir sua conta em
              minutos, escolher entre três diferentes tipos de planos que
              atendem às suas necessidades financeiras, e realizar todas as
              operações bancárias diretamente do seu dispositivo.
            </p>
            <br />
            <p>
              Oferecemos a conveniência de saques, depósitos e transferências
              para outras contas, e a vantagem exclusiva de receber cashback ao
              transferir para contas de lojas parceiras do seu plano. Além
              disso, proporcionamos ferramentas avançadas para simulações de
              investimentos em CDB, permitindo que você planeje seu futuro
              financeiro com confiança. E para uma gestão financeira
              transparente, acompanhe todas as movimentações do seu saldo
              através de gráficos interativos.
            </p>
          </div>

          <div className={styles.image}>
            <img src={aboutImage} alt="" />
          </div>
        </div>
      </main>

      <section className={styles.faq}>
        <h2>Perguntas Frequentes</h2>

        <dl>
          <div
            className={styles.faqItem}
            onClick={handleFaqItemClick}
            data-open="false"
          >
            <dt>
              O que é a conta Node Bounty?{' '}
              <CaretDown size={18} color="currentColor" weight="bold" />
            </dt>
            <dd>
              A conta Node Bounty é sua porta de entrada para uma experiência
              bancária digital completa. Com ela, você tem acesso a uma série de
              funcionalidades que tornam sua vida financeira mais prática e
              eficiente. Desde a abertura de conta com diferentes planos, até a
              realização de transações e investimentos, tudo é feito de forma
              rápida e segura.
            </dd>
          </div>

          <div
            className={styles.faqItem}
            onClick={handleFaqItemClick}
            data-open="false"
          >
            <dt>
              Vou precisar passar por um tipo de análise?{' '}
              <CaretDown size={18} color="currentColor" weight="bold" />
            </dt>
            <dd>
              Não, para garantir a praticidade você pode criar sua conta e já
              sair utilizando! No entanto, para sua segurança e a conformidade
              com as regulamentações bancárias, algumas ações podem ser
              temporáriamente bloqueadas para uma análise rápida dos dados
              fornecidos.
            </dd>
          </div>

          <div
            className={styles.faqItem}
            onClick={handleFaqItemClick}
            data-open="false"
          >
            <dt>
              Não tem nenhuma tarifa?{' '}
              <CaretDown size={18} color="currentColor" weight="bold" />
            </dt>
            <dd>
              No Node Bounty, prezamos pela transparência. Oferecemos contas sem
              tarifas de manutenção e cartões sem anuidade, permitindo que você
              economize mais. No entanto, algumas operações específicas podem
              estar sujeitas a tarifas, que serão claramente informadas antes da
              realização da transação.
            </dd>
          </div>

          <div
            className={styles.faqItem}
            onClick={handleFaqItemClick}
            data-open="false"
          >
            <dt>
              Quem pode ter a conta Node Bounty?{' '}
              <CaretDown size={18} color="currentColor" weight="bold" />
            </dt>
            <dd>
              A conta Node Bounty está disponível para qualquer pessoa maior de
              18 anos com residência no Brasil. Nosso objetivo é democratizar o
              acesso a serviços bancários de qualidade, proporcionando uma
              experiência financeira acessível e moderna para todos.
            </dd>
          </div>
        </dl>
      </section>
    </>
  )
}
