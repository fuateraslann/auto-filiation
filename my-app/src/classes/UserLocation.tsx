// @ts-ignore
export class UserLocation{
    private longitude : number | undefined;
    private latitude : number | undefined;
    private altitude : number | undefined;
    private time : number | undefined;

    constructor(location : any) {
        this.longitude = location.longitude;
        this.latitude = location.latitude;
        this.altitude = location.altitude;
        this.time = location.time;
    }

    getLongitude() : number{
        return this.longitude as number;
    }
    setLongitude(longitude:number) : void{
        this.longitude = longitude;
    }
    getLatitude() : number{
        return this.latitude as number;
    }
    setLatitude(latitude:number) : void{
        this.latitude = latitude;
    }
    getAltitude() : number{
        return this.altitude as number;
    }

    setAltitude(altitude:number) : void{
        this.altitude = altitude;
    }

    getTime() : number{
        return this.time as number;
    }

    setTime(time:number) : void{
        this.time = time;
    }
}
