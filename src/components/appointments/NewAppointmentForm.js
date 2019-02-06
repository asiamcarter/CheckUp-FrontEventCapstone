import React, { Component } from "react"

export default class NewAppointmentForm extends Component {
    state = {
        userId: "",
        doctorId: "",
        name: "",
        location: "",
        time: "",
        date: "",
        reason: "",
        noteId: ""
    }

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    }

    addAppointment = evt => {
        evt.preventDefault();

        const newAppointmentObject = {
            userId: Number(sessionStorage.getItem("User")),
            doctorId: this.state.doctorId,
            time: this.state.time,
            date: this.state.date,
            reason: this.state.reason,
            noteId: this.state.noteId
        }

            this.props.addAppointment(newAppointmentObject)
            .then(() => this.props.history.push("/appointments"))
    }
    render() {
        console.log(this.props)
        return (
            <>
                <form>
                    <h2>Add New Appointment</h2>
                    <div>
                        <label htmlFor="doctor">Doctor</label>
                        <input type="text" onChange={this.handleFieldChange} id="name" />
                        <label htmlFor="location">Location</label>
                        <input type="text" onChange={this.handleFieldChange} id="location" />
                    </div>
                    <button type="submit" onClick={this.addAppointment} >
                    Add</button>
                </form>
            </>
        )
    }
}