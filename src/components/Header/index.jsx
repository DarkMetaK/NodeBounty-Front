import { Link, NavLink } from 'react-router-dom'
import { List } from 'phosphor-react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import Logo from '@assets/logo.svg'

import styles from './styles.module.css'
import { Button } from '@components/Button'

export function Header() {
  return (
    <header className={styles.wrapper}>
      <div className={styles.container}>
        <Link to="/">
          <img src={Logo} alt="Logo do Node Bounty" />
        </Link>

        <nav className={styles.nav}>
          <NavLink to="/sobre">Sobre</NavLink>
          <NavLink to="/login">Entrar</NavLink>
          <Button title="Abrir conta" link="/cadastro" />

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
                  <NavLink to="/sobre">Sobre</NavLink>
                </DropdownMenu.Item>
                <DropdownMenu.Item>
                  <NavLink to="/login">Entrar</NavLink>
                </DropdownMenu.Item>
                <DropdownMenu.Item>
                  <NavLink to="/cadastro">Abrir Conta</NavLink>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </nav>
      </div>
    </header>
  )
}
