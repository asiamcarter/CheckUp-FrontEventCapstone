//Component builds cards for each symptom added to the symptom list
import React, { Component } from "react"

export default class SymptomCard extends Component {

    render() {
        return (
            <>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">
                            {this.props.symptom.name}
                            <button type="button" onClick={() => this.props.deleteSymptom(this.props.symptom.id)}
                                className="card-link" >
                                Delete
                        </button>
                        </h5>
                        <h6>Intensity:</h6>
                        {this.props.symptom.intensity}
                        <h6>Date:</h6>
                        <p>{this.props.symptom.date}</p>
                        <h6>Time:</h6>
                        <p>{this.props.symptom.time}</p>
                        <h6>Notes:</h6>
                        <p>{this.props.symptom.notes}</p>
                    </div>
                </div>
            </>
        )
    }
}
