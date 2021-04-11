import React from "react";

export default function ContactForm(){
    return(
       <form>
           <div className="form-group input-group" >
               <div className="input-group-prepend">
                   <div className="input-group-text">
                       <i className="fas fa-user"></i>
                   </div>
               </div>
               <input className="form-control" placeholder="Name" />
           </div>
           <div className="form-group input-group" >
               <div className="input-group-prepend">
                   <div className="input-group-text">
                       <i className="fas fa-user"></i>
                   </div>
               </div>
               <input className="form-control" placeholder="Surname"/>
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
                   <input className="form-control" placeholder="Mail Address"/>
               </div>

           </div>
           <div className="form-group">
               <input type="submit" value ="Search Users" className="btn btn-success btn-block"/>
           </div>
       </form>
    )
}