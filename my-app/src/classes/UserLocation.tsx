import firebase from 'firebase/app';
import 'firebase/firestore';

export  class UserLocation{
    public readonly longitude : number;
    public readonly latitude : number;
    public readonly altitude : number;
    public readonly time : number;


    constructor(longitude:number, latitude:number, altitude:number, time:number){
        this.longitude = longitude;
        this.latitude = latitude;
        this.altitude = altitude;
        this.time = time;
    }


    /*getLongitude() : number{
        return this.longitude;
    }

    setLongitude(longitude:number) : void{
        this.longitude = longitude;
    }

    getLatitude() : number{
        return this.latitude;
    }

    setLatitude(latitude:number) : void{
        this.latitude = latitude;
    }

    getAltitude() : number{
        return this.altitude;
    }

    setAltitude(altitude:number) : void{
        this.altitude = altitude;
    }

    getTime() : number{
        return this.time;
    }

    setTime(time:number) : void{
        this.time = time;
    }*/

    /*static userLocationConverter = {
        toFirestore(userLocation: UserLocation): firebase.firestore.DocumentData {
          return {
                longitude: userLocation.longitude,
                latitude: userLocation.latitude,
                altitude: userLocation.altitude,
                time: userLocation.time
                };
        },
        fromFirestore(
          snapshot: firebase.firestore.QueryDocumentSnapshot,
          options: firebase.firestore.SnapshotOptions
        ): UserLocation {
          const data = snapshot.data(options);
          return new UserLocation(data.longitude, data.latitude, data.altitude, data.time);
        }
      };*/
}

