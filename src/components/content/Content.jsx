import React from 'react'
import styles from './Content.module.css'
import {Redirect, Route, Switch} from "react-router-dom"
import Menu from "../common/menu/Menu";
import Dialogs from "../pages/dialogs/Dialogs"
import People from "../pages/users/people/People"
import Div100vh from 'react-div-100vh'
import User from "../pages/users/user/User"
import {connect} from "react-redux"
import Me from "../pages/users/user/me/Me"

const Content = (props) => {
    if (!props.authorized) return <Redirect to={'/login'}/>
    return (
        <Div100vh>
            <div className={styles.contentGrid}>

                <div className={styles.content} id='scroller'>
                    <Switch>
                        <Route path='/dialogs' render={() => {
                            return <Dialogs/>
                        }}/>
                        <Route path='/users' render={() => {
                            return <People/>
                        }}/>
                        <Route path='/me' render={() => {
                            return <Me/>
                        }}/>
                        <Route path='/user/:id' render={() => {
                            return <User/>
                        }}/>
                        <Route exact path='/' render={() => <Redirect to={'/dialogs'}/>}/>
                        <Route path='*' render={() => <Redirect to={'/404'}/>}/>
                    </Switch>

                </div>
                <Menu className={styles.menu}/>
            </div>
        </Div100vh>
    )
}

const mapStateToProps = (state) => ({
    authorized: state.auth.authorized
})
export default connect(mapStateToProps, {})(Content)
