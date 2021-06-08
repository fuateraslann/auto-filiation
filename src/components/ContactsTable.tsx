import React, {FC, ReactElement, useEffect, useState} from 'react';
import {UserLocation} from "../classes/UserLocation";
import {User} from "../classes/User";
import {Button, Table} from "react-bootstrap";
import {db} from "../firebase/config"

const degsToRads = (deg: number) => (deg * Math.PI) / 180.0;
const EARTH_RADIUS = 6371000; //in meters



type ChildProps = {
    mUser: User,
    allUsers: Array<User>,
    mDay : number,
}


const ContactsTable: FC<ChildProps> = ({mUser, allUsers ,mDay    }): ReactElement => {
    const [contacts, setContacts] = useState(Array<User>());
    const [day , setDay] = useState(2);
    useEffect(()=>{
        setDay(mDay)
    },[mDay])
    useEffect(() => {
        let contactArr = Array<User>();

        let mUserLocations = mUser.getLocations();
        let mUserLocationsLength = mUserLocations.length;

        

        allUsers.forEach(comparedUser => {

            if (mUser.getEmail() !== comparedUser.getEmail()) { // get rid of same user matching

                let day = mDay ; // Get last 7 days Contacts
                let seconds = day*86400; // convert day to seconds

                let comparedUserLocations = comparedUser.getLocations();
                let comparedUserLocationsLength = comparedUserLocations.length;

                //According to the past days parameter, Take the location  in specific interval between [(today-pastDay)- today]
                let today=new Date().getTime() / 1000;  // it returns today as sec
                let startTimeInterval = today - seconds;

                let k;
                for(k=1;k< mUserLocationsLength;k++){
            
                    if(checkTimeInterval(mUserLocations[k],startTimeInterval)) break;                        
                        
                }

                for (let i = k; i < mUserLocationsLength; i++) { //starts from k th index which is first index of User for desired time interval

                    if (mUserLocationsLength > 3) {
                        let mUserLocation = mUserLocations[i];

                        let l;
                        for(l=1;l<comparedUserLocationsLength;l++){
                            if(checkTimeInterval(comparedUserLocations[l],startTimeInterval)) break;
                        }

                        for (let j = l; j < comparedUserLocationsLength-1; j++) { // starts from l th index which is first index of ComparedUser  for desired time interval
                            if (comparedUserLocationsLength > 3) {

                                //COMPARE TWO LOCATIONS
                                let comparedUserLocation = comparedUserLocations[j];


                                let distance = calculateDistance(comparedUserLocation, mUserLocation);
                                let isTimeViolated = isAtTheSameTime(comparedUserLocation, mUserLocation);

                                // If two location close each other with 5m at the same time
                                if (distance < 20 && isTimeViolated) {
                                    //console.log(j)
                                    let locationBefore = comparedUserLocations[j - 1];
                                    let locationAfter = comparedUserLocations[j + 1];

                                    // get comparedUser before and after location distances
                                    let distanceBefore = calculateDistance(locationBefore, mUserLocation);
                                    let distanceAfter = calculateDistance(locationAfter, mUserLocation);

                                    // get mUser before and after location distances
                                    //let userDistanceBefore = calculateDistance(locationData[i], locationData[i - 1]);
                                    //let userDistanceAfter = calculateDistance(locationData[i], locationData[i + 1]);

                                    if ((distanceBefore < 20 && distanceAfter < 20) /*&& (userDistanceAfter < 5 && userDistanceBefore < 5)*/) {
                                        let altitudeBetween = calculateAltitude(comparedUserLocation, mUserLocation);
                                        if (altitudeBetween < 3) {
                                            //console.log(myUserData[j])
                                            contactArr.push(comparedUser)
                                            //i = locationData.length;
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }


        })

        setContacts(contactArr);
    }, [mUser])

    let sendNotification = (contacts : Array<User>) => {
        var namesAndSurnames =[];
        var emails =[];
        for(var i =0 ; i<contacts.length-2 ; i++){
            namesAndSurnames.push(contacts[i].getName()+" " + contacts[i].getSurname());
            emails.push(contacts[i].getEmail())
        }
        emails.forEach(email =>{
            db.collection("Users").doc(email).update({
                "isRisky" : true
            }).then(function() {
                console.log("Document successfully updated!");
            });
        })

        alert("  Above '55' years old Users NOTIFIED ");
    }

    return (
        <div>
            <h4>Contacts</h4>
            <Table id ="UserTable" size="sm">
                <thead>
                <th>Email</th>
                <th>Name</th>
                <th>Surname</th>
                </thead>

                <tbody>
                {contacts.map((contactUser) => {
                    return <tr>
                        <td> {
                            contactUser.getEmail()}</td>
                        <td>{
                            contactUser.getName()}</td>
                        <td>{
                            contactUser.getSurname()}</td>

                    </tr>

                })}<tr>
                    <td>
                    <Button onClick={() => sendNotification(contacts)}>Send Notification </Button>
                    </td>
                    <td>
                    <input className="form-control"  name ="age" placeholder="Age Filter" />
                    </td>
                </tr> 
                </tbody>
            </Table>
        </div>
    )
}

export default ContactsTable;

function checkTimeInterval(location: UserLocation,startingTime: number):any{


    if(location.time>startingTime){
        return true;
    }
    else{
         return false;
        }

}

function calculateDistance(location1: UserLocation, location2: UserLocation): number {

    //convert latitutes and longitudes to radians
    let lat1 = degsToRads(location1.latitude);
    let lng1 = degsToRads(location1.latitude);
    let lat2 = degsToRads(location2.latitude);
    let lng2 = degsToRads(location2.latitude);
    


    //haversine formula
    let dlat = lat2 - lat1;
    let dlon = lng2 - lng1;

    let a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

    let c = 2 * Math.asin(Math.sqrt(a));
    return c * EARTH_RADIUS;
}

function calculateAltitude(location1: UserLocation, location2: UserLocation): number {

    let altitude1 = location1.altitude;
    let altitude2 = location2.altitude;

    return Math.abs(altitude1 - altitude2);
}

// Violated time was set as 120 sec!!
function isAtTheSameTime(location1: UserLocation, location2: UserLocation): boolean {
    if (Math.abs(location1.time - location2.time) < 1200) {
        //console.log("Time = " + Math.abs(location1.time - location2.time));
        return true;
    } else {
        return false;
    }
}