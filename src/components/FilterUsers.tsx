import React ,{useState , createContext } from "react";
import "../App.css";
import 'materialize-css';

export const UserContext  = createContext(undefined as any);

export function FilterUsers(props :any){

    const[formInputs , setInputs] = useState({
        name : "",
        surname : "",
        email: "",
        age : "",
    });
    const inputsChanged = (e : any) =>{
        let namePlace =e.target.name;
        let placeValue = e.target.value;

        setInputs({
            ...formInputs,[namePlace]:placeValue
        })
    }
    return(
        <UserContext.Provider value={formInputs} >
            <div className="row">
                <div className="col s6">
                    <h3>Please Write User Info.</h3>
                    <form >
                        <div className="form-group input-group" >
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <i className="fas fa-user"></i>
                                </div>
                            </div>
                            <input className="form-control" onChange={inputsChanged} name ="name" placeholder="Name" />
                        </div>
                        <div className="form-group input-group" >
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <i className="fas fa-user"></i>
                                </div>
                            </div>
                            <input className="form-control" onChange={inputsChanged} name="surname" placeholder="Surname"/>
                        </div>
                        <div className="form-row">
                            <div className="form-group input-group col-md-24" >
                                <div className="input-group-prepend">
                                    <div className="input-group-text">
                                        <i className="fas fa-user"></i>
                                    </div>
                                </div>
                                <input className="form-control"  name ="age" placeholder="Age" />
                                <div className="input-group-prepend">
                                    <div className="input-group-text">
                                        <i className="fas fa-envelope-square"></i>
                                    </div>
                                </div>
                                <input className="form-control"  onChange={inputsChanged} name ="email" placeholder="Mail Address"/>
                            </div>

                        </div>
                    </form>
                </div>
                <div className="col s6 offset-s2">
                    {props.children}
                </div>
            </div>

        </UserContext.Provider>

    )
}