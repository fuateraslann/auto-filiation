import React,{useState, useEffect} from 'react';
import './App.css';
import Note from "./Note"
import Register from "./Register";
import ShowLocations from "./ShowLocations";

function App() {
    const [CovidCasesNumber,increaseCasesNumber]= useState(0);/*default number 5 */
    const [text]= useState({text:"Covid Cases Number"});
    const [CovidCasesNumberStyle,setStyle]= useState("case"+0);
    const increaseCovidCase=()=>{
        increaseCasesNumber(CovidCasesNumber+2);
    }
    useEffect(()=>{
        setStyle("case"+CovidCasesNumber);
    },[CovidCasesNumber])//sadece case sayısı değiştiğinde tetiklenecek.
    return (
     <div className="app">
         <h3 className ={CovidCasesNumberStyle}>{CovidCasesNumber}</h3>
         <p>{text.text}</p>
         <button onClick={increaseCovidCase}>Increase Case</button>
         <Register/>
         <Note Name="Daily Covid Cases" number={CovidCasesNumber} Date =" 1 january"  />
         <Note Name = " Istanbul " number={CovidCasesNumber} Date/>
         <Note Name ="Ankara" number={CovidCasesNumber} Date />

     </div>
    );
}


export default App;
