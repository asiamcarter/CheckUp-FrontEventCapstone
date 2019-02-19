import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ApplicationViews from "./components/ApplicationViews"
import { BrowserRouter as Router } from "react-router-dom"
import * as firebase from "firebase"
import 'bootstrap/dist/css/bootstrap.css';

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAk6kN6FrXtOTVV174s653Ht9Yvhqfx8rs",
    authDomain: "checkup-15a61.firebaseapp.com",
    databaseURL: "https://checkup-15a61.firebaseio.com",
    projectId: "checkup-15a61",
    storageBucket: "checkup-15a61.appspot.com",
    messagingSenderId: "787590900328"
  };

firebase.initializeApp(config);
ReactDOM.render(<Router><ApplicationViews /></Router>, document.getElementById('root'));

