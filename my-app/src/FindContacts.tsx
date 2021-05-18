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
            let user_Main= new UserClass(ourUser.name,ourUser.surname,ourUser.email,ourUser.birthday,ourUser.chronicDisease);

            for(j=0 ; j< ourUsersData.length ; j++){ // @ts-ignore
                let user_other= new UserClass(ourUsersData[j].name,ourUsersData[j].surname,ourUsersData[j].email,ourUsersData[j].birthday,ourUsersData[j].chronicDisease);
                
                
                if(user_Main.getEmail()!=user_other.getEmail()){ // get rid of from same user mathing

                    for(i = 0 ; i<locationData.length ; i++){
                    
                        if(locationData.length>3 && i>0 && i<locationData.length){

                            // @ts-ignore
                            for(k=0 ; k<ourUsersData[j].locations.length ; k++){
                                // @ts-ignore
                                if(ourUsersData[j].locations.length>3 && k>0 && k<ourUsersData[j].locations.length ){

                                    //@ts-ignore
                                    let location = new UserLocation(ourUsersData[j].locations[k]);

                                    var distance = calculateDistance(locationData[i] , location);
                                    var isTimeViolated = isAtTheSameTime(locationData[i],location);
                                    // If two location close each other with 2m at the same time
                                    if(distance<2 && isTimeViolated){
                                        //@ts-ignore
                                        let location_before = new UserLocation(ourUsersData[j].locations[k-1]);
                                        //@ts-ignore
                                        let location2_after = new UserLocation(ourUsersData[j].locations[k+1]);

                                        // get other users Before and After location point distances
                                        var distanceBefore=calculateDistance(location_before,location);
                                        var distanceAfter=calculateDistance(location2_after,location);
                                        
                                        // get Main users Before and After location point distances 
                                        var userDistanceBefore=calculateDistance(locationData[i],locationData[i-1]);
                                        var userDistanceAfter=calculateDistance(locationData[i],locationData[i+1]);
                                        
                                        if((distanceBefore<2 && distanceAfter<2) && (userDistanceAfter<2 && userDistanceBefore<2)){
                                            //console.log(ourUsersData[j])
                                            var altitudeBetween = calculateAltitude(locationData[i],location);
                                            if(altitudeBetween<3){
                                                console.log(ourUsersData[j])
                                                contactsArr.push(ourUsersData[j])
                                                i=locationData.length;
                                                break;
                                            }
                                        }
                                    }
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

function calculateAltitude(location1: UserLocation, location2: UserLocation): number{

    let altitude1=location1.getAltitude();
    let altitude2=location2.getAltitude();

    return Math.abs(altitude1-altitude2);
}

// Violated time was set as 30 sec!!
function isAtTheSameTime(location1 : UserLocation, location2:UserLocation) : boolean{

    //console.log(Math.abs(location1.getTime()-location2.getTime()));

    if(Math.abs(location1.getTime()-location2.getTime())<30){
        //console.log("Time = "+Math.abs(location1.getTime()-location2.getTime()));
        return true;
    }
    else {
        return false;
    }
}
