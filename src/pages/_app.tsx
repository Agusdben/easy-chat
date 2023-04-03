import Layout from '@/components/Layout'
import SocketConnectedRoute from '@/components/SocketConnectedRoute'
import SocketContextProvider from '@/context/SocketContext'
import UserContextProvider from '@/context/UserContext'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App ({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <SocketContextProvider>
      <UserContextProvider>
          <Layout>
            <SocketConnectedRoute>
              <Component {...pageProps} />
            </SocketConnectedRoute>
          </Layout>
      </UserContextProvider>
    </SocketContextProvider>
  )
}
