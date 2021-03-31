import {auth , db} from "./firebase/config"
import Users from "./Users"
import React from "react";
import "./App.css"
import logo from  "./logo.png"

// authStateChange
auth.onAuthStateChanged(u=>{
    if(u){
        console.log("logged-in")
        userLoggedIn(u)
    }
    else{
        console.log("logged-out")
        // @ts-ignore
        userLoggedIn();
    }
})

// @ts-ignore
const userLoggedIn =(e)=>{
    if(e){
        // @ts-ignore
        document.getElementById("SignOutButton").style.display="block"
        // @ts-ignore
        document.getElementById("loginButton").style.display="none"
        // @ts-ignore
        document.getElementById("UsersButton").style.display="block"
    }else{
        // @ts-ignore
        document.getElementById("SignOutButton").style.display="none"
        // @ts-ignore
        document.getElementById("loginButton").style.display="block"
        // @ts-ignore
        document.getElementById("UsersButton").style.display="none"
    }
}

//nav bar
document.addEventListener("DOMContentLoaded",function (){
    var modals= document.querySelectorAll(".modal");
    // @ts-ignore
    M.Modal.init(modals);
});

// login
const loginForm = document.querySelector("#login-form");
// @ts-ignore
loginForm.addEventListener("submit" ,(e) => {
    e.preventDefault();
    // @ts-ignore
    const mail = loginForm["login-email"].value;// @ts-ignore
    const password = loginForm["login-password"].value;
    db.collection("Admins").get().then((e) => {
        e.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshot
            if(mail === doc.data().email){
                auth.signInWithEmailAndPassword(mail,password).then(admin=>{
                    console.log(admin);
                    const loginModal = document.querySelector("#modal-login");
                    // @ts-ignore
                    M.Modal.getInstance(loginModal).close();
                    // @ts-ignore
                    loginForm.reset();
                })
            }
        });
    });
})

//Sign Out
const SignOut= document.querySelector("#SignOutButton");
// @ts-ignore
SignOut.addEventListener("click", (e) =>{
    e.preventDefault();
    auth.signOut();
})


const UsersButton = document.querySelector("#UsersButton");
// @ts-ignore
UsersButton.addEventListener("click",(e => {
    e.preventDefault();
    console.log("a")
}))

export default function Nav(){
    return(
            <nav className="z-depth-0 red darken-4">
                <div className="nav-wrapper container">
                    <a href="#" className=" brand-logo">
                        <img src={logo} className="logo" alt = "Logo"/>
                    </a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li className="logged-out" id="UsersButton" >
                            <a href="#" className="UsersButtonCss">Users</a>
                        </li>
                        <li className="logged-out" id="SignOutButton" >
                            <a href="#" className="UsersButtonCss ">Sign Out</a>
                        </li>
                        <li className="logged-in" id="loginButton" >
                            <a href="#" className="UsersButtonCss" data-target="modal-login">Login</a>
                        </li>
                    </ul>
                </div>
            </nav>
    )
}
