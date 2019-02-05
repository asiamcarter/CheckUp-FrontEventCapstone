//Component builds cards for each medication added to the medication list
import React, { Component } from "react"
import { Link } from "react-router-dom"

export default class MedicationCard extends Component {
    render() {
        return(
            <>
            {console.log(this.props)}
            <div key={this.props.medication.id}
            className="card">
                <div className="card-body">
                    <h5 className="card-title">
                        {this.props.medication.name}
                        <button type="button" onClick={()=> this.props.deleteMedication(this.props.medication.id)} className="card-link" >
                            Delete
                            </button>
                        <Link to={`/meds/editmedication/${this.props.medication.id}`}>Edit</Link>
                    </h5>
                    <h6>Date:</h6>
                    <p>{this.props.medication.date}</p>
                    <h6>Time</h6>
                    <p>{this.props.medication.time}</p>
                    <h6>Quantity</h6>
                    <p>{this.props.medication.quantity}</p>
                    <h6>Frequency</h6>
                    <p>{this.props.medication.frequency}</p>
                </div>

            </div>

            </>
        )
    }
}