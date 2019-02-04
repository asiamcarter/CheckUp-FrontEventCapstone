import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ApplicationViews from "./components/ApplicationViews"
import { BrowserRouter as Router } from "react-router-dom"


ReactDOM.render(<Router><ApplicationViews /></Router>, document.getElementById('root'));

