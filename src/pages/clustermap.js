import React, { useState, useRef, useEffect } from "react";
//import useSwr from "swr";
import GoogleMapReact from "google-map-react";
import useSupercluster from "use-supercluster";
import {db} from "../firebase/config"
import {User} from "../classes/User";
import "../App.css";

//import * as locations from "../data/mock_data.json";

const fetcher = (...args) => fetch(...args).then(response => response.json());

const Marker = ({ children }) => children;

export default function DemoApp() {
    const mapRef = useRef();
    const [bounds, setBounds] = useState(null);
    const [zoom, setZoom] = useState(10);
    const [locations, setLocations] = useState([]);
    useEffect( ()=>{
        db.collection("Users").get().then((querySnapshot) => {

            const usersData = [];
            querySnapshot.forEach((doc) => {
                usersData.push({...doc.data(), id : doc.id})
                // doc.data() is never undefined for query doc snapshot

            });

            setLocations(usersData);
        });
    },[])


    const points = locations.map(user => ({
        type: "Feature",
        properties: { cluster: false, userId: user.id },
        geometry: {
            type: "Point",
            coordinates: [
                parseFloat(user.locations[user.locations.length-1].latitude),
                parseFloat(user.locations[user.locations.length-1].longitude)
            ]
        }
    }));
    const { clusters, supercluster } = useSupercluster({
        points,
        bounds,
        zoom,
        options: { radius: 75, maxZoom: 20 }
    });

    return (
        <div style={{ height: "100vh", width: "100%" }}>
            <GoogleMapReact
                googleMapURL={"https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyA8nuKxeUQFlX2JEg_7NjQd1kUKs4r0LII"}
                defaultCenter={{ lat: 39.891480 , lng: 32.785450 }}
                defaultZoom={10}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map }) => {
                    mapRef.current = map;
                }}
                onChange={({ zoom, bounds }) => {
                    setZoom(zoom);
                    setBounds([
                        bounds.nw.lng,
                        bounds.se.lat,
                        bounds.se.lng,
                        bounds.nw.lat
                    ]);
                }}
            >
                {clusters.map(cluster => {
                    const [longitude, latitude] = cluster.geometry.coordinates;
                    const {
                        cluster: isCluster,
                        point_count: pointCount
                    } = cluster.properties;

                    if (isCluster) {
                        return (
                            <Marker
                                key={locations.id}
                                lat={latitude}
                                lng={longitude}
                            >
                                <div
                                    className="cluster-marker"
                                    style={{
                                        width: `${10 + (pointCount / points.length) * 20}px`,
                                        height: `${10 + (pointCount / points.length) * 20}px`
                                    }}
                                    onClick={() => {
                                        const expansionZoom = Math.min(
                                            supercluster.getClusterExpansionZoom(cluster.id),
                                            20
                                        );
                                        mapRef.current.setZoom(expansionZoom);
                                        mapRef.current.panTo({ lat: latitude, lng: longitude });
                                    }}
                                >
                                    {pointCount}
                                </div>
                            </Marker>
                        );
                    }

                    return (
                        <Marker
                            key={locations.id}
                            lat={latitude}
                            lng={longitude}
                        >
                            <button className="user-locations">
                                <img src="/mark.png" alt="user-locations" />
                            </button>
                        </Marker>
                    );
                })}
            </GoogleMapReact>
        </div>
    );
}
