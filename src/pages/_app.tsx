import Layout from '@/components/Layout'
import SocketContextProvider from '@/context/SocketContext'
import UserContextProvider from '@/context/UserContext'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App ({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <SocketContextProvider>
      <Layout>
        <UserContextProvider>
          <Component {...pageProps} />
        </UserContextProvider>
      </Layout>
    </SocketContextProvider>
  )
}
