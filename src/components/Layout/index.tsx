import Head from 'next/head'
import React from 'react'
import styles from './Layout.module.css'
import { Roboto } from 'next/font/google'
import AppHeader from '../AppHeader'
import AppFooter from '../AppFooter'

const roboto = Roboto({ subsets: ['latin'], weight: '400' })

interface Props {
  children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Easy chat</title>
        <meta name="description" content="An application of rooms for chatting with people" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${roboto.className} ${styles.app}` }>
        <AppHeader />
        <main className={styles.main}>
          {children}
        </main>
        <AppFooter />
      </div>
    </>
  )
}

export default Layout
