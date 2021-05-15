import React, {useContext, useEffect, useState } from 'react';
import {db} from "./firebase/config"
import {UserContext, UserProvider} from "./components/UserContext";
import FindContacts from "./FindContacts";
import 'materialize-css';
import {UserClass} from "./classes/UserClass";

// @ts-ignore
export default function GetUsers() {

    let formInputs = useContext(UserContext);

    const [UsersInfo ,setUsersInfo] = useState( Array<UserClass>());
    useEffect( ()=>{
        const userSnap = db.collection("Users").withConverter(UserClass.userConverter).get();

        userSnap.then((querySnapshot) => {
            let userArr = Array<UserClass>();
            querySnapshot.forEach((doc) => {
                const user = doc.data();
                userArr.push(user);
            });
            setUsersInfo(userArr);

        }).catch((error) => {
            console.log("Error getting document:", error);
        });

    },[])

    const [indexes, setIndexes] = useState(Array<number>());
    useEffect(() => {
        let indexArr = Array<number>();
        UsersInfo.forEach(u => {
            if (u.getName() === formInputs.name || u.getSurname() === formInputs.surname || u.getEmail() === formInputs.email) {
                indexArr.push(UsersInfo.indexOf(u));
            }
        });

        setIndexes(indexArr);
    }, [formInputs]);

    const[ourUser ,setOurUser] = useState([])

    const userSave=()=>{
        indexes.forEach((id: any) => {// @ts-ignore
            setOurUser(UsersInfo[id])
        })

    }
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
                        </tr>
                    </thead>
                    <thead>
                    {indexes.map((id: string | number) => {
                        return <tr >
                            <td>
                                {
                                UsersInfo[id].email}</td>
                            <td>{
                                UsersInfo[id].name}</td>
                            <td>{
                                UsersInfo[id].surname}</td>
                        </tr>
                    })}
                    </thead>
                </table>
            </div>
            <button onClick={userSave}> Find Contacts</button>
            <FindContacts User={ourUser} UsersInfo ={UsersInfo}/>
        </div>
    )
}