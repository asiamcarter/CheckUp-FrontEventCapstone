//Component is responsible for rendering medicaton cards

import React, { Component } from "react"
import MedicationCard from "./MedicationCard"
import pillicon from "../../images/medications/pills.png"
import "./Medications.css"
import { Button } from 'reactstrap';



export default class MedicationList extends Component {

    render() {
        // console.log("MED PROPS", this.props)
        const sortedMeds = this.props.medications.sort(function (medA, medB) {
            return parseInt(medA.time) - parseInt(medB.time)
        })

        return (
            <>
            <nav className="navbar sticky-top flex-md-nowrap p-0 shadow ">
                <div className="container">
                    <ul className="nav nav-pills nav-fill homepage-top-nav">
                        <li className="nav-item">
                            MEDICATION LIST
                        </li>
                        </ul>

                </div>
                </nav>
                <div className="medicationList">
                    <img src={pillicon} alt="pill icon" width="60px" height="60px"/>
                    <h2>Tracked Medications</h2>
                    <hr />

                </div>
                <section className="medication-list">
                    <section>Morning
                    {sortedMeds.map(medication => (
                        medication.time==="10:00" ?
                        <MedicationCard key={medication.id} medication={medication} {...this.props} /> : ""
                    ))}
                    </section>
                    <section>Afternoon
                    {sortedMeds.map(medication => (
                        medication.time==="11:00" ?
                        <MedicationCard key={medication.id} medication={medication} {...this.props} /> : ""
                    ))}
                    </section>
                    <section>Evening
                    {sortedMeds.map(medication => (
                        medication.time==="18:00" ?
                        <MedicationCard key={medication.id} medication={medication} {...this.props} /> : ""
                    ))}
                    </section>
                </section>
                <Button color="success" type="submit" id="add-medication-button" onClick={() => { this.props.history.push("/medications/new") }} >
                        Add
            </Button>
            </>
        )
    }
}