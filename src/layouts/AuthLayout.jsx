import { Outlet } from 'react-router-dom'

import { AcessibilityBar } from '@components/AcessibilityBar'
import { Sidebar } from '../components/Sidebar'
import styles from './AuthLayout.styles.module.css'

export function AuthLayout() {
  return (
    <>
      <AcessibilityBar />
      <div className={styles.authContainer}>
        <Sidebar />
        <Outlet />
      </div>
    </>
  )
}
