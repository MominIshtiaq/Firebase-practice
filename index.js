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

  // This method will help us signOut the user who is currently using how application
  // https://firebase.google.com/docs/auth/web/password-auth#next_stops for more information
  signOut,

  // For each of your app's pages that need information about the signed-in user, attach an observer to the global authentication object.
  // This observer gets called whenever the user's sign-in state changes.
  // Attach the observer using the onAuthStateChanged method. When a user successfully signs in, you can get information about the user in the observer.
  onAuthStateChanged,

  // This constructure function will let us create an instance of the Firebase Google Auth provider to use in our application
  GoogleAuthProvider,
  signInWithPopup,

  // This function allows us to update the created user profile information as the name suggest
  updateProfile,
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
// By using this we have create the instance of google provider
const provider = new GoogleAuthProvider();

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
const signOutButtonEl = document.getElementById("sign-out-btn");

const userProfilePictureEl = document.getElementById("user-profile-picture");
const userGreetingEl = document.getElementById("user-greeting");

const displayNameInputEl = document.getElementById("display-name-input");
const photoURLInputEl = document.getElementById("photo-url-input");
const updateProfileButtonEl = document.getElementById("update-profile-btn");

/* == UI - Event Listeners == */

signInWithGoogleButtonEl.addEventListener("click", authSignInWithGoogle);
signInButtonEl.addEventListener("click", authSignInWithEmail);
createAccountButtonEl.addEventListener("click", authCreateAccountWithEmail);
signOutButtonEl.addEventListener("click", authSignOut);
updateProfileButtonEl.addEventListener("click", authUpdateProfile);

/* === Main Code === */

onAuthStateChanged(auth, (user) => {
  if (user) {
    showLoggedInView();
    showProfilePicture(userProfilePictureEl, user);
    showUserGreeting(userGreetingEl, user);
  } else {
    showLoggedOutView();
  }
});

/* === Functions === */

/* = Functions - Firebase - Authentication = */

function authSignInWithGoogle() {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      // The signed-in user info.
      // const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      console.log("Signed in with Google");
    })
    .catch((error) => {
      // Handle Errors here.
      // const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      // const email = error.customData.email;
      // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
      console.error(
        "Error message while sign in using google provider",
        errorMessage
      );
    });
}

function authSignInWithEmail() {
  const email = emailInputEl.value;
  const password = passwordInputEl.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // const user = userCredential.user;
      clearAuthFields();
      // showLoggedInView(); // Now we don't need this here as onAuthStateChanged function will handle this
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
      clearAuthFields();
      // showLoggedInView(); // Now we don't need this here as onAuthStateChanged function will handle this
    })
    .catch((error) => {
      console.error("error message while creating user", error.message);
    });
}

function authSignOut() {
  signOut(auth)
    .then(() => {
      // showLoggedOutView(); // Now we don't need this here as onAuthStateChanged function will handle this
    })
    .catch((error) => {
      console.error("error message while signout", error.message);
    });
}

function authUpdateProfile() {
  const updatedName = displayNameInputEl.value;
  const updatedProfilePic = photoURLInputEl.value;

  updateProfile(auth.currentUser, {
    displayName: updatedName,
    photoURL: updatedProfilePic,
  })
    .then(() => {
      console.log("User profile updated successfully");
    })
    .catch((error) => {
      console.error(
        "Error message while updating user information",
        error.message
      );
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

function clearInputField(field) {
  field.value = "";
}

function clearAuthFields() {
  clearInputField(emailInputEl);
  clearInputField(passwordInputEl);
}

function extractName(email) {
  const local = email.split("@")[0]; // before @
  // Split into sequences of letters, ignoring digits
  const parts = local.match(/[a-zA-Z]+/g);
  if (!parts) return "";
  // Combine parts with space
  return parts.join(" ");
}

function getInitials(name) {
  return name
    .trim()
    .split(/\s+/) // split on spaces
    .map((part) => part[0].toUpperCase())
    .join("");
}

function createDivElementAndAppend(parentElement, text) {
  const div = document.createElement("div");
  div.classList.add("user-initials");
  div.textContent = text;
  parentElement.append(div);
}

function showProfilePicture(imgElementContainer, user) {
  imgElementContainer.innerHTML = "";
  const { photoURL, displayName, email } = user;

  if (photoURL) {
    const img = document.createElement("img");
    img.classList.add("user-photo");
    img.src = photoURL;
    img.alt = email || "User photo";
    imgElementContainer.append(img);
  } else if (displayName) {
    const initials = getInitials(displayName);
    createDivElementAndAppend(imgElementContainer, initials);
  } else {
    const nameFromEmail = extractName(email);
    const initials = getInitials(nameFromEmail);
    createDivElementAndAppend(imgElementContainer, initials);
  }
}

function showUserGreeting(userGreetingEl, user) {
  const { displayName } = user;
  if (displayName) {
    const userName = displayName.split(" ")[0];
    userGreetingEl.textContent = `Hey ${userName}, how are you?`;
  } else {
    userGreetingEl.textContent = "Hey friend, how are you?";
  }
}
