import React from 'react'
import styles from './Loading.module.css'
import spinner from '../../../assets/images/spinner.svg'

const Loading = () => {
    return <div className={styles.wrapper}>
        <img alt='spinner' className={styles.spinner} src={spinner}/>
    </div>
}
export default Loading