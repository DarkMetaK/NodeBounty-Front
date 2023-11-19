import { useContext } from 'react'
import {
  UserCircle,
  Gear,
  Money,
  Question,
  CreditCard,
  ChartLineUp,
  SignOut,
  List,
} from 'phosphor-react'
import { NavLink } from 'react-router-dom'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import { authContext } from '@contexts/AuthContext.jsx'

import styles from './styles.module.css'

export function Sidebar() {
  const { logout } = useContext(authContext)

  function handleLogout() {
    logout()
  }

  return (
    <aside className={styles.sidebar}>
      <nav>
        <NavLink to="/">
          <UserCircle size={32} />
          Conta
        </NavLink>
        <NavLink to="/configuracao">
          <Gear size={32} />
          Configurações
        </NavLink>
        <NavLink to="/transacoes">
          <Money size={32} />
          Transações
        </NavLink>
        <NavLink to="/ajuda">
          <Question size={32} />
          Ajuda
        </NavLink>
        <NavLink to="/cartoes">
          <CreditCard size={32} />
          Cartões
        </NavLink>
        <NavLink to="/investir">
          <ChartLineUp size={32} />
          Investir
        </NavLink>
        <button onClick={handleLogout} className={styles.logout}>
          <SignOut size={32} />
          Sair
        </button>

        <DropdownMenu.Root modal={false}>
          <DropdownMenu.Trigger className={styles.hamburguerMenu}>
            <List size={32} />
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className={styles.dropdownMenuContent}
              sideOffset={4}
            >
              <DropdownMenu.Item>
                <NavLink to="/">
                  <UserCircle size={32} />
                  Conta
                </NavLink>
              </DropdownMenu.Item>
              <DropdownMenu.Item>
                <NavLink to="/configuracao">
                  <Gear size={32} />
                  Configurações
                </NavLink>
              </DropdownMenu.Item>
              <DropdownMenu.Item>
                <NavLink to="/transacoes">
                  <Money size={32} />
                  Transações
                </NavLink>
              </DropdownMenu.Item>
              <DropdownMenu.Item>
                <NavLink to="/ajuda">
                  <Question size={32} />
                  Ajuda
                </NavLink>
              </DropdownMenu.Item>
              <DropdownMenu.Item>
                <NavLink to="/cartoes">
                  <CreditCard size={32} />
                  Cartões
                </NavLink>
              </DropdownMenu.Item>
              <DropdownMenu.Item>
                <NavLink to="/investir">
                  <ChartLineUp size={32} />
                  Investir
                </NavLink>
              </DropdownMenu.Item>
              <DropdownMenu.Item>
                <button onClick={handleLogout}>
                  <SignOut size={32} />
                  Sair
                </button>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </nav>
    </aside>
  )
}
