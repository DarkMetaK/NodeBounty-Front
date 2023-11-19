import { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'

import { authContext } from '@contexts/AuthContext'

import { DefaultLayout } from '@layouts/DefaultLayout.jsx'
import { AuthLayout } from '@layouts/AuthLayout.jsx'
import { PrivateHome } from '@pages/private/Home'
import { Plans } from '@pages/private/Plans'
import { Invest } from '@pages/private/Invest'
import { TransactionPage } from '@pages/private/transactionPage'
import { Configuration } from '@pages/private/Configuration'
import { CreditCardPage } from '@pages/private/CreditCardPage'
import { PublicHome } from '@pages/public/Home'
import { SignUp } from '@pages/public/SignUp'
import { Login } from '@pages/public/Login'
import { Sobre } from '@pages/public/Sobre'
import { Ajuda } from '@pages/public/Ajuda'

export function Router() {
  const { token } = useContext(authContext)

  return (
    <Routes>
      {token ? (
        <>
          <Route path="/" element={<AuthLayout />}>
            <Route path="/" element={<PrivateHome />} />
            <Route path="/cartoes" element={<CreditCardPage />} />
            <Route path="/investir" element={<Invest />} />
            <Route path="/transacoes" element={<TransactionPage />} />
            <Route path="/ajuda" element={<Ajuda />} />
            <Route path="/configuracao" element={<Configuration />} />
            {/* ...Insira outras rotas privadas aqui */}
          </Route>
          <Route path="/planos" element={<Plans />} />
        </>
      ) : (
        <Route path="/" element={<DefaultLayout />}>
          <Route path="/" element={<PublicHome />} />
          <Route path="/cadastro" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/ajuda" element={<Ajuda />} />
          {/* ...Insira outras rotas públicas aqui */}
        </Route>
      )}
    </Routes>
  )
}
