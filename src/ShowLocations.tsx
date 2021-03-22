import React from "react";
import {db} from "./firebase/config"
import "./App.css"
import "firebase/firestore"
import "firebase/auth"

// @ts-ignore
export default function ShowLocations() {
    db.collection("Locations").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshot
            console.log(doc.id, " => ", doc.data());
        });
    });
    return(<div>AA</div>)
}



