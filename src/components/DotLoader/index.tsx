import React from 'react'
import styles from './Dot.module.css'

const DotLoader: React.FC = () => {
  return (
    <div className={styles.container}>
      <span className={styles.dot}></span>
      <span className={styles.dot}></span>
      <span className={styles.dot}></span>
    </div>
  )
}

export default DotLoader
