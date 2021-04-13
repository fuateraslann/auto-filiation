import React from "react";
import {BrowserRouter as Router , Switch , Route } from "react-router-dom";
import GetUsers from "./GetUsers"
import Contacts from "./components/Contacts"

export default function Users() {
    return (
        <body className="z-depth-0 #fafafa grey lighten-5">
        <div className="row">
            <div className="col-md-8 offset-md-1">
                <Router>
                    <Switch>
                        <Route path ="/Users" component={GetUsers}/>
                    </Switch>
                </Router>
            </div>
        </div>
        </body>

    )
}