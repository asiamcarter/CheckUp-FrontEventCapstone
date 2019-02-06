import React, { Component } from "react"
import { Link } from "react-router-dom"

export default class AppointmentCard extends Component {
    render() {
        console.log(this.props)
        return (
            <>
                <div key={this.props.appointment.id}
                    className="card">
                    <div className="card-body">
                    <div>
                        <h5 className="card-title">
                        {this.props.appointment.doctor.name}
                        </h5>
                        <p>{this.props.appointment.doctor.location}</p>
                        <hr/>
                    </div>
                    <div>
                    <Link to={`/appointments/editappointment/${this.props.appointment.id}`}>Edit</Link>
                    <p>Date: {this.props.appointment.date}</p>
                    <p>Time: {this.props.appointment.time}</p>
                    <p>Reason: {this.props.appointment.reason}</p>
                    </div>





                        {/* <h6>Date:</h6>
                        <p>{this.props.medication.date}</p>
                        <h6>Time</h6>
                        <p>{this.props.medication.time}</p>
                        <h6>Quantity</h6>
                        <p>{this.props.medication.quantity}</p>
                        <h6>Frequency</h6>
                        <p>{this.props.medication.frequency}</p> */}
                    </div>

                </div>
            </>
        )
    }
}