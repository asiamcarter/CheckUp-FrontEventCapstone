import React, { Component } from "react"
import DataManager from "../../modules/DataManager"

export default class EditAppointmentForm extends Component {
    state = {
        userId: "",
        doctorId: "",
        time: "",
        date: "",
        reason: "",
        note: "",
        timestamp: "",
        audio: "",
        photo: ""
    }

    componentDidMount() {
        DataManager.getById(this.props.match.params.id, "appointments").then(appointment => {
            console.log("appointment", appointment)
            this.setState({
                userId: appointment.userId,
                doctorId: appointment.doctorId,
                time: appointment.time,
                date: appointment.date,
                reason: appointment.reason,
                note: appointment.note,
                timestamp: appointment.timestamp,
                audio: appointment.audio,
                photo: appointment.photo,
                id: appointment.id
            })
        })
    }

    getDoctors = () => {
        let doctors = this.props.allDoctors.map(doctor => {
            let doctorId = JSON.parse(doctor.id)
            if (doctor.userId === Number(sessionStorage.getItem("User"))){
            return (
                  <option key={doctorId} value={doctor.id}>{doctor.name}</option>

            )
            }
        })

        return doctors
    }

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    }
    editAppointment = evt => {
        evt.preventDefault();
        const newAppointmentObject = {
            userId: this.state.userId,
            doctorId: this.state.doctorId,
            time: this.state.time,
            date: this.state.date,
            reason: this.state.reason,
            note: this.state.note,
            timestamp: new Date(),
            audio: this.state.audio,
            photo: this.state.photo,
            id: this.state.id
        }
         this.props.editAppointment(this.props.match.params.id, newAppointmentObject)
         .then(()=> this.props.history.push(`/appointments`))
    }

    render() {
        return (
            <>
             <form>

<h2>Edit Appointment</h2>
<div>
    <label htmlFor="doctor">Doctor</label>
    <select id="doctorId" required onChange={this.handleIdFieldChange}>
        {this.getDoctors()}
    </select>
</div>
{/* <div>
    <label htmlFor="location">Location</label>
    <input type="text" onChange={this.handleFieldChange} id="location" />
</div> */}
<div>
    <label htmlFor="time">Time</label>
    <input type="time" onChange={this.handleFieldChange} id="time" />
</div>
<div>
    <label htmlFor="date">Date</label>
    <input type="date" onChange={this.handleFieldChange} id="date" />
</div>
<div>
    <label htmlFor="reason">Reason</label>
    <input type="text" onChange={this.handleFieldChange} id="reason" placeholder={this.state.reason} />
</div>

<button type="submit" onClick={this.editAppointment} >
    Add</button>
</form>
            </>
        )
    }
}