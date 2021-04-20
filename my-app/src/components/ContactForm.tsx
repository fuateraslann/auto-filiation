import React ,{useState , useEffect} from "react";

export default function ContactForm(props :any){
    const formInputs= {
        name : "",
        surname : "",
        email: "",
    }
    const[Inputs , setInputs] = useState(formInputs);
    const inputsChanged = (e : any) =>{
        var namePlace =e.target.name;
        var placeValue = e.target.value;

        setInputs({  // @ts-ignore
            ...Inputs,[namePlace]:placeValue
        })
    }
    const SaveInputs = (e: { preventDefault: () => void; }) =>{
        e.preventDefault();
        console.log(Inputs);
    }
    return(
       <form onSubmit={SaveInputs}>
           <div className="form-group input-group" >
               <div className="input-group-prepend">
                   <div className="input-group-text">
                       <i className="fas fa-user"></i>
                   </div>
               </div>
               <input className="form-control" onChange={inputsChanged} name ="name" placeholder="Name" />
           </div>
           <div className="form-group input-group" >
               <div className="input-group-prepend">
                   <div className="input-group-text">
                       <i className="fas fa-user"></i>
                   </div>
               </div>
               <input className="form-control" onChange={inputsChanged}  name="surname" placeholder="Surname"/>
           </div>
           <div className="form-row">
               <div className="form-group input-group col-md-24" >
                   <div className="input-group-prepend">
                       <div className="input-group-text">
                           <i className="fas fa-user"></i>
                       </div>
                   </div>
                   <input className="form-control" placeholder="Age" />
                   <div className="input-group-prepend">
                       <div className="input-group-text">
                           <i className="fas fa-envelope-square"></i>
                       </div>
                   </div>
                   <input className="form-control" onChange={inputsChanged}  name ="email" placeholder="Mail Address"/>
               </div>

           </div>
           <div className="form-group">
               <input type="submit" value ="Search Users" className="btn btn-success btn-block"/>
           </div>
       </form>
    )
}