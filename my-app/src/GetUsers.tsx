import React, {useContext, useEffect, useState } from 'react';
import {db} from "./firebase/config"
import {UserContext, UserProvider} from "./components/UserContext";
import FindContacts from "./FindContacts";
import 'materialize-css';

// @ts-ignore
export default function GetUsers() {

    let formInputs = useContext(UserContext);

    const [UsersInfo ,setUsersInfo] = useState( []);
    useEffect( ()=>{
        db.collection("Users").get().then((querySnapshot) => {
            // @ts-ignore
            const usersData: any = [];
            querySnapshot.forEach((doc) => {
                usersData.push({...doc.data(), id : doc.id})
                // doc.data() is never undefined for query doc snapshot
                // @ts-ignore
            });
            // @ts-ignore
            setUsersInfo(usersData);

        });
    },[])

    const [ids ,setIds] = useState([]);
    useEffect (() =>{
        let x: any = [];
        x =Object.keys(UsersInfo).filter(id=>
            // @ts-ignore
            UsersInfo[id].email === formInputs.email ||
            // @ts-ignore
            UsersInfo[id].name === formInputs.name ||
            // @ts-ignore
            UsersInfo[id].surname === formInputs.surname
        )
        setIds(x)
    },[formInputs])
    const[ourUser ,setOurUser] = useState([])

    const userSave=()=>{
        ids.forEach((id: any) => {
            setOurUser(UsersInfo[id])
        })

    }

    //console.log(calculateDistance(location1,location2))
    //calculateDistance(location1,location2)
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
                    {ids.map((id: string | number) => {
                        return <tr >
                            <td>
                                {// @ts-ignore
                                UsersInfo[id].email}</td>
                            <td>{// @ts-ignore
                                UsersInfo[id].name}</td>
                            <td>{// @ts-ignore
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