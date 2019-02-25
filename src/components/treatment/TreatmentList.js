import React, { Component } from "react"
import TreatmentCard from "./TreatmentCard"
import "./Treatment.css"


export default class TreatmentList extends Component {
    render() {
        return (
            <>
                <nav className="navbar sticky-top flex-md-nowrap p-0 shadow ">
                    <div className="container">
                        <ul className="nav nav-pills nav-fill homepage-top-nav">
                            <li className="nav-item">
                                TREATMENT LIST
                        </li>
                        </ul>
                    </div>
                </nav>
                <section className="medication-list">
               <section>
                    {this.props.treatments.map(treatment => (
                      <TreatmentCard key={treatment.id} treatment={treatment} {...this.props} />
                    ))}
                    </section>
                </section>
            </>
        )
    }
}