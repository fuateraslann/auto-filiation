import FilteredUsersTable from "../components/FilteredUsersTable";
import React from "react";
import {db} from "../firebase/config"
import {FilterUsers} from "../components/FilterUsers";
import Nav from "../components/NavBar";
import * as datas from "../data/mock_data.json";

function FiliationPage() {
    /*function saveDatas(){
        datas.users.map(user=>{
            db.collection("users").doc(user.email).set({
                name: user.first_name,
                surname: user.last_name,
                email: user.email,
                isRisky: false,
                infected: false,
                locations :[],
            })
        })
    }*/
    return (
        <div>
            <header>
                <Nav/>
            </header>
            <div className="section">
                <div className="col-md-9 offset-md-1">
                    <FilterUsers>
                        <div>
                            <div className="row">
                                <div className="col-md-0"/>
                                <div className="col-md-13">
                                    <FilteredUsersTable/>
                                </div>
                            </div>
                        </div>
                    </FilterUsers>
                </div>
            </div>
        </div>


    )
}

export default FiliationPage;
