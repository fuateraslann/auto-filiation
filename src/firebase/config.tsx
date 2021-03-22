import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth';
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyBy-VJq6ZBG7EH5xvjFEK0RVgk_MxWhjnY",
    authDomain: "autofiliation-348e0.firebaseapp.com",
    databaseURL: "https://autofiliation-348e0.firebaseio.com",
    projectId: "autofiliation-348e0",
    storageBucket: "autofiliation-348e0.appspot.com",
    messagingSenderId: "415487351930",
    appId: "1:415487351930:web:5840fc43147cca42292fc3",
    measurementId: "G-FWJMWTZE2L"
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db= firebase.firestore();

export { db , auth };
