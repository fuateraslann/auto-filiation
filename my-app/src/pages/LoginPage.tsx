import {auth , db} from "../firebase/config"
import {BrowserRouter as Router ,Link , useHistory } from "react-router-dom";
import "../App.css"
import logo from "../components/logo.png"
import 'materialize-css';
import React, { useEffect, useState } from 'react';
import { Form, Button, Card, Alert, Container } from "react-bootstrap"

// authStateChange
auth.onAuthStateChanged(u=>{
    if(u){
        console.log("logged-in")
    }
    else{
        console.log("logged-out")
    }
})

//nav bar
document.addEventListener("DOMContentLoaded",function (){
    var modals= document.querySelectorAll(".modal");
    // @ts-ignore
    M.Modal.init(modals);
});



export default function LoginPage(){
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    let loginOnClick = (event: React.MouseEvent, email: string, password: string) => {
        event.preventDefault();
        auth.signInWithEmailAndPassword(email, password).then(a => {
            //console.log(a.user);
            history.push("/Command-Panel");
        }).catch(error => {
            alert(error.message);
        });
    };

    return(
        <nav className="z-depth-0 red darken-4">
            <div className="nav-wrapper container">
                <a href="/" className=" brand-logo">
                    <img src={logo} className="logo" alt = "Logo"/>
                </a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li className="logged-in" id="loginButton" >
                        <a href="/" className="black-text modal-trigger" data-target ="modal-login" >Login</a>
                    </li>
                </ul>
                    <div id="modal-login" className="modal"   >
                        <div className="modal-content" >
                            <form id="login-form" >
                                <Form.Group controlId="formEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                </Form.Group>

                                <Button onClick={e => loginOnClick(e, email, password)}>
                                    Login
                                </Button>

                            </form>
                        </div>
                    </div>
            </div>
        </nav>
    )

}
