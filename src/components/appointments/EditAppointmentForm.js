import React, { Component } from "react"
import DataManager from "../../modules/DataManager"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

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
        photo: "",
        modal: false
    }

    componentDidMount() {
        DataManager.getById(this.props.appointment.id, "appointments").then(appointment => {
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

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
        console.log(stateToChange)
        console.log(this.state)
    }
    editAppointment = (evt) => {
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
         this.props.editAppointment(this.props.appointment.id, newAppointmentObject)
        console.log(evt.target)
         this.toggle()
    }

    render() {
        console.log(this.props)
        return (
            <>

<Button onClick={this.toggle} color="success" id="add-appointment-button"> {this.props.buttonLabel}
                             <h1 className="add-h1">
                               Edit
                            </h1>
                        </Button>



                        <div className="centerModal">
                <Modal isOpen={this.state.modal} toggle={this.toggle} >
                <ModalHeader toggle={this.toggle}>Edit</ModalHeader>
                <ModalBody >

                <form>

                    <h2>Edit Appointment</h2>
                    <div>
    <label htmlFor="doctor">Doctor</label>
    <select id="doctorId" required onChange={this.handleFieldChange}>
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
    <input type="text" onChange={this.handleFieldChange} id="reason" placeholder={this.state.reason} />
</div>
</form>

                </ModalBody>
                <ModalFooter id={this.props.appointment.id}>
                    <Button color="success" onClick={this.editAppointment}>Save</Button>{' '}
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
                </Modal>
                </div>
            </>
        )
    }
}