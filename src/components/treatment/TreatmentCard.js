import React, { Component } from "react"
import { Link } from "react-router-dom"

export default class MedicationCard extends Component {

    showUsersTreatments = () => {
        let doctor = this.props.doctors.find(doctor => {
            return (doctor.id === this.props.treatment.appointment.doctorId)
        })

        console.log(this.props.treatment.userId, Number(sessionStorage.getItem("User")))
        if (this.props.treatment.userId === Number(sessionStorage.getItem("User"))) {
            return (
                <>
                  <Link to={`/treatments/${this.props.treatment.id}`}>
                    <div key={this.props.treatment.id}
                        className="card">
                        <div className="card-body">
                            <div className="medication-name-and-edit">
                                <h5 className="card-title">
                                    Tracking: {this.props.treatment.treatmentSymptom.name}
                                </h5>
                                <p> as it relates to {this.props.treatment.medication.name}</p>
                                <p>With {doctor.name}</p>
                                <button type="button" onClick={() => this.props.deleteTreatment(this.props.treatment.id)} className="card-link" >
                                    x
                            </button>
                            </div>
                            {/* <h6>Time</h6>
                            <p>{this.props.medication.time}</p>
                            <h6>Quantity</h6>
                            <p>{this.props.medication.quantity}</p> */}
                            {/* <h6>Frequency</h6>
                            <p>{this.props.medication.frequency}</p> */}
                        </div>
                    </div>
                  </Link>
                </>
            )
        }
    }
    render() {

        console.log(this.props.treatment, "TREATMENT")
        console.log("doctors id", this.props.doctors[0].id, "appointment dr id", this.props.treatment.appointment.doctorId)
        return (
            <>
                {this.showUsersTreatments()}
            </>
        )
    }
}