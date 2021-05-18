import {UserLocation} from "./classes/UserLocation";
import React, { useEffect, useState } from 'react';
import {UserClass} from "./classes/UserClass";
import {db} from "./firebase/config"
const degsToRads = (deg: number) => (deg * Math.PI) / 180.0;
const EARTH_RADIUS = 6371000; //in meters
export default function FindContacts({User ,UsersInfo  }: any  ) {
    var [ourUser , setUser] =useState([])
    var[ourUsersData , setOurUsersData] =useState(Array<UserClass>())
    var [ContactUsersInfo , setContactUsersInfo] =useState([])

    useEffect(()=>{
        setOurUsersData(UsersInfo)
        setUser(User)
    },[UsersInfo ,User])

    const [userLocations , setUserLocations] = useState(Array<UserLocation>())
    const locationData: any = [];
    useEffect(()=>{
        if(ourUser.length !=0 ){
            var i , j ,k ; // @ts-ignore
            for( i=0 ; i< ourUser.locations.length ; i++) {// @ts-ignore
                let location1 = new UserLocation(ourUser.locations[i]);
                locationData.push(location1);
            }
            setUserLocations(locationData);
        }
    },[ourUser])
    const contactsArr: any = [];
    useEffect(()=>{
        if(ourUsersData.length !=0 ){
            var i , j ,k ;  // @ts-ignore
            let user= new UserClass(ourUser.name, ourUser.surname, ourUser.email, ourUser.birthday, ourUser.chronicDisease);
            for(j=0 ; j< ourUsersData.length ; j++){
                let user2= new UserClass(ourUsersData[j].getName(),ourUsersData[j].getSurname(),ourUsersData[j].getEmail(),ourUsersData[j].getBirthdate(),ourUsersData[j].getChronicDisease());
                if(user.getEmail()!=user2.getEmail()){
                    for(i = 0 ; i<locationData.length ; i++){
                        for(k=0 ; k<ourUsersData[j].getLocations().length ; k++){
                            let location2 = new UserLocation(ourUsersData[j].getLocations()[k]);
                            if(locationData.length!= 0){
                                var distance = calculateDistance(locationData[i] , location2);
                                var isTimeViolated = calculateTimeInterval(locationData[i],location2);
                                if(distance<2 && isTimeViolated){
                                    contactsArr.push(ourUsersData[j])
                                    i=locationData.length;
                                    break;
                                }
                            }
                        }
                    }
                }
            }
            setContactUsersInfo(contactsArr)
        }
    },[ourUsersData ,ourUser])
    function markRisky(ContactUsersInfo :any){
            // A post entry.
        var frankDocRef = db.collection("User").doc("Tolga");

        db.collection("User").doc("Tolga").update({
            "isRisky" : true
        }).then(function() {
                console.log("Document successfully updated!");
        });

    }
    return(
        <div>
            <div>
                <table>
                    <thead>
                    {
                        Object.keys(ContactUsersInfo).map(id=>{
                            return <tr key ={id}>
                                <td > {
                                    ContactUsersInfo[id].email}</td>
                                <td>{
                                    ContactUsersInfo[id].name}</td>
                                <td>{
                                    ContactUsersInfo[id].surname}</td>
                            </tr>
                        })
                    }
                    </thead>
                </table>
                <button onClick={markRisky}> Mark Risky</button>
            </div>
        </div>)
}


function calculateDistance(location1 : UserLocation, location2:UserLocation) : number{

    //convert latitutes and longitudes to radians
    let lat1 = degsToRads(location1.getLatitude());
    let lng1 = degsToRads(location1.getLongitude());
    let lat2 = degsToRads(location2.getLatitude());
    let lng2 = degsToRads(location2.getLongitude());


    //haversine formula
    let dlat = lat2 - lat1;
    let dlon = lng2 - lng1;

    let a = Math.pow(Math.sin(dlat / 2), 2)
        + Math.cos(lat1) * Math.cos(lat2)
        * Math.pow(Math.sin(dlon / 2),2);

    let c = 2 * Math.asin(Math.sqrt(a));
    return c * EARTH_RADIUS;
}

// Violated time was set as 30 sec!!

function calculateTimeInterval(location1 : UserLocation, location2:UserLocation) : boolean{

    //console.log(Math.abs(location1.getTime()-location2.getTime()));

    if(Math.abs(location1.getTime()-location2.getTime())<30){
        //console.log("Time = "+Math.abs(location1.getTime()-location2.getTime()));
        return true;
    }
    else {
        return false;
    }
}
