import React, {useState} from 'react'
import styles from './Login.module.css'
import Input from "../../common/controls/Input";
import {H1} from "../../common/labels/labels";
import Button from "../../common/controls/Button";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {authAPI} from "../../../API/API";
import {setAuth} from "../../../redux/authReducer";

const Login = (props) => {

    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [isPending, setPending] = useState(false)

    const onEmailChange = (e) => setEmail(e.target.value)
    const onPasswordChange = (e) => setPassword(e.target.value)
    const submitLogIn = () => {
        setPending(true)
        authAPI.logIn(email, password).then(
            (r) => {
                if (r.resultCode === 0) {
                    props.setAuth({
                        authId: null,
                        authorized: true
                    })
                    setPending(false)
                } else {
                    alert(`error: ${r.messages}`)
                    setPending(false)
                }

            }
        )
    }


    if (props.authorized) return <Redirect to={'/dialogs'}/>

    return <div className={styles.wrapper}>
        <div className={styles.fields}>
            <H1 text={`Sign In`}/>
            <Input type='email' placeholder='Email' onChange={onEmailChange} value={email}/>
            <Input type='password' placeholder='Password' onChange={onPasswordChange} value={password}/>
            <div style={{textAlign: 'center'}}><Button label={'Sign In'} onClick={submitLogIn} disabled={isPending}/>
            </div>
        </div>
    </div>
}

const mapStateToProps = (state) => ({
    authorized: state.auth.authorized
})

export default connect(mapStateToProps, {setAuth})(Login)