import React, {useEffect, useState} from 'react'
import styles from './User.module.css'
import Button from "../../../common/controls/Button";
import userImage from '../../../../assets/images/user.png'
import {useParams} from 'react-router-dom'
import {profileAPI, usersAPI} from "../../../../API/API";
import Loading from "../../../common/screens/Loading";

const User = () => {
    let {id} = useParams()
    let [isLoading, setLoading] = useState(true)
    let [user, setUser] = useState(null)
    let [followed, setFollowed] = useState(false)
    let [followButtonActive, toggleFollowButton] = useState(true)

    useEffect(
        () => {
            fetchUser(id)
        }, []
    )
    useEffect(
        () => {
            fetchFollowing(id)
        }, []
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
                if (r.resultCode == 0) setFollowed(false)
                toggleFollowButton(true)
            }
        ) : usersAPI.follow(id).then(r => {
            if (r.resultCode == 0) setFollowed(true)
            toggleFollowButton(true)
        })
    }

    if (isLoading) return <Loading/>
    return (
        <div className={styles.wrapper}>
            <div className={styles.imageArea}>
                <img alt="Profile" src={user && user.photos.large || userImage}/>
            </div>
            <div className={styles.texts}>
                <div className={styles.name}><h1>{user && user.fullName}</h1></div>
                <div className={styles.bio}>{user && user.aboutMe}</div>
            </div>
            <div className={styles.controls}>
                <Button label={'Send message'}/>
                <Button disabled={!followButtonActive} onClick={toggleFollow}
                        label={followed ? <i className={'fas fa-star'}/> : <i className={'far fa-star'}/>}/>
            </div>
        </div>
    )
}

export default User