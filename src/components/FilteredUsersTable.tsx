import React, {createContext, useContext, useEffect, useState} from 'react';
import {db} from "../firebase/config"
import {UserContext} from "./FilterUsers";
import FindContacts from "./ContactsTable";
import 'materialize-css';
import {User} from "../classes/User";
import {Button, Table} from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css";

export default function FilteredUsersTable() {

    let formInputs = useContext(UserContext);

    const [users, setUsers] = useState(Array<User>());
    useEffect(() => {
        const userSnap = db.collection("Users").withConverter(User.userConverter).get();

        userSnap.then((querySnapshot) => {
            let userArr = Array<User>();
            querySnapshot.forEach((doc) => {
                const user =  doc.data();
                userArr.push(user);
            });
            setUsers(userArr);

        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }, []);
    

    const [indexes, setIndexes] = useState(Array<number>());
    useEffect(() => {
        let indexArr = Array<number>();
        users.forEach(u => {
            if (u.getName() === formInputs.name || u.getSurname() === formInputs.surname || u.getEmail() === formInputs.email) {
                if(formInputs.surname ==="")
                    indexArr.push(users.indexOf(u));
                else
                    if(u.getSurname() === formInputs.surname)
                        indexArr.push(users.indexOf(u));
            }
        });

        setIndexes(indexArr);
    }, [formInputs]);

    const [ourUser, setOurUser] = useState(new User("","","","",false));

    let saveUser = (index: number) => {
        setOurUser(users[index]);
    }
    const [day, setDay] = useState(2);
    const getDay = (e : any) => {
        let dayValue = e.target.value;
        setDay(dayValue);

    };
    return(
        <div>
            <div>
                <h3>User List</h3>
                <table id="UserTable">
                    <thead>
                        <tr >
                            <th scope = "col">E-mail</th>
                            <th scope = "col">Name</th>
                            <th scope = "col">Surname</th>
                            <th scope = "col">Past Number of Day</th>
                        </tr>
                    </thead>
                    <tbody>
                    {indexes.map((i, rowIndex) => {
                        return <tr>
                            <td> {
                                users[i].getEmail()}</td>
                            <td>{
                                users[i].getName()}</td>
                            <td>{
                                users[i].getSurname()}
                            </td>
                            <td>
                                <input className="form-control"  onChange={getDay} name ="day" placeholder="day" />
                            </td>
                            <td>
                                <Button onClick={() => saveUser(i) }> Find Contacts </Button>
                            </td>
                        </tr>
                    
                    })}

                    </tbody>
                </table>
            </div>

            <FindContacts mUser={ourUser} allUsers ={users} mDay = {day}/>
        </div>
    )
}