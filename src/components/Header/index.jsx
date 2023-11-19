import { Link, NavLink } from 'react-router-dom'
import { List } from 'phosphor-react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import Logo from '@assets/logo-preta.svg'

import styles from './styles.module.css'

export function Header() {
  return (
    <header className={styles.wrapper}>
      <div className={styles.container}>
        <Link to="/">
          <img src={Logo} alt="Logo do Node Bounty" />
        </Link>

        <nav className={styles.nav}>
          <NavLink to="/sobre">Sobre</NavLink>
          <NavLink to="/cadastro">Abrir conta</NavLink>
          <NavLink to="/login">Acesso</NavLink>

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
                  <NavLink to="/">Node Invest +</NavLink>
                </DropdownMenu.Item>
                <DropdownMenu.Item>
                  <NavLink to="/sobre">Sobre</NavLink>
                </DropdownMenu.Item>
                <DropdownMenu.Item>
                  <NavLink to="/cadastro">Abrir conta</NavLink>
                </DropdownMenu.Item>
                <DropdownMenu.Item>
                  <NavLink to="/login">Acesso</NavLink>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </nav>
      </div>
    </header>
  )
}
