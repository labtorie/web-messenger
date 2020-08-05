import React from 'react'
import styles from "../404/Error404.module.css";
import {H1} from "../../common/labels/labels";
import {NavLink} from "react-router-dom";


const Error404 = () => {
    return <div className={styles.wrapper}>
        <div className={styles.error}>
            <H1 text={'404'}/>
            <NavLink className={styles.link} to={'/dialogs'}>Go to home page</NavLink>
        </div>
    </div>
}

export default Error404