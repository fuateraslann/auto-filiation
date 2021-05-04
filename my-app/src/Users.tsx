import React from "react";
import {BrowserRouter as Router , Switch , Route } from "react-router-dom";
import Nav from "./NavBar";
import Contacts from "./components/Contacts"

export default function Users() {
    return (

        <body className="z-depth-0 #fafafa grey lighten-5">
        <header>
            <Nav/>
        </header>
        <div className="section">
            <div className="col-md-8 offset-md-1">
                <Router>
                    <Switch>
                        <Route path ="/Auto-Filiation-Command-Panel" component={Contacts}/>
                    </Switch>
                </Router>
            </div>
        </div>
        </body>

    )
}