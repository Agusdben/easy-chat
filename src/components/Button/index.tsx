import { type ButtonHTMLAttributes } from 'react'
import styles from './Button.module.css'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

const Button: React.FC<Props> = ({ children, ...props }) => {
  return (
    <button className={styles.button} {...props}>{children}</button>
  )
}

export default Button
