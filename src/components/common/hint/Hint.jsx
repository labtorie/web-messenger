import React from 'react'
import styles from './Hint.module.css'

const Hint = (props) => {
    return <div className={styles.hint}>
        <div>
            <div className={styles.icon}><i className={props.icon}></i></div>
            <div><h3>{props.hint}</h3></div>
        </div>
    </div>
}

export default Hint