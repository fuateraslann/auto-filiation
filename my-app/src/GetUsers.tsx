import React, {useContext, useEffect, useState } from 'react';
import {db} from "./firebase/config"
import {UserContext, UserProvider} from "./components/UserContext";


// @ts-ignore
export default function GetUsers(){

    let formInputs = useContext(UserContext);
    // @ts-ignore
    console.log(formInputs.name)
    const [UsersInfo ,setUsersInfo] = useState( 0);
    useEffect(()=>{
        db.collection("Users").get().then((querySnapshot) => {
            // @ts-ignore
            const usersData: any = [];
            querySnapshot.forEach((doc) => {
                usersData.push({...doc.data(), id : doc.id})
                // doc.data() is never undefined for query doc snapshot
                // @ts-ignore
            });
            // @ts-ignore
            setUsersInfo(usersData)
        });
    },[])
    console.log(UsersInfo)

    let ids: any = [];
    ids =Object.keys(UsersInfo).filter(id=>
        // @ts-ignore
        UsersInfo[id].email === formInputs.email ||
        // @ts-ignore
        UsersInfo[id].name === formInputs.name ||
        // @ts-ignore
        UsersInfo[id].surname === formInputs.surname

    )

    return(
            <table>
                <thead>
                {ids.map((id: string | number) => {
                    return <tr >
                        <td > {// @ts-ignore
                            UsersInfo[id].email}</td>
                        <td>{// @ts-ignore
                            UsersInfo[id].name}</td>
                        <td>{// @ts-ignore
                            UsersInfo[id].surname}</td>
                    </tr>
                })}
                </thead>
            </table>

    )
}