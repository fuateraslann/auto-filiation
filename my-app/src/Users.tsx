import React,{useEffect,useState}from 'react';
import {db} from "./firebase/config"
//import firebaseDB from "./firebase/config"

/*const Users = document.querySelector("#UsersButton");

// @ts-ignore
Users.addEventListener("click",(e => {
    e.preventDefault();

}))*/

export default function Users(){
    const [UsersInfo,setUsersInfo] = useState({
        email : "",

    });
    /*db.collection("Users").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshot
            console.log(doc.id, " => ", doc.data());
        });
    });*/
    useEffect(()=>{
        /*firebaseDB.child("Users").on("value",snapshot=>{
            if(snapshot.val() != null){
                setUsersInfo({
                    ...snapshot.val()
                })
                console.log(snapshot.val());
            }
        })*/
        db.collection("Users").get().then((querySnapshot) => {
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

        </div>
    )

}