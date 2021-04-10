import React from 'react';
import './App.css';
import LoginPage from "./LoginPage"
import {BrowserRouter as Router , Switch , Route } from "react-router-dom";
import GetUsers from "./GetUsers";
import Users from "./Users";
import HomePage from "./HomePage";


function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path ="/Users" component={Users}/>
                    <Route path="/" exact component={LoginPage}/>
                    <Route path="/Auto-Filiation-Command-Panel" exact component={HomePage}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
