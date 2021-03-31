import React, {useEffect, useState} from "react"
import "./App.css"
import Register from "./Register";

export default function Note({Name,Date,number}: {Name: any, Date: any , number: number}  ) {
    const [CovidCasesNumber,increaseCasesNumber]= useState(0);/*default number 5 */
    const [text]= useState({text:"Covid Cases Number"});
    const [CovidCasesNumberStyle,setStyle]= useState("case"+0);
    const increaseCovidCase=()=>{
        increaseCasesNumber(CovidCasesNumber+2);
    }
    useEffect(()=>{
        setStyle("case"+CovidCasesNumber);
    },[CovidCasesNumber])//sadece case sayısı değiştiğinde tetiklenecek.
    return ( <div className="app">
        <h3 className ={CovidCasesNumberStyle}>{CovidCasesNumber}</h3>
        <p>{text.text}</p>
        <button onClick={increaseCovidCase}>Increase Case</button>
        <Register/>
        <Note Name="Daily Covid Cases" number={CovidCasesNumber} Date =" 1 january"  />
        <Note Name = " Istanbul " number={CovidCasesNumber} Date/>
        <Note Name ="Ankara" number={CovidCasesNumber} Date />

    </div>)
    return (
        <div className="note">
            <h3> {Name}</h3>
            <p> {number}</p>
            <hr/>
            <p>{Date}</p>
        </div>
    )
}