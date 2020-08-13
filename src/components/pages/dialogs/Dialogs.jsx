import React, {useEffect, useState} from 'react'
import styles from './Dialogs.module.css'
import {messagesAPI} from "../../../API/API";
import Loading from "../../common/screens/Loading";
import Hint from "../../common/hint/Hint";
import {NavLink} from "react-router-dom";
import NoPicture from "../../../assets/images/NoPicture";
import WithHeader from "../../withHeader/WithHeader";

const Item = (props) => {
    return (
        <NavLink className={styles.link} to={`/chat/${props.id}`}>
            <div className={styles.itemWrapper}>
                <div className={styles.imageArea}>
                    {props.image
                        ?
                        <img src={props.image} alt={'Profile'}/>
                        :
                        <NoPicture id={props.id} name={props.name}/>
                    }
                </div>
                <div className={styles.name}>{props.name}</div>
                <div className={styles.unread}>{props.unread && <i className={'fas fa-circle'}/>}</div>
            </div>
        </NavLink>
    )
}

const Dialogs = () => {

    let [dialogs, setDialogs] = useState(null)
    let [isLoading, setLoading] = useState(true)

    useEffect(() => fetchDialogs(), [])

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
            return <Item key={item.id} id={item.id} name={item.userName} image={item.photos.small}
                         unread={item.hasNewMessages}/>
        }
    )

    if (isLoading)
        return (<Loading/>)
    return (
        <WithHeader headerTitle={'Dialogs'}>
            {dialogs && dialogs.length > 0 ?
            <div className={styles.wrapper}>
                {DialogsComponents}
            </div>
            :
            <Hint icon={'far fa-comment'} hint={'Your dialogs will be here'}/>}
        </WithHeader>
    )
}

export default Dialogs