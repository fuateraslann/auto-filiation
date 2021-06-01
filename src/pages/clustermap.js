import React, {useState, useContext, useEffect} from "react";
import * as locations from "../data/mock_data.json";
import {LocationContext} from "../components/FilteredUsersTable";
//import logo from './logo.svg';
//import './App.css';




const fetch = require("isomorphic-fetch");
const { compose, withProps, withHandlers } = require("recompose");

const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} = require("react-google-maps");
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");

const MapWithAMarkerClusterer = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyA8nuKxeUQFlX2JEg_7NjQd1kUKs4r0LII",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `1000px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withHandlers({
    onMarkerClustererClick: () => (markerClusterer) => {
      const clickedMarkers = markerClusterer.getMarkers()
      console.log(`Current clicked markers length: ${clickedMarkers.length}`)
      console.log(clickedMarkers)
    },
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    defaultZoom={11}
    defaultCenter={{ lat: 39.891480 , lng: 32.785450 }}
  >
    <MarkerClusterer
      onClick={props.onMarkerClustererClick}
      averageCenter
      enableRetinaIcons
      gridSize={60}
    >
      {locations.users.map(marker => (
        <Marker
          key={marker.photo_id}
          position={{ lat: marker.Latitude, lng: marker.Longtude }}
        />
      ))}
    </MarkerClusterer>
  </GoogleMap>
);

export default  function DemoApp(){
    let users = useContext(LocationContext)
    const[markers , setMarkers] = useState([])
    const url = [
        // Length issue
        `https://gist.githubusercontent.com`,
        `/farrrr/dfda7dd7fccfec5474d3`,
        `/raw/758852bbc1979f6c4522ab4e92d1c92cba8fb0dc/data.json`
    ].join("")
   useEffect(()=>{
       fetch(url)
           .then(res => res.json())
           .then(data => {
               setMarkers(data.photos)
           });
   },[])


    return (
        <MapWithAMarkerClusterer markers={markers} />
    )
}


