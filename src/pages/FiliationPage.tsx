import FilteredUsersTable from "../components/FilteredUsersTable";
import React from "react";
import {FilterUsers} from "../components/FilterUsers";
import Nav from "../components/NavBar";

function FiliationPage() {

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
