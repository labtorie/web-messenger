import React from 'react'
import styles from './labels.module.css'

export const H1 = (props) => {
    return <h1 className={styles.heading1}>{props.text}</h1>
}

