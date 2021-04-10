import React,{useEffect,useState}from 'react';
import {db} from "./firebase/config"



export default function GetUsers(){
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
    return(
            <table>
                <thead>
                {Object.keys(UsersInfo).map(id=>{
                    return <tr >
                        <td>{// @ts-ignore
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