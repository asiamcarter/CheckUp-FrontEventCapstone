//component lists are symptoms added in the database that is associated with the logged in user
import React, { Component } from "react"
import SymptomCard from "./SymptomCard"

export default class SymptomList extends Component {
    render() {
        return (
            <>
            <div className="symptomList">
                <h2>Symptom List</h2>
                <button type="submit" onClick={()=> {
                    this.props.history.push("/symptoms/new")
                }} >
                    Add
                </button>
            </div>

            {this.props.symptoms.map(symptom => (
                <div key={symptom.id}>
                    <SymptomCard symptom={symptom} {...this.props} />
                </div>
            ))}
            </>
        )
    }
}