import React from 'react';
import styles from './styles.module.css';
import dayjs from 'dayjs';
import jsPDF from 'jspdf';
import font from "@assets/inter.ttf";
import fontBold from "@assets/inter-Bold.ttf";
import nodeimage from "@assets/logo-decorator.png";
import pdfButton from "@assets/pdf-button.svg";
import WithdrawIcon from "@assets/withdraw.svg";
import DepositIcon from "@assets/deposit.svg";
import TransferIcon from "@assets/transfer.svg";

export function UnitExctract({ data, owner }) {
  const generatePDF = () => {
    const pdf = new jsPDF();
    pdf.addFont(fontBold, fontBold, 'normal');

    pdf.setFont(fontBold);
    pdf.setFontSize(30);

    // Adiciona uma moldura à página inteira
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    pdf.setDrawColor(35, 65, 73); // Cor da borda (preto)
    pdf.rect(5, 5, pageWidth - 10, pageHeight - 10);

    // Adiciona texto ao PDF dentro da moldura
    pdf.text('Comprovante NodeBounty', 20, 20);

    pdf.setFontSize(20);
    pdf.addFont(font, font, 'normal');

    // Defina a fonte para o restante do documento
    pdf.setFont(font);

    pdf.text(`Data da Transação: ${dayjs(data.transacao.dataTransacao).format('DD/MM/YYYY')}`, 20, 70);
    pdf.setFont(fontBold);

    pdf.text(` ${data.transacao.emissor === null
      ? 'Depósito'
      : data.transacao.receptor === null
        ? 'Saque'
        : 'Transferência entre contas'}`, 20, 80);
    pdf.setFont(font);

    if (data.transacao.emissor && data.transacao.receptor) {
      pdf.text(`Enviada por: ${data.transacao.emissor.cliente.nome}`, 20, 110);
      pdf.text(`Conta: ${data.transacao.emissor.numeroConta}`, 20, 120);
      pdf.text(`CPF: ${formatarCPF(data.transacao.emissor.cliente.cpf)}`, 20, 130);

      pdf.text(`Recebida por: ${data.transacao.receptor.cliente.nome}`, 20, 150);
      pdf.text(`Conta: ${data.transacao.receptor.numeroConta}`, 20, 160);
      pdf.text(`CPF: ${formatarCPF(data.transacao.receptor.cliente.cpf)}`, 20, 170);
    } else {
      // Adiciona informações de número de conta e CPF para saques e depósitos
      if (data.transacao.emissor === null) {
        // Depósito
        pdf.text(`Conta: ${data.transacao.receptor.numeroConta}`, 20, 110);
        pdf.text(`CPF: ${formatarCPF(data.transacao.receptor.cliente.cpf)}`, 20, 120);
      } else {
        // Saque
        pdf.text(`Conta: ${data.transacao.emissor.numeroConta}`, 20, 110);
        pdf.text(`CPF: ${formatarCPF(data.transacao.emissor.cliente.cpf)}`, 20, 120);
      }
    }

    pdf.setFontSize(32);
    pdf.text(`Valor: ${formatarValor(data.transacao.valorTransacao)}`, 20, 210);

    // Adiciona a imagem ao canto inferior direito
    const imageWidth = 50;
    const imageHeight = 50;
    pdf.addImage(nodeimage, 'PNG', pageWidth - imageWidth - 10, pageHeight - imageHeight - 10, imageWidth, imageHeight);

    // Salva o PDF
    pdf.save('extrato_bancario.pdf');
  };

  function formatarValor(number) {
    const valorFormatado = number.toLocaleString('default', {
      style: 'currency',
      currency: 'BRL',
    });
    return valorFormatado;
  }



  function formatarValorSignal(number) {
    const valorFormatado = number.toLocaleString('default', {
      style: 'currency',
      currency: 'BRL',
    });
  
    if (data?.transacao?.emissor === null || data?.transacao?.receptor?.cliente?.idCliente === owner) {
      // Deposit
      return { value: `+${valorFormatado}`, className: styles.valorGreen };
    } else if (data?.transacao?.receptor === null || data?.transacao?.emissor?.cliente?.idCliente === owner) {
      // Withdrawal
      return { value: `-${valorFormatado}`, className: styles.valorRed };
    } 
  }
  

  function formatarCPF(cpf) {
    // Adiciona asteriscos aos primeiros 3 dígitos e aos últimos 2 dígitos do CPF
    const cpfAsteriscos = cpf.replace(/^(.{3})(.*)(.{2})$/, (_, first, middle, last) => {
      const asteriscos = first.replace(/./g, '*');
      const ultimosDigitos = last.replace(/./g, '*');
      return `${asteriscos}${middle}${ultimosDigitos}`;
    });

    return cpfAsteriscos;
  }

  const getTransactionIcon = () => {
    if (data.transacao.emissor === null) {
      return <img className={styles.svg} src={DepositIcon} alt="Ícone de Depósito" />;
    } else if (data.transacao.receptor === null) {
      return <img className={styles.svg} src={WithdrawIcon} alt="Ícone de Saque" />;
    } else {
      return <img className={styles.svg} src={TransferIcon} alt="Ícone de Transferência" />;
    }
  };

  return (
    <div className={styles.transacaoContainer}>
      <div className={styles.transacao}>
        <div className={styles.data}>{dayjs(data.transacao.dataTransacao).format('DD/MM/YYYY')} </div>
        <div className={styles.descricao}>
          {getTransactionIcon()}
          {data.transacao.emissor === null
            ? `Depósito`
            : data.transacao.receptor === null
            ? 'Saque'
            : 'Transferência'}
          {data.transacao.emissor && data.transacao.receptor && (
            <>
              {data.transacao.emissor.cliente.idCliente === owner && (
                <> enviada para {data.transacao.receptor.cliente.nome}</>
              )}
              {data.transacao.receptor.cliente.idCliente === owner && (
                <> recebida de {data.transacao.emissor.cliente.nome}</>
              )}
            </>
          )}
        </div>
        <div className={styles.box}>
        <div className={`${styles.valor} ${formatarValorSignal(data.transacao.valorTransacao).className}`}>
  {formatarValorSignal(data.transacao.valorTransacao).value}
</div>
          <img className={styles.pdf_svg} src={pdfButton} alt="Botão PDF" onClick={generatePDF} />
          <div className={styles.tooltip}>Clique para gerar PDF</div>
        </div>
      </div>
    </div>
  );
}
