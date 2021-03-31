import {auth , db} from "./firebase/config"
import React, {Component} from "react";
import "./App.css"
import logo from  "./logo.png"
import 'materialize-css';

export default function HomePage(){

    //Sign Out
    function SignOutControl(){
        console.log("a")
        // @ts-ignore
        auth.signOut();
    }
    return(
        <nav className="z-depth-0 red darken-4">
            <div className="nav-wrapper container">
                <a href="#" className=" brand-logo">
                    <img src={logo} className="logo" alt = "Logo"/>
                </a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li className="logged-out" id="UsersButton">
                            <a href="#" className=" black-text " >Users</a>
                        </li>
                        <li className="logged-out" id="SignOutButton">
                            <a href="#" className=" black-text " onClick={SignOutControl}>Sign Out</a>
                        </li>
                </ul>
            </div>
        </nav>)
}