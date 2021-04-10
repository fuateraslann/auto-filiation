import React from "react";
import ContactForm from "./ContactForm";

export default function Contacts(){
    return(
        <div>
            <div className="jumbotron">
                <div className="container">
                    <h1 className="display-5">
                        User Page
                    </h1>
                </div>

            </div>
            <div className="row">
                <div className="col-md-5">
                    <ContactForm/>
                </div>
                <div className="col-md-7">
                    User List
                </div>
            </div>
        </div>
    )
}