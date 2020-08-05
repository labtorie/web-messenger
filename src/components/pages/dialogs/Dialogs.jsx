import React, {useEffect, useState} from 'react'
import styles from './Dialogs.module.css'
import user from '../../../assets/images/user.png'
import {messagesAPI} from "../../../API/API";
import Loading from "../../common/screens/Loading";
import Hint from "../../common/hint/Hint";

const Item = (props) => {
    return (
        <div className={styles.itemWrapper}>
            <div className={styles.imageArea}>
                <img src={props.image || user} alt={'Profile'}/>
            </div>
            <div className={styles.name}>{props.name}</div>
            <div className={styles.unread}>{props.unread && <i className={'fas fa-circle'}/>}</div>
        </div>
    )
}

const Dialogs = () => {

    let [dialogs, setDialogs] = useState(null)
    let [isLoading, setLoading] = useState(true)

    useEffect(()=>fetchDialogs(), [])

    const fetchDialogs = () => {
        setLoading(true)
        messagesAPI.fetchDialogs().then(
            (r) => {
                setLoading(false)
                setDialogs(r)
            })
    }

    let DialogsComponents = dialogs && [...dialogs].map(
        (item) => {
            return <Item key={item.id} name={item.userName} image={item.photos.small}
                         unread={item.hasNewMessages}/>
        }
    )

    if (isLoading)
        return (<Loading/>)
    return (
        dialogs ?
            <div className={styles.wrapper}>
                {DialogsComponents}
            </div>
            :
            <Hint icon={'far fa-comment'} hint={'Your dialogs will be here'}/>
    )
}

export default Dialogs