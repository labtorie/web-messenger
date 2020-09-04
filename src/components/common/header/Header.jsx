import React from 'react'
import styles from './Header.module.css'
import {NavLink} from "react-router-dom";
import {useHistory} from 'react-router-dom';


const Header = (props) => {
    let history = useHistory()
    if (props.backLink) return (<div className={styles.backWrapper}>
                <div className={styles.icon} onClick={() => { history.go(-1)}}><div className={styles.link}> <i
                    className='fas fa-chevron-left'/></div></div>
                <div className={styles.name}><h1 className={styles.backTitle}>{props.title || 'Header'}</h1></div>
            </div>
    )
    else
    return <div className={styles.wrapper}>
        <h1 className={styles.title}>{props.title || 'Header'}</h1>
    </div>
}
export default Header