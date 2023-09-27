// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyALUvh54cFbeNdVI0hgNZIu_KaGxcY6AI8',
  authDomain: 'react-http-530b7.firebaseapp.com',
  databaseURL:
    'https://react-http-530b7-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'react-http-530b7',
  storageBucket: 'react-http-530b7.appspot.com',
  messagingSenderId: '747921879674',
  appId: '1:747921879674:web:0e7b8025827fec459841c3',
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export const database = app.database();
export default app;
