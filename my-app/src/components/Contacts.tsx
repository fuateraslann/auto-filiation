import React from "react";
import ContactForm from "./ContactForm";
import GetUsers from "../GetUsers";

export default function Contacts(){
    const addProps = (Inputs: any) => {
        console.log(Inputs)
    }
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
                    <ContactForm getInputs ={addProps}/>
                </div>
                <div className="col-md-7">
                    User List
                    <GetUsers/>
                </div>
            </div>
        </div>
    )
}