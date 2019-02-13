import React, { Component } from "react"
import { throws } from "assert";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

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
        photo: "",
        modal: false
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

    toggle= () => {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
      }

    getDoctors = () => {
        let doctors = this.props.allDoctors.map(doctor => {

        if (doctor.userId === Number(sessionStorage.getItem("User"))) {
                let doctorId = JSON.parse(doctor.id)
                return (
                <option key={doctorId}  value={doctor.id}>{doctor.name}</option>
                )
            }
        })
        return doctors
    }

    getDoctorLocation = () => {
        let doctors = this.props.allDoctors.map(doctor => {
            if (this.state.doctorId === doctor.id) {
                return (
                    <p key={doctor.id}>{doctor.location}</p>
                )
            }
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
        this.toggle()
    }
    render() {
        console.log("Session User", Number(sessionStorage.getItem("User")))

        return (
            <>
                <Button onClick={this.toggle} color="success" id="add-appointment-button"> {this.props.buttonLabel}
                             <h1 className="add-h1">
                               Add
                            </h1>
                        </Button>



                        <div className="centerModal">
                <Modal isOpen={this.state.modal} toggle={this.toggle} >
                <ModalHeader toggle={this.toggle}>Add New Doctor</ModalHeader>
                <ModalBody >

                <form>

                    <h2>Add New Appointment</h2>
                    <div>
                        <label htmlFor="doctor">Doctor</label>
                        <select id="doctorId" required onChange={this.handleIdFieldChange}>
                        <option>Select your doctor</option>
                            {this.getDoctors()}
                        </select>
                        {this.getDoctorLocation()}
                    </div>

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
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={this.addAppointment}>Save</Button>{' '}
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
                </Modal>
                </div>
            </>
        )

    }
}