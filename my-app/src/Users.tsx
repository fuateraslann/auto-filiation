import React from 'react';
import ReactDOM from 'react-dom';
import firebase from "firebase";
import User = firebase.User;

const Users = document.querySelector("#UsersButton");

// @ts-ignore
Users.addEventListener("click",(e => {
    e.preventDefault();

}))