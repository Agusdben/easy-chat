import Link from 'next/link'
import styles from './AppFooter.module.css'

const AppFooter: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <section className={styles.info}>
        <p>Created by</p>
        <Link target='_black' rel='noopener noreferrer' href='https://agustindibenedetto.vercel.app/'>Agustin Di Benedetto</Link>
      </section>
      <section className={styles.links}>
        <Link target='_black' rel='noopener noreferrer' href='https://www.linkedin.com/in/agusdben/'>Linkedin</Link>
        <Link target='_black' rel='noopener noreferrer' href='https://github.com/Agusdben'>GitHub</Link>
      </section>
    </footer>
  )
}

export default AppFooter
