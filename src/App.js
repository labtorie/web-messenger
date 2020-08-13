import React, {useEffect, useState} from 'react';
import styles from'./App.module.css';
import {Route, Switch} from "react-router-dom";
import Login from "./components/pages/login/Login";
import Error404 from "./components/pages/404/Error404";
import Content from "./components/content/Content";
import Chat from "./components/pages/chat/Chat";
import {connect} from "react-redux";
import {authAPI} from "./API/API";
import {setAuth} from "./redux/authReducer";
import Loading from "./components/common/screens/Loading";
import Div100vh from 'react-div-100vh'

const App = (props) => {
    let [initialized, setInitialized] = useState(false)

    useEffect(
        () => {
            setInitialized(false)
            Promise.all([fetchAuth()]).then(
                () => {
                    setInitialized(true)
                }
            )
        }, [props.authorized]
    )
    const fetchAuth = () => {
        return authAPI.fetchAuth().then(
            r => {
                props.setAuth({
                    authId: r.data.id,
                    authorized: r.resultCode === 0
                })
            }
        )
    }

    if(!initialized) return <Div100vh className={styles.screen}><Loading/></Div100vh>
    return (
        <div>
            <Switch>
                <Route path={'/login'} render={() => {
                    return <Login/>
                }}/>
                <Route path={'/404'} render={() => {
                    return <Error404/>
                }}/>
                <Route path={'/chat/:id'} render={() => {
                    return <Chat/>
                }}/>
                <Route path={'/'} render={() => {
                    return <Content/>
                }}/>
            </Switch>
        </div>
    );
}

export default connect((state)=>({authorized: state.auth.authorized}), {setAuth})(App);
