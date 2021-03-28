import {auth , db} from "./firebase/config"

// authStateChange
auth.onAuthStateChanged(u=>{
    if(u){
        console.log("logged-in")
        userLoggedIn(u)
    }
    else{
        console.log("logged-out")
        // @ts-ignore
        userLoggedIn();
    }
})

// @ts-ignore
const userLoggedIn =(e)=>{
    if(e){
        // @ts-ignore
        document.getElementById("SignOutButton").style.display="block"
        // @ts-ignore
        document.getElementById("loginButton").style.display="none"
        // @ts-ignore
        document.getElementById("UsersButton").style.display="block"
    }else{
        // @ts-ignore
        document.getElementById("SignOutButton").style.display="none"
        // @ts-ignore
        document.getElementById("loginButton").style.display="block"
        // @ts-ignore
        document.getElementById("UsersButton").style.display="none"
    }
}

//nav bar
document.addEventListener("DOMContentLoaded",function (){
    var modals= document.querySelectorAll(".modal");
    // @ts-ignore
    M.Modal.init(modals);
});

// login
const loginForm = document.querySelector("#login-form");
// @ts-ignore
loginForm.addEventListener("submit" ,(e) => {
    e.preventDefault();
    // @ts-ignore
    const mail = loginForm["login-email"].value;// @ts-ignore
    const password = loginForm["login-password"].value;
    db.collection("Admins").get().then((e) => {
        e.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshot
            if(mail === doc.data().email){
                auth.signInWithEmailAndPassword(mail,password).then(admin=>{
                    console.log(admin);
                    const loginModal = document.querySelector("#modal-login");
                    // @ts-ignore
                    M.Modal.getInstance(loginModal).close();
                    // @ts-ignore
                    loginForm.reset();
                })
            }
        });
    });
})

//Sign Out
const SignOut= document.querySelector("#SignOutButton");
// @ts-ignore
SignOut.addEventListener("click", (e) =>{
    e.preventDefault();
    auth.signOut();
})