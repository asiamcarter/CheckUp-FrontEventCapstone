import React, { Component } from "react"
import { Link } from "react-router-dom"
import EditAppointmentForm from "./EditAppointmentForm"

export default class AppointmentCard extends Component {


    noteButton = () => {

        if (this.props.appointment.note === "") {
            return (
                <>
                    <button onClick={()=>{this.props.history.push(`appointment/newnote/${this.props.appointment.id}`)}} id="addAppointmentNote">Add Note</button>

                </>
            )
        } else {
            return (
                <>
                    <button onClick={()=>{this.props.history.push(`/note/${this.props.appointment.id}`)}} id="viewAppointmentNote">View Note</button>
                </>
            )
        }

    }

    deleteAppointment = (e) => {
        this.props.deleteAppointment(e.target.parentNode.id)

    }

    showUserAppointments = () => {

        // console.log(parseInt(sessionStorage.getItem("User")), this.props.appointment.userId)
        console.log(this.props.appointment)

        if (this.props.appointment.userId === parseInt(sessionStorage.getItem("User"))) {
            return (

                <>
                    <div key={this.props.appointment.id}
                        className="card">
                        <div className="card-body" id={this.props.appointment.id}>
                        <button onClick={this.deleteAppointment}>Delete</button>
                            {/* <div>
                                <h5 className="card-title">
                                    {this.props.appointment.doctor.name}
                                </h5>
                                <p>{this.props.appointment.doctor.location}</p>
                                <hr />
                            </div> */}
                            <div>
                                <EditAppointmentForm {...this.props}/>
                                <Link to={`/appointments/edit/${this.props.appointment.id}`}>Edit</Link>
                                <h4>{this.props.appointment.date}</h4>
                                <p>At {this.props.appointment.time} with {this.props.appointment.doctor.name}</p>
                                <p>{this.props.appointment.doctor.location}</p>
                                <p>{this.props.appointment.reason}</p>
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