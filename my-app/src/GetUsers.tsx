import React,{useEffect,useState}from 'react';
import {db} from "./firebase/config"



// @ts-ignore
export default function GetUsers({Inputs}){
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
    console.log(Inputs.name)
    let ids: any = [];
    ids =Object.keys(UsersInfo).filter(id=>
            // @ts-ignore
            UsersInfo[id].email ===Inputs.email ||// @ts-ignore
            UsersInfo[id].name ===Inputs.name ||// @ts-ignore
            UsersInfo[id].surname ===Inputs.surname
    )

    return(
            <table>
                <thead>
                {ids.map((id: string | number) => {
                    return <tr >
                        <td>{// @ts-ignore
                            UsersInfo[id].email}</td>
                        <td>{Inputs.name}</td>
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