import React, {useEffect, useState} from 'react'
import styles from './User.module.css'
import Button from "../../../common/controls/Button";
import {NavLink, useParams} from 'react-router-dom'
import {profileAPI, usersAPI} from "../../../../API/API";
import Loading from "../../../common/screens/Loading";
import {connect} from "react-redux";
import NoPicture from "../../../../assets/images/NoPicture";
import WithHeader from "../../../withHeader/WithHeader";
import Me from "./me/Me";

const Bio = (props) => {
    let [expanded, setExpanded] = useState(false)

    return <div className={styles.bio}>
        <div className={styles.title}>Bio:</div>
        <div onClick={() => {
            setExpanded(!expanded)
        }} className={expanded ? styles.bioFull : styles.bioReg}>
            {props.user && props.user.aboutMe}
        </div>
    </div>
}

const User = (props) => {
    let id = props.id
    let [isLoading, setLoading] = useState(true)
    let [user, setUser] = useState(null)
    let [followed, setFollowed] = useState(false)
    let [followButtonActive, toggleFollowButton] = useState(true)

    useEffect(
        () => {
            fetchUser(id)
        }, [id]
    )
    useEffect(
        () => {
            fetchFollowing(id)
        }, [id]
    )


    const fetchUser = (id) => {
        setLoading(true)
        profileAPI.fetchProfile(id).then(
            (r) => {
                setUser(r)
                setLoading(false)
            }
        )
    }
    const fetchFollowing = (id) => {
        usersAPI.checkFollow(id).then(
            (r) => setFollowed(r)
        )
    }

    const toggleFollow = () => {
        toggleFollowButton(false)
        followed ? usersAPI.unfollow(id).then(
            r => {
                if (r.resultCode === 0) setFollowed(false)
                toggleFollowButton(true)
            }
        ) : usersAPI.follow(id).then(r => {
            if (r.resultCode === 0) setFollowed(true)
            toggleFollowButton(true)
        })
    }

    if (isLoading) return <Loading/>
    return (
        <WithHeader headerTitle={user.fullName || 'User'} backLink={'/users'}>
            <div className={styles.wrapper}>
                <div className={styles.imageArea}>
                    {user && user.photos.large
                        ?
                        <img src={user.photos.large} alt={'Profile'}/>
                        :
                        <div className={styles.noPic}><NoPicture id={id} name={user.fullName} large/></div>
                    }
                </div>
                <div className={styles.texts}>
                    {user && user.aboutMe && <Bio user={user}/>}
                </div>
                <div className={styles.controls}>
                    <Button color={'#4378a8'}
                            label={<NavLink
                                className={styles.link}
                                to={`/chat/${id}`}>Send message</NavLink>}/>
                    <Button color={'#4378a8'}
                            disabled={!followButtonActive}
                            onClick={toggleFollow}
                            label={followed
                                ? <i className={'fas fa-star'}/>
                                : <i className={'far fa-star'}/>}/>
                </div>
            </div>
        </WithHeader>
    )
}

const mapStateToProps = (state) => ({
    authId: state.auth.authId
})


const UserDirector = (props) => {
    let {id} = useParams()
    return Number(id) === props.authId
        ?
        <Me/>
        :
        <User id={id}/>
}

export default connect(mapStateToProps,{})(UserDirector)