import React from "react"
import "./App.css"

export default function Note({Name,Date,number}: {Name: any, Date: any , number: number}  ) {
    return (
        <div className="note">
            <h3> {Name}</h3>
            <p> {number}</p>
            <hr/>
            <p>{Date}</p>
        </div>
    )
}