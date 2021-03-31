import React,{useEffect,useState}from 'react';
import {db} from "./firebase/config"
//import firebaseDB from "./firebase/config"


export default function GetUsers(){
    const [UsersInfo,setUsersInfo] = useState({
        email : "",
    });
    /*db.collection("GetUsers").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshot
            console.log(doc.id, " => ", doc.data());
        });
    });*/
    useEffect(()=>{
        /*firebaseDB.child("GetUsers").on("value",snapshot=>{
            if(snapshot.val() != null){
                setUsersInfo({
                    ...snapshot.val()
                })
                console.log(snapshot.val());
            }
        })*/
        db.collection("Admins").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshot
                setUsersInfo({
                    email: doc.data().email
                })
            });
        });
    })

    return(
        <div>
            <table>
                <thead>
                {Object.keys(UsersInfo).map(id=>{
                    return <tr key= {id}>
                        <td>{UsersInfo.email}</td>
                    </tr>
                })}
                </thead>
            </table>
        </div>
    )

}