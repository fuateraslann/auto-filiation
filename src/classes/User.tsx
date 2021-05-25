import { UserLocation } from "./UserLocation";
import 'firebase/firestore';
import firebase from 'firebase/app';
export class User{
    private name : string;
    private surname : string;
    private email : string;
    private birthdate : any;
    private chronicDisease : boolean;
    private locations : Array<UserLocation>;


    constructor(name: string, surname: string, email: string, birthdate: any, chronicDisease: boolean,locations?:Array<UserLocation>){
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.birthdate = birthdate;
        this.chronicDisease = chronicDisease;
        if(locations != null) this.locations = locations;
        else this.locations = new Array<UserLocation>();

    }

    public getName : () => string = () =>{
        return this.name;
    }

    public setName(name:string) : void{
        this.name = name;
    }

    public getSurname : () => string = () =>{
        return this.surname;
    }

    public setSurname(surname:string) : void{
        this.surname = surname;
    }

    public getEmail() : string{
        return this.email;
    }

    public setEmail(email:string) : void{
        this.email = email;
    }

    public  getBirthdate() : any{
        return this.birthdate;
    }

    public setBirthdate(birthdate:any) : void{
        this.birthdate = birthdate;
    }

    public getChronicDisease() : boolean{
        return this.chronicDisease;
    }

    setChronicDisease(chronicDisease:boolean) : void{
        this.chronicDisease = chronicDisease;
    }

    public getLocations() : Array<UserLocation>{
        return this.locations;
    }

    addLocation(userLocation:UserLocation) : void{
        this.locations.push(userLocation);
    }
    static userConverter = {
        toFirestore(user: User): firebase.firestore.DocumentData {
            return {
                name: user.name,
                surname: user.surname,
                email: user.email,
                birthdate: user.birthdate,
                chronicDisease: user.chronicDisease,
                locations: user.locations
            };
        },
        fromFirestore(
            snapshot: firebase.firestore.QueryDocumentSnapshot,
            options: firebase.firestore.SnapshotOptions
        ): User {
            const data = snapshot.data(options)!;
            return new User(data.name, data.surname, data.email, data.birthdate, data.chronicDisease, data.locations);
        }
    };

}
