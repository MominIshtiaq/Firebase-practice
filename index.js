/* === Imports === */
import { initializeApp } from "firebase/app";

// /* === Firebase Setup === */
const firebaseConfig = {
  apiKey: "AIzaSyCduBICpjQ7QtusKfjKja34M5LnmFltfDY",
  authDomain: "practice-firebase-fe397.firebaseapp.com", // Domain for the firebase authentication
  projectId: "practice-firebase-fe397",
  storageBucket: "practice-firebase-fe397.firebasestorage.app", // URL for the Firebase storage bucket
};

const app = initializeApp(firebaseConfig);

// app have an options object that will have all the value that we have assigned in the firebaseConfig
// console.log(app.options.apiKey) => AIzaSyCduBICpjQ7QtusKfjKja34M5LnmFltfDY
// console.log(app.options.authDomain) => practice-firebase-fe397.firebaseapp.com
// console.log(app.options.projectId) => practice-firebase-fe397
// console.log(app.options.storageBucket) => practice-firebase-fe397.firebasestorage.app

/* === UI === */

/* == UI - Elements == */

const viewLoggedOut = document.getElementById("logged-out-view");
const viewLoggedIn = document.getElementById("logged-in-view");

const signInWithGoogleButtonEl = document.getElementById(
  "sign-in-with-google-btn"
);

const emailInputEl = document.getElementById("email-input");
const passwordInputEl = document.getElementById("password-input");

const signInButtonEl = document.getElementById("sign-in-btn");
const createAccountButtonEl = document.getElementById("create-account-btn");

/* == UI - Event Listeners == */

signInWithGoogleButtonEl.addEventListener("click", authSignInWithGoogle);

signInButtonEl.addEventListener("click", authSignInWithEmail);
createAccountButtonEl.addEventListener("click", authCreateAccountWithEmail);

/* === Main Code === */

showLoggedOutView();

/* === Functions === */

/* = Functions - Firebase - Authentication = */

function authSignInWithGoogle() {
  console.log("Sign in with Google");
}

function authSignInWithEmail() {
  console.log("Sign in with email and password");
}

function authCreateAccountWithEmail() {
  console.log("Sign up with email and password");
}

/* == Functions - UI Functions == */

function showLoggedOutView() {
  hideElement(viewLoggedIn);
  showElement(viewLoggedOut);
}

function showLoggedInView() {
  hideElement(viewLoggedOut);
  showElement(viewLoggedIn);
}

function showElement(element) {
  element.style.display = "flex";
}

function hideElement(element) {
  element.style.display = "none";
}
