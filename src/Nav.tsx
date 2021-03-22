import React from "react";
import "./App.css"
import {BrowserRouter as Router} from "react-router-dom"
import {Link} from "react-router-dom"
export default function Nav() {

    return(
       <Router>
           <div>
               <ul className="nav" >
                   <h3>About </h3>
                   <ul>
                       <Link to = "/register">Register</Link>
                   </ul>
               </ul>
           </div>
       </Router>

    )


}