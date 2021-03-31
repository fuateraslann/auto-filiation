import React,{useState, useEffect} from 'react';
import './App.css';
import LoginPage from "./LoginPage"
import ShowLocations from "./ShowLocations";
import {BrowserRouter as Router , Switch , Route ,Link } from "react-router-dom";
import Users from "./Users";
import GetUsers from "./GetUsers";
import HomePage from "./HomePage";


function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path ="/Users" component={GetUsers}/>
                    <Route path="/" exact  component={LoginPage}/>
                    <Route path="/Auto-Filiation-Command-Panel" component={HomePage}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
