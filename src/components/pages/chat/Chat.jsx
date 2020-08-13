import React, {useEffect, useState} from 'react'
import styles from './Chat.module.css'
import {NavLink, Redirect, useParams} from "react-router-dom";
import Div100vh from "react-div-100vh";
import {messagesAPI, profileAPI} from "../../../API/API";
import Loading from "../../common/screens/Loading";
import Button from "../../common/controls/Button";
import TextareaAutosize from 'react-textarea-autosize';
import {connect} from "react-redux";
import NoPicture from "../../../assets/images/NoPicture";

const pageSize = 20

const MessageBubble = (props) => {
    return <div className={styles.messageSpace}>
        <div className={props.mine ? styles.sent : styles.received}>
            <div className={styles.bubble}>{props.text}</div>
        </div>
    </div>
}

const ch = (props) => {
    return (<div className={styles.backWrapper}>
        <div className={styles.icon}><NavLink className={styles.link} to={props.backLink}> <i
            className='fas fa-chevron-left'/></NavLink></div>
        <div className={styles.name}><h1 className={styles.backTitle}>{props.title || 'Header'}</h1></div>
    </div>)
}

const ChatHeader = (props) => {
    return <div className={styles.header}>
        <div className={styles.icon}><NavLink className={styles.link} to={`/dialogs`}> <i
            className='fas fa-chevron-left'/></NavLink></div>
        <div className={styles.name}><h1 className={styles.nameText}>{props.name || 'Chat'}</h1></div>
        <div className={styles.imageArea}>
            <NavLink to={`/user/${props.id}`} style={{textDecoration: 'none'}}> {props.image
                ?
                <img src={props.image} alt={'Profile'}/>
                :
                <div className={styles.noPic} ><NoPicture id={props.id} name={props.name}/></div>
            }</NavLink>
        </div>
    </div>
}

const Chat = (props) => {
    let {id} = useParams()
    let [person, setPerson] = useState(null)
    let [isLoading, setLoading] = useState(true)
    let [messages, setMessages] = useState(null)
    let [input, setInput] = useState('')
    let [isSending, setSending] = useState(false)
    let [currentPage, setPage] = useState(1)
    let [isShowMorePending, setShowMorePending] = useState(false)
    let [newItems, setNewItems] = useState(0)

    useEffect(
        () => {
            fetchProfile()
            fetchMessages(currentPage)
        }, []
    )

    const fetchProfile = () => {
        setLoading(true)
        profileAPI.fetchProfile(id).then(
            (r) => {
                setPerson({name: r && r.fullName, photo: r.photos && r.photos.small})
                setLoading(false)
            }
        )
    }

    const fetchMessages = (page) => {
        setLoading(true)
        return messagesAPI.fetchMessages(id, pageSize, page).then(
            (r) => {
                setMessages(r)
                setLoading(false)
                const objDiv = document.getElementById("msg_scroll");
                objDiv.scrollTop = objDiv.scrollHeight;
            }
        )
    }

    const showMore = () => {
        setShowMorePending(true)
        const scroller = document.getElementById("msg_scroll")
        let scrollHeightOld = scroller.scrollHeight;
        return messagesAPI.fetchMessages(id, pageSize, currentPage + 1 + Math.floor(newItems / pageSize)).then(
            (r) => {
                setMessages({
                    ...messages,
                    items: [...r.items.slice(0, pageSize - (newItems % pageSize)), ...messages.items]
                })
                setShowMorePending(false)
                setPage(currentPage + 1 + Math.floor(newItems / pageSize))
                setNewItems(0)
                let scrollHeightNew = scroller.scrollHeight
                scroller.scrollTo(0, scrollHeightNew - scrollHeightOld)
            }
        )
    }

    const changeInput = (e) => {
        setInput(e.target.value.replace('<br />', "\r\n"))
    }

    const sendMessage = () => {
        if (input !== '') {

            messagesAPI.sendMessage(id, input).then(
                r => {
                    setMessages({
                        ...messagesAPI,
                        items: [...messages.items, r.data.message],
                        totalCount: messages.totalCount + 1
                    })
                    setSending(false)
                    setInput('')
                    setNewItems(newItems + 1)
                    const objDiv = document.getElementById("msg_scroll");
                    objDiv.scrollTop = objDiv.scrollHeight;
                }
            )
        }
    }

    let messagesComponents = messages && [...messages.items].map(
        (item) => {
            return <MessageBubble key={item.id} mine={item.senderId === props.authId} text={item.body}/>
        }
    )
    if (!props.authorized) return <Redirect to={'/login'}/>
    return <Div100vh>
        {isLoading
            ?
            <div className={styles.messagesWrapper}>
                <Loading/>
            </div>
            :
            <div className={styles.grid}>
                <ChatHeader name={person && person.name} image={person && person.photo} id={id}/>
                <div className={styles.messagesWrapper} id='msg_scroll'>
                    {messages && messages.items.length < messages.totalCount && <div className={styles.showMoreArea}>
                        <center><Button label={'Show more'} onClick={showMore} disabled={isShowMorePending}/></center>
                    </div>}
                    {messagesComponents}
                </div>
                <div className={styles.footer}>
                    <TextareaAutosize className={styles.textarea}
                                      placeholder={'Write a message...'}
                                      minRows={1}
                                      maxRows={5}
                                      onChange={changeInput}
                                      value={input}/>
                    <div className={styles.btnArea}>
                        <Button disabled={isSending}
                                onClick={sendMessage}
                                className={styles.sendBtn}
                                color={'#4378a8'}
                                label={<i className={'fas fa-paper-plane'}/>}/>
                    </div>
                </div>
            </div>}

    </Div100vh>
}

const mapStateToProps = (state) => ({
    authorized: state.auth.authorized,
    authId: state.auth.authId
})
export default connect(mapStateToProps, {})(Chat)