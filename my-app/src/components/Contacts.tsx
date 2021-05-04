import React, {useContext} from "react";
import {UserContext} from "./UserContext";
import GetUsers from "../GetUsers";
import Nav from "../NavBar";
import  {UserProvider} from "./UserContext"

export default function Contacts(props: any){

    let formInputs = useContext(UserContext);
   // console.log(formInputs)
    /**let formInputs= {
        name : "",
        surname : "",
        email: "",
        age : undefined,
    }*/

    /*const addProps = (Inputs: any) => {
        formInputs = Inputs;
        console.log(formInputs.name);
        console.log(formInputs.surname)
    }*/
    var renderOrNot = 0;

    return(
            <UserProvider>
                <div>
                    <div className="row">
                        <div className="col-md-0"/>
                        <div className="col-md-7">
                            User List
                            <GetUsers/>
                        </div>
                    </div>
                </div>
            </UserProvider>


    )
}