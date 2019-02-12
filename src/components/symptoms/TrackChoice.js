import React, { Component} from "react"
import "./Symptoms.css"
import {Link} from "react-router-dom"

export default class TrackChoice extends Component {
    render() {
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
            <div className="symptom-container">
            <h5 className="symptom-question">What symptoms would you like to track?</h5>
            <div className="symptom-name-container">
            <div className="container">
                <div className="list-group my-list-group left">
                    <div className="list-group-item" id="nausea">
                        <Link to={"/symptoms/nausea/new"}>
                            <h1 className="nausea-h1">
                                Nausea
                            </h1>
                        </Link>
                    </div>
                    <div className="list-group-item" id="weight">
                        <h1>
                           Weight
                        </h1>
                    </div>
                 </div>
                    <div className="list-grou my-list-group right">
                    <div className="list-group-item" id="pain">
                        <h1>
                            Pain
                        </h1>
                    </div>
                    <div className="list-group-item" id="add">
                        <h1>
                            +
                        </h1>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </>
        )
    }
}