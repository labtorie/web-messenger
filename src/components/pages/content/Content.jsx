import React from 'react'
import styles from './Content.module.css'
import Header from "../../common/header/Header";
import {Redirect, Route, Switch} from "react-router-dom";
import Menu from "../../common/menu/Menu";
import Dialogs from "../dialogs/Dialogs";
import Users from "../users/people/Users";
import Div100vh from 'react-div-100vh'
import User from "../users/user/User";

const Content =(props) => {
    return (
        <Div100vh>
        <div className={styles.contentGrid}>
            <Header className={styles.header}/>
            <div className={styles.content} id='scroller'>
            <Switch>
                <Route path='/dialogs' render={()=>{return <Dialogs/>}}/>
                <Route path='/users' render={()=>{return <Users/>}}/>
                <Route path='/me' render={()=>{return <h1>me</h1>}}/>
                <Route path='/user/:id' render={()=>{return <User/>}}/>
                <Route exact path='/' render={()=> <Redirect to={'/dialogs'}/>}/>
                <Route path='*' render={()=> <Redirect to={'/404'}/>}/>
            </Switch>
            </div>
            <Menu className={styles.menu}/>
        </div>
        </Div100vh>
    )
}
export default Content