import React from 'react';
import ReactDOM from 'react-dom';
import ShowLocations from "./ShowLocations";
import Users from "./Users";
require("./auth");

ReactDOM.render(
    <React.StrictMode>
      <Users/>
  </React.StrictMode>,document.getElementById('root')

);


