import React, { Component } from "react"
import { Link } from "react-router-dom"

export default class AppointmentCard extends Component {

    noteButton = () => {
        if (this.props.appointment.note === "") {
            return (
                <>
                    <Link to={`appointment/newnote/${this.props.appointment.id}`}>Add Note</Link>
                    {/* <button type="button" onClick={()=> this.props.history.push("/appointment/newnote")}>
                        Add Note
                    </button> */}
                </>
            )
        } else {
            return (
                <>
                    <Link to={`/note/${this.props.appointment.id}`}>View Note</Link>
                </>
            )
        }

    }

    showUserAppointments = () => {

        // console.log(parseInt(sessionStorage.getItem("User")), this.props.appointment.userId)
        console.log("APT CARD",this.props)
        if (this.props.appointment.userId === parseInt(sessionStorage.getItem("User"))) {
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
                                <hr />
                            </div>
                            <div>
                                <Link to={`/appointments/edit/${this.props.appointment.id}`}>Edit</Link>
                                <p>Date: {this.props.appointment.date}</p>
                                <p>Time: {this.props.appointment.time}</p>
                                <p>Reason: {this.props.appointment.reason}</p>
                                {/* <p>{this.state.notes}</p> */}
                                {this.noteButton()}
                            </div>
                        </div>

                    </div>
                </>

            )
        }
    }
    render() {

        return (
            <>
                {this.showUserAppointments()}
            </>
        )
    }
}