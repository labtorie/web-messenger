import React from 'react'
import styles from './Input.module.css'

const Input = (props) => {
    return <div>
        <input {...props} className={styles.input}/>
    </div>
}
export default Input