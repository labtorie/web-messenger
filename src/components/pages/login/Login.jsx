import React from 'react'
import styles from './Login.module.css'
import Input from "../../common/controls/Input";
import {H1} from "../../common/labels/labels";
import Button from "../../common/controls/Button";

const Login = (props) => {
    return <div className={styles.wrapper}>
        <div className={styles.fields}>
            <H1 text = {`Sign In`}/>
            <Input type='email' placeholder='Email'/>
            <Input type='password' placeholder='Password'/>
            <center><Button label={'Sign In'}   /></center>
        </div>
    </div>
}

export default Login