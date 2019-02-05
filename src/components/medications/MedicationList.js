//Component is responsible for rendering medicaton cards

import React, { Component } from "react"
import MedicationCard from "./MedicationCard"

export default class MedicationList extends Component {
    render() {
        return (
            <>
                <div className="medicationList">
                    <h2>Medication List</h2>
                    <button type="submit" onClick={() => { this.props.history.push("/medications/new") }} >
                        Add
            </button>
                </div>
                <section>
                    {this.props.medications.map(medication => (
                        <MedicationCard key={medication.id} medication={medication} {...this.props} />
                    ))}
                </section>
            </>
        )
    }
}