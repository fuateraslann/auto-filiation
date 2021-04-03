import React from "react";
import {BrowserRouter as Router , Switch , Route } from "react-router-dom";
import GetUsers from "./GetUsers"


export default function Users() {
    return (
        <Router>
          <div>
            <Switch>
                <Route path ="/Users" component={GetUsers}/>
            </Switch>
          </div>
        </Router>
    )
}