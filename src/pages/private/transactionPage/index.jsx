import { Deposit } from '../../../components/Deposit';
import { Transfer } from '../../../components/Transfer';
import { Extract } from '../../../components/Extract';
import styles from './styles.module.css';
import { Withdraw } from "@components/Withdraw";
import React, { useState } from 'react';

export function TransactionPage() {
  const [activeComponent, setActiveComponent] = useState('Withdraw');



  const renderComponent = () => {
    console.log(activeComponent); 
    if (activeComponent === 'Withdraw') {
      return <Withdraw />;
    } else if (activeComponent === 'Deposit') {
      return <Deposit />;
    } else if (activeComponent === 'Transfer') {
      return <Transfer />
    }
    else if (activeComponent === 'Extract') {
      return <Extract />
    }
  };

  return (
    <div>
      {renderComponent()}

      <div className={`mt-4 ${styles.mainContainer}`}>
        
        <button
          className={`${styles.leftButton} ${activeComponent === 'Withdraw' ? styles.activeButton : ''}`}
          onClick={() => setActiveComponent('Withdraw')}
        >
          Sacar
        </button>
        <button
          className={`${styles.centerButton} ${activeComponent === 'Deposit' ? styles.activeButton : ''}`}
          onClick={() => setActiveComponent('Deposit')}
        >
          Depositar
        </button>
        <button
          className={`${styles.rightButton} ${activeComponent === 'Transfer' ? styles.activeButton : ''}`}
          onClick={() => setActiveComponent('Transfer')}
        >
          Transferir
        </button>  
        <br/>
      <button
          className={`mt-1 ${styles.largeButton} ${activeComponent === 'Extract' ? styles.activeButton : ''}`}
          onClick={() => setActiveComponent('Extract')}
        >Extrato</button>      
      </div>
    </div>
  );
}
