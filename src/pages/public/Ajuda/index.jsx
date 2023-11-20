import { useNavigate } from 'react-router-dom'
import { Button } from '@components/Button'
import styles from './styles.module.css'



{/*className={styles.boxtitle}*/ }
export function Ajuda() {
  const navigate = useNavigate();
  return (
    <main style={{ flex: 1 }}>
      <div>
        <div className={styles.container}>
          <nav className={styles.accordion + styles.arrows}>

            <label><h1> <strong>Perguntas Frequentes</strong></h1></label>

            <h2><strong>Sobre o Node Bounty</strong></h2>
            <input className={styles.inputd} type="radio" name="accordion" id="cb1" />
            <section className={styles.box}>
              <label className={styles.boxtitle} for="cb1"><strong>O Node Bounty</strong></label>
              <label className={styles.boxclose} for="acc-close"></label>
              <div className={styles.boxcontent}>
                <p>
                  O node bounty é um projeto de fintech prototipado e desenvolvido
                  no segundo semestre de Desenvolvimento de Software Multiplataforma
                  da Fatec Zona Leste por alunos com um enorme interesse por
                  tecnologia que visam a qualificação para a entrada no mercado de
                  trabalho. O intento em centrar nossos esforços em um projeto de
                  fintech é a inevitabilidade de nichar nossos estudos, explorando
                  ao máximo linguagens, bibliotecas e frameworks que corroborem com
                  o progresso de aprendizado. Com o boom dos serviços financeiros no
                  Brasil, a reinvenção se fez necessária. O que distingue o Node
                  Bounty das demais conveniências financeiras é a possibilidade de
                  integrar o advento das redes sociais em benefícios e vantagens
                  reais. Buscamos oferecer um suporte nunca antes fornecido aos
                  criadores de conteúdo com um segmento bem delineado. Somos o
                  diferencial econômico requisitado para impulsionar a visibilidade
                  daqueles que fazem uso das redes sociais.
                </p>
                <p>
                  Uma fintech (tecnologia financeira) é caracterizada como uma
                  empresa/startup que desenvolve produtos financeiros digitais,
                  sendo o uso da tecnologia o principal diferencial em relação às
                  corporações tradicionais do mundo financeiro. É visível que a
                  popularização e a disseminação da internet ditou as regras de um
                  novo jogo. Um novo cenário de competição foi criado em vários
                  setores da economia. Ficou mais fácil testar e criar novos
                  produtos por meio dos canais digitais.
                </p>
              </div>
            </section>
            <input className={styles.inputd} type="radio" name="accordion" id="cb2" />
            <section className={styles.box}>
              <label className={styles.boxtitle} for="cb2"><strong>Sobre a conta do Node Bounty</strong></label>
              <label className={styles.boxclose} for="acc-close"></label>
              <div className={styles.boxcontent}>
                A conta do Node Bounty é a nossa conta digital e, assim como tudo no Node Bounty, foi desenhada para todos que desejam um serviço transparente, simples e sem tarifas abusivas. Ela foi feita para redefinir a maneira como você cuida do seu dinheiro. Para cumprir esse papel, a conta do Node Bounty:

                — Não tem anuidade, nem taxa de manutenção;

                — Tem rendimento automático superior à poupança, que te dá a tranquilidade de saber que o dinheiro que fica mais tempo na conta não está parado. Além disso, todos os depósitos contam com algum tipo de garantia;

                — Oferece transferências gratuitas e ilimitadas para qualquer banco;

                — Tem um cartão com função débito para você fazer compras e saques;

                — Possibilita pagamento de boletos como conta de luz, água, telefone e até mesmo compras online.
              </div>
            </section>
            <p>
              <br>
              </br>
            </p>
            <h2><strong>Sobre o cartão</strong></h2>
            <input className={styles.inputd} type="radio" name="accordion" id="cb3" />
            <section className={styles.box}>
              <label className={styles.boxtitle} for="cb3">
                <strong>Não tem nenhuma tarifa?</strong></label>
              <label className={styles.boxclose} for="acc-close"></label>
              <div className={styles.boxcontent}>
                <p>
                  A conta do Node Bounty não tem anuidade, você não paga nada para transferir seu dinheiro para qualquer banco nem para fazer depósitos através de um boleto. Você também não tem nenhum custo para ativar e nem para receber um cartão com a função débito.
                </p><p>
                  Cada saque realizado terá uma tarifa de R$ 6,50 referente ao preço de custo por utilizarmos essas redes externas. Ou seja, só paga quem usar e quando usar.
                </p>
              </div>
            </section>
            <p>
              <br>
              </br>
            </p>
            <h2><strong>Segurança</strong></h2>
            <input className={styles.inputd} type="radio" name="accordion" id="cb4" />
            <section className={styles.box}>
              <label className={styles.boxtitle} for="cb4"><strong>A conta do Node Bounty é segura?</strong></label>
              <label className={styles.boxclose} for="acc-close"></label>
              <div className={styles.boxcontent}>
                Segurança e privacidade são elementos integrados a conta do Node Bounty.
                Com o uso de Tokens no método Bcrypt (um dos mais seguros algoritmos de cripitografia na atualidade) mantemos suas informações essenciais protegidas.
                Quando você realiza pagamentos pela conta do Node Bounty o número verdadeiro do cartão de crédito não é compartilhado e sim um cartão temporário.
                Assim, as informações usadas no pagamento ficam seguras.
              </div>
            </section>
            <input className={styles.inputd} type="radio" name="accordion" id="cb5" />
            <section className={styles.box}>
              <label className={styles.boxtitle} for="cb5"><strong>Existe algum risco em colocar meu dinheiro na conta do Node Bounty?</strong></label>
              <label className={styles.boxclose} for="acc-close"></label>
              <div className={styles.boxcontent}>
                Se o seu dinheiro fica separado do patrimônio do Node Bounty e só pode ser usado para aplicações em Títulos Públicos Federais. Por isso, nesse caso, o risco na conta é similar ao de uma aplicação no Tesouro Direto - renda fixa, pós-fixado, garantido pelo Governo - e dispensa outro tipo de garantia.
              </div>
            </section>
            <p>
              <br>
              </br>
            </p>
            <h2><strong>Como usar o Node Bounty</strong></h2>
            <input className={styles.inputd} type="radio" name="accordion" id="cb6" />
            <section className={styles.box}>
              <label className={styles.boxtitle} for="cb6">
                <strong>O que pode a conta do Node Bounty me possibilita?</strong>
              </label>
              <label className={styles.boxclose} for="acc-close"></label>
              <div className={styles.boxcontent}>
                <p>Após logar em sua conta na aba de navegação à esquerda é possível acessando as seguintes funções:
                  <p></p>
                  <p><strong>Conta</strong>: Consultar saldo e atualizar seus dados</p>
                  <p><strong>Transações</strong>: Depositar, sacar, pagamento de faturas</p>
                  <p><strong>Cartões</strong>: Gerar e deleta cartões</p>
                  <p><strong>Inverstir</strong>: Utilizar nossa calculadora financeira para planejar investimentos.</p>
                </p>
              </div>

            </section>
            <input className={styles.inputd} type="radio" name="accordion" id="acc-close" />
          </nav>
        </div>
      </div>
    </main>
  )
} 
