/* === Imports === */
import { initializeApp } from "firebase/app";

// sendEmailVerification this method will send the user an email to verify themself
import {
  // This function will let us create an instance of the Firebase authentication service to use in our application
  getAuth,

  // This method will help us create the user with traditional email and password.
  // This function takes three arguments auth, email and password
  // This auth is the instance of Firebase authentication service we get from getAuth method. like const auth = getAuth(app)
  createUserWithEmailAndPassword,

  // This method will help us sign/login the user with traditional email and password.
  // This function takes three arguments auth, email and password
  // This auth is the instance of Firebase authentication service we get from getAuth method. like const auth = getAuth(app)
  signInWithEmailAndPassword,
} from "firebase/auth";

// /* === Firebase Setup === */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN, // Domain for the firebase authentication
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET, // URL for the Firebase storage bucket
};

const app = initializeApp(firebaseConfig);
// By using this auth object, we'll be able to do signing up to user and signing in user
const auth = getAuth(app);

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
  const email = emailInputEl.value;
  const password = passwordInputEl.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // const user = userCredential.user;
      showLoggedInView();
    })
    .catch((error) => {
      console.error("error message while signing user", error.message);
    });
}

function authCreateAccountWithEmail() {
  const email = emailInputEl.value;
  const password = passwordInputEl.value;

  // this method is use to create user using traditional email and password
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // const user = userCredential.user;
      showLoggedInView();
    })
    .catch((error) => {
      console.error("error message while creating user", error.message);
    });
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
