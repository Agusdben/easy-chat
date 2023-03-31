import SocketContextProvider from '@/context/SocketContext'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App ({ Component, pageProps }: AppProps): JSX.Element {
  return <SocketContextProvider>
    <Component {...pageProps} />
  </SocketContextProvider>
}
