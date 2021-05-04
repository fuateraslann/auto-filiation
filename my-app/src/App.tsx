import React from 'react';
import './App.css';
import LoginPage from "./LoginPage"
import {BrowserRouter as Router , Switch , Route } from "react-router-dom";
import Users from "./Users";


function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/" exact component={LoginPage}/>
                    <Route path="/Auto-Filiation-Command-Panel" exact component={Users}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
