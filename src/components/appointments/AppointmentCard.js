import React, { Component } from "react"
import { Link } from "react-router-dom"
import EditAppointmentForm from "./EditAppointmentForm"
import NewNoteForm from "../notes/NewNoteForm"

export default class AppointmentCard extends Component {


    noteButton = () => {

        if (this.props.appointment.note === "") {
            return (
                <>
                    <button onClick={()=>{this.props.history.push(`appointment/newnote/${this.props.appointment.id}`)}} id="addAppointmentNote">Add Note</button>
                    <NewNoteForm {...this.props}/>

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

        if (this.props.appointment.userId === parseInt(sessionStorage.getItem("User"))) {
            return (

                <>
                    <div key={this.props.appointment.id}
                        className="card">
                        <div className="card-body" id={this.props.appointment.id}>
                        <button onClick={this.deleteAppointment}>Delete</button>
                            <div id={this.props.appointment.id}>
                                <EditAppointmentForm {...this.props}/>
                                <h4>{this.props.appointment.date}</h4>
                                <p>At {this.props.appointment.time} with {this.props.appointment.doctor.name}</p>
                                <p>{this.props.appointment.doctor.location}</p>
                                <p>{this.props.appointment.reason}</p>
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