import { UserLocation } from "./UserLocation";

export class UserClass{
    private name : string;
    private surname : string;
    private email : string;
    private birthdate : any;
    private chronicDisease : boolean;
    private locations : Array<UserLocation>;


    constructor(name:string, surname:string, email:string, birthdate:any, chronicDisease:boolean){
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.birthdate = birthdate;
        this.chronicDisease = chronicDisease;

        this.locations = new Array<UserLocation>();
    }

    getName() : string{
        return this.name;
    }

    setName(name:string) : void{
        this.name = name;
    }

    getSurname() : string{
        return this.surname;
    }

    setSurname(surname:string) : void{
        this.surname = surname;
    }

    getEmail() : string{
        return this.email;
    }

    setEmail(email:string) : void{
        this.email = email;
    }

    getBirthdate() : any{
        return this.birthdate;
    }

    setBirthdate(birthdate:any) : void{
        this.birthdate = birthdate;
    }

    getChronicDisease() : boolean{
        return this.chronicDisease;
    }

    setChronicDisease(chronicDisease:boolean) : void{
        this.chronicDisease = chronicDisease;
    }

    getLocations() : Array<UserLocation>{
        return this.locations;
    }

    addLocation(userLocation:UserLocation) : void{
        this.locations.push(userLocation);
    }
}
