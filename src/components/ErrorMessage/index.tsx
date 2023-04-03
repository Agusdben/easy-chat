import React from 'react'
import styles from './ErrorMessage.module.css'
interface Props {
  message: string
}

const ErrorMessage: React.FC<Props> = ({ message }) => {
  return (
    <span className={styles.error}>{message}</span>
  )
}

export default ErrorMessage
