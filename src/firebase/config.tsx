import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth';


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyCCSAZcZs-hnXoca7Z3gAmvMCPk_CyNOA4",
    authDomain: "autofiliation-70952.firebaseapp.com",
    projectId: "autofiliation-70952",
    storageBucket: "autofiliation-70952.appspot.com",
    messagingSenderId: "616028939829",
    appId: "1:616028939829:web:25748b835e7507b922737c",
    measurementId: "G-WNMM6C0J9J"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db= firebase.firestore();


//export default firebaseDB.database().ref()
