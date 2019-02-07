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
        note: "",
        timestamp: "",
        audio: "",
        photo: ""
    }

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    }

    handleIdFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = JSON.parse(evt.target.value);
        this.setState(stateToChange)
    }

    getDoctors = () => {
        let doctors = this.props.allDoctors.map(doctor => {
            let doctorId = JSON.parse(doctor.id)
            return (
                  <option key={doctorId} value={doctor.id}>{doctor.name}</option>

            )
        })
        return doctors
    }

    addAppointment = evt => {
        evt.preventDefault();

        const newAppointmentObject = {
            userId: Number(sessionStorage.getItem("User")),
            doctorId: this.state.doctorId,
            time: this.state.time,
            date: this.state.date,
            reason: this.state.reason,
            note: this.state.note,
            timestamp: this.state.timestamp,
            audio: this.state.audio,
            photo: this.state.photo
        }

        this.props.addAppointment(newAppointmentObject)
            .then(() =>
            this.props.history.push("/appointments"))
    }
    render() {
        console.log(this.state.doctorId)
        return (
            <>
                <form>

                    <h2>Add New Appointment</h2>
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
                        <input type="text" onChange={this.handleFieldChange} id="reason" />
                    </div>

                    <button type="submit" onClick={this.addAppointment} >
                        Add</button>
                </form>
            </>
        )
    }
}