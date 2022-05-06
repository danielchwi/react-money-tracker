import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBT-yPOgvlkZT_KUn6M6eHkmqn1FxArLh8",
  authDomain: "react-money-tracker-c626f.firebaseapp.com",
  projectId: "react-money-tracker-c626f",
  storageBucket: "react-money-tracker-c626f.appspot.com",
  messagingSenderId: "280866018975",
  appId: "1:280866018975:web:9d225aa882618de59b34aa"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// initialize firestore
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()

// timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, timestamp }