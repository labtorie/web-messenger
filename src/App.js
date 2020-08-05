import React from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";
import Login from "./components/pages/login/Login";
import Error404 from "./components/pages/404/Error404";
import Content from "./components/pages/content/Content";

const App = () => {
    return (
        <div>
            <Switch>
                <Route path={'/login'} render={() => {
                    return <Login/>
                }}/>
                <Route path={'/404'} render={() => {
                    return <Error404/>
                }}/>
                <Route path={'/'} render={() => {
                    return <Content/>
                }}/>
            </Switch>
        </div>
    );
}

export default App;
