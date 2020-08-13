import React, {useEffect, useState} from 'react'
import styles from './Me.module.css'
import {authAPI, profileAPI, usersAPI} from "../../../../../API/API";
import {connect} from "react-redux";
import NoPicture from "../../../../../assets/images/NoPicture";
import Button from "../../../../common/controls/Button";
import WithHeader from "../../../../withHeader/WithHeader";
import Loading from "../../../../common/screens/Loading";
import {setAuth} from "../../../../../redux/authReducer";

const Field = (props) => {
    return (
        <div className={styles.fieldWrapper}>
            <div className={styles.fieldTitle}>{props.title}</div>
            <div className={styles.inputContainer}>
                <input type='text' onChange={props.onChange} value={props.value}/>
            </div>
        </div>
    )
}

const Me = (props) => {
    let [user, setUser] = useState(null)
    let [isLoading, setLoading] = useState(true)
    let [logOutPending, setLogOutPending] = useState(false)
    let [unsavedUser, setUnsavedUser] = useState(null)

    useEffect(
        () => {
            fetchUser(props.id)
        }, []
    )

    const fetchUser = (id) => {
        setLoading(true)
        profileAPI.fetchProfile(id).then(
            (r) => {
                setUser(r)
                setUnsavedUser(r)
                setLoading(false)
            }
        )
    }

    const onNameChange = (e) => {
        setUnsavedUser({...unsavedUser, fullName: e.target.value})
    }
    const onBioChange = (e) => {
        setUnsavedUser({...unsavedUser, aboutMe: e.target.value})
    }

    const saveChanges = () => {
        profileAPI.updateProfileInfo(unsavedUser.fullName, unsavedUser.aboutMe).then(
            response => {
                fetchUser(props.id)
            }
        )
    }

    const logOut = () => {
        setLogOutPending(true)
        authAPI.logOut().then(
            r => {
                if (Number(r.resultCode) === 0) {
                    props.setAuth({authorized: false, authId: null})
                    setLogOutPending(false)
                } else console.log(r)
            }
        )
    }

    const setProfilePicture = (e) => {
        if (e.target.files && e.target.files.length) {
            uploadProfilePicture(e.target.files[0]);
        }
    }

    const uploadProfilePicture = (photo) => {
        setLoading(true)
        profileAPI.uploadProfilePicture(photo).then(
            (r) => {
                fetchUser(props.id)
                console.log(r)
            }
        )
    }

    if (isLoading) return <Loading/>
    return (
        <WithHeader headerTitle={'Profile'}>
            <div className={styles.wrapper}>
                <div className={styles.imageArea}>
                    {user && user.photos.large
                        ?
                        <img src={user.photos.large} alt={'Profile'}/>
                        :
                        <div className={styles.noPic}><NoPicture id={props.id} name={user.fullName} large/></div>
                    }
                    <div className={styles.uploadArea}>
                        <div className={styles.uploadBackground}>
                            <label className={styles.fakeInput}>
                               <i className="fas fa-camera"> </i>
                            <input type={"file"} accept="image/jpeg,image/png" style={{visibility: 'hidden'}} onChange={setProfilePicture}/>

                            </label>
                        </div>
                    </div>
                </div>
                <div className={styles.fields}>
                    <Field title={'Your displayed name:'} value={unsavedUser.fullName} onChange={onNameChange}/>
                    <Field title={'Something about you:'} value={unsavedUser.aboutMe} onChange={onBioChange}/>
                </div>
                <div className={styles.controls}>
                    <Button color={'#4378a8'}
                            label={'Save'}
                            onClick={saveChanges}
                            disabled={user.fullName === unsavedUser.fullName
                            &&
                            user.aboutMe === unsavedUser.aboutMe}/>
                    <Button color={'#f55353'}
                            label={'Log out'}
                            onClick={logOut}
                            disabled={logOutPending}/>
                </div>
            </div>
        </WithHeader>
    )
}

export default connect((state) => ({id: state.auth.authId}), {setAuth})(Me)