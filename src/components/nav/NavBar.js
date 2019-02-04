//Component is responsible for setting up the NavBar element
//Eventually will need to add a dropdown menu on far right

import React, { Component } from "react"
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./NavBar.css"

export default class NavBar extends Component {
    render() {
        return (
            <nav className="navbar fixed-bottom navbar-light light-blue flex-md-nowrap p-0 shadow">
                <div className="container">
                    <ul className="nav nav-pills nav-fill">
                        <li className="nav-item">
                            <Link className="nav-link"
                            to="/home">HOME</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link"
                            to="/track">TRACK</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link"
                            to="/meds">MEDS</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/notes">NOTES</Link>
                        </li>
                        <li className="nav-item">
                            {/* Will be dropdown menu */}
                            {/* MORE */}
                        </li>
                    </ul>
                </div>

            </nav>
        )
    }
}