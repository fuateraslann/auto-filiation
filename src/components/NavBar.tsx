import {auth } from "../firebase/config"
import React from "react";
import "../App.css"
import logo from "./logo.png"
import 'materialize-css';
import {BrowserRouter as Router, Link ,useHistory} from "react-router-dom";

export default function Nav(){
    const history = useHistory();
    //Sign Out
    function SignOutControl(){
        auth.signOut();
        history.push("/")
        history.go(0)
    }
    function mapRouting(){
        history.push("/Map")
    }
    return(
        <nav className="z-depth-0 red darken-4">
            <div className="nav-wrapper container">
                <a href="/" className=" brand-logo">
                    <img src={logo} className="logo" alt = "Logo"/>
                </a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li className="logged-out" id="UsersButton">
                        <Router>
                            <Link to ="/Users"
                                  className="black-text"
                                  onClick={mapRouting}
                            >Map</Link>
                        </Router>
                    </li>
                    <li className="logged-out" id="SignOutButton">
                        <Router>
                            <Link to ="/"
                                  className="black-text"
                                  onClick={SignOutControl}
                            >Sign Out</Link>
                        </Router>
                    </li>
                </ul>
            </div>
        </nav>)
}