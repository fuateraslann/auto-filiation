import {UserLocation} from "./UserLocation";
import React, {useContext, useEffect, useState } from 'react';
import {db} from "./firebase/config"

const degsToRads = (deg: number) => (deg * Math.PI) / 180.0;
const EARTH_RADIUS = 6371000; //in meters
export default function FindContacts({User ,UsersInfo  }: any  ) {
    var [ourUser , setUser] =useState([])
    var[ourUsersData , setOurUsersData] =useState([])
    var [ContactUsersInfo , setContactUsersInfo] =useState([])
    useEffect(()=>{
        setOurUsersData(UsersInfo)
        setUser(User)
    },[UsersInfo ,User])

    const [userLocations , setUserLocations] = useState([])
    const locationData: any = [];
    useEffect(()=>{
        if(ourUser.length !=0 ){
            // @ts-ignore
            // @ts-ignore
            var i , j ,k ;  // @ts-ignore
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
           // @ts-ignore
                for(j=0 ; j< ourUsersData.length ; j++){ // @ts-ignore
                    //console.log(ourUsersData[j])
                    for(i = 0 ; i<locationData.length ; i++){ // @ts-ignore
                        for(k=0 ; k<ourUsersData[j].locations.length ; k++){// @ts-ignore
                            let location2 = new UserLocation(ourUsersData[j].locations[k]);
                            if(locationData.length!= 0){
                                    var distance = calculateDistance(locationData[i] , location2);
                                    console.log(distance)
                                    if(distance<2){
                                        contactsArr.push(ourUsersData[j])
                                        i=locationData.length;
                                        break;
                                    }
                            }
                        }
                    }
                }
                setContactUsersInfo(contactsArr)
        }
    },[ourUsersData ,ourUser])
    //console.log(ContactUsersInfo);
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
                                <td>{// @ts-ignore
                                    ContactUsersInfo[id].name}</td>
                                <td>{// @ts-ignore
                                    ContactUsersInfo[id].surname}</td>
                            </tr>
                        })
                    }
                    </thead>
                </table>
            </div>
        </div>)
}


function calculateDistance(location1 : UserLocation, location2:UserLocation) : number{
    let lat1 = degsToRads(39.8898366666); //degsToRads(location1.getLatitude());
    let lng1 = degsToRads(32.780085); //degsToRads(location1.getLongitude());
    let lat2 = degsToRads(39.889835); //degsToRads(location2.getLatitude());
    let lng2 = degsToRads(32.780087); //degsToRads(location2.getLongitude());
    //convert latitutes and longitudes to radians
    //haversine formula
    let dlat = lat2 - lat1;
    let dlon = lng2 - lng1;

    let a = Math.pow(Math.sin(dlat / 2), 2)
        + Math.cos(lat1) * Math.cos(lat2)
        * Math.pow(Math.sin(dlon / 2),2);

    let c = 2 * Math.asin(Math.sqrt(a));
    return c * EARTH_RADIUS;
}