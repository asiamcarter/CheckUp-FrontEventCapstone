//Component is appended to the top of the viewport when track button is pressed

import React, { Component } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./NavBar.css"

export default class TrackNavBar extends Component {
    render () {
        return (
            <>
               <nav className="navbar fixed-top navbar-light light-blue flex-md-nowrap p-0 shadow">
                    <div className="container">
                        <ul className="nav nav-pulls nav-fill">
                            <li className="nav-item">
                                TRACK
                            </li>
                        </ul>
                    </div>
               </nav>
            </>
        )
    }
}