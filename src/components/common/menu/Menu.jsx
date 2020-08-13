import React from 'react'
import styles from './Menu.module.css'
import {NavLink} from "react-router-dom"

const Item = (props) => {
    return (
        <div className={styles.item}>
            <NavLink className={styles.icon} to={props.path} activeClassName={`${styles.icon} ${styles.selected}`}>
                <i className={props.icon}/>
            </NavLink>
        </div>
    )
}

const Menu = () => {
    return (
        <div className={styles.wrapper}>
            <Item path='/users' icon='fas fa-user-friends'/>
            <Item path='/dialogs' icon='fas fa-comments'/>
            <Item path='/me' icon='fas fa-cog'/>

        </div>
    )
}
export default Menu