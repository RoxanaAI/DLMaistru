import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import firebase from "firebase";
import * as serviceWorker from './serviceWorker';

// Use your config values here.
firebase.initializeApp({
  apiKey: "AIzaSyC9_VYF9PXkdqWVgoTSps2eeQlVWz624hQ",
    authDomain: "maistru-bac10.firebaseapp.com",
    databaseURL: "https://maistru-bac10.firebaseio.com",
    projectId: "maistru-bac10",
    storageBucket: "maistru-bac10.appspot.com",
    messagingSenderId: "554316947146",
    appId: "1:554316947146:web:43cdf790c4291682ea1e33",
    measurementId: "G-6GNZR22V3N"
});

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
