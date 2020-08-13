import React from "react";
import styles from './WithHeader.module.css'
import Header from "../common/header/Header";
const WithHeader = (props) => {
    return <div className={styles.grid}>
        <Header className={styles.header} title={props.headerTitle} {...props}/>
        <div className={styles.body}>{props.children}</div>
    </div>
}
export default WithHeader