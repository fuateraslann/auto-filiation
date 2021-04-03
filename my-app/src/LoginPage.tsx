import {auth , db} from "./firebase/config"
import {BrowserRouter as Router ,Link , useHistory } from "react-router-dom";
import React from "react";
import "./App.css"
import logo from  "./logo.png"
import 'materialize-css';


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
      //  document.getElementById("SignOutButton").style.display="block"
        // @ts-ignore
       // document.getElementById("loginButton").style.display="none"
        // @ts-ignore
       // document.getElementById("UsersButton").style.display="block"
    }else{
        // @ts-ignore
      //  document.getElementById("SignOutButton").style.display="none"
        // @ts-ignore
      //  document.getElementById("loginButton").style.display="block"
        // @ts-ignore
      //  document.getElementById("UsersButton").style.display="none"
    }
}

//nav bar
document.addEventListener("DOMContentLoaded",function (){
    var modals= document.querySelectorAll(".modal");
    // @ts-ignore
    M.Modal.init(modals);
});

// login
/*const loginForm = document.querySelector("#login-form");
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
})*/

//Sign Out
/*const SignOut= document.querySelector("#SignOutButton");
// @ts-ignore
SignOut.addEventListener("click", (e) =>{
    e.preventDefault();
    auth.signOut();
})*/


/*const UsersButton = document.querySelector("#UsersButton");
// @ts-ignore
UsersButton.addEventListener("click",(e => {
    e.preventDefault();
    console.log("a")
}))*/

export default function LoginPage(){
    const history = useHistory();
    function Mailcontrol(){
        const loginForm = document.querySelector("#login-form");
        // @ts-ignore
        const mail = loginForm["login-email"].value;// @ts-ignore
        const password = loginForm["login-password"].value;
        db.collection("Admins").get().then((e) => {
            e.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshot
                const loginModal = document.querySelector("#modal-login");
                // @ts-ignore
                if(mail === doc.data().email){ M.Modal.getInstance(loginModal).close();
                    auth.signInWithEmailAndPassword(mail,password).then(admin=>{
                        console.log(admin);
                        // @ts-ignore
                        loginForm.reset();
                        history.push("/Auto-Filiation-Command-Panel")
                    })

                }
            });

        });
    }
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
                                <div className="input-field">
                                    <input type="email" id="login-email" required/>
                                    <label htmlFor="login-email">Email</label>
                                </div>
                                <div className="input-field">
                                    <input type="password" id="login-password" required/>
                                    <label htmlFor="login-password">Password</label>
                                </div>
                                <Router>
                                    <Link to ="/Auto-Filiation-Command-Panel"
                                          className="btn red darken-1"
                                          onClick={Mailcontrol}
                                          data-dismiss="modal-login"
                                    >Login</Link>
                                </Router>
                            </form>
                        </div>
                    </div>

            </div>
        </nav>)

}
