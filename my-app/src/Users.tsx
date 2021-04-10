import React from "react";
import {BrowserRouter as Router , Switch , Route } from "react-router-dom";
import GetUsers from "./GetUsers"
import Contacts from "./components/Contacts"

export default function Users() {
    return (
        <div className="row">
            <div className="col-md-8 offset-md-1">
                <Contacts/>
            </div>
            <Router>
                <Switch>
                    <Route path ="/Users" component={GetUsers}/>
                </Switch>
            </Router>
        </div>

    )
}