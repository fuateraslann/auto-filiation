import React from "react";
import ContactForm from "./ContactForm";
import GetUsers from "../GetUsers";

export default function Contacts(props: any){
    let formInputs= {
        name : "",
        surname : "",
        email: "",
        age : undefined,
    }

    const addProps = (Inputs: any) => {
        formInputs = Inputs;
        //console.log(formInputs.name)
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
                    <ContactForm getInputs ={(e:any)=>{addProps(e)}}/>
                </div>
                <div className="col-md-7">
                    User List
                    <GetUsers Inputs = {formInputs}/>

                 </div>
            </div>
        </div>
    )
}