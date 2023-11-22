import { Outlet } from 'react-router-dom'

import { AcessibilityBar } from '@components/AcessibilityBar'
import { Header } from '@components/Header'
import { Footer } from '@components/Footer'

export function DefaultLayout() {
  return (
    <>
      <AcessibilityBar />
      <div style={{ paddingTop: '40px' }}>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  )
}
