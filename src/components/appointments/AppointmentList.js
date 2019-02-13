import React, { Component } from "react"
import AppointmentCard from "./AppointmentCard"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "./Appointment.css"
import DoctorIcon from "../../images/appointments/doctor.png"
import NewDoctorForm from "../doctors/NewDoctorForm"
import NewAppointmentForm from "./NewAppointmentForm"


export default class AppointmentList extends Component {
    state = {
        modal: false
    }

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange)
    }

    render() {
        console.log("APT PROPS",this.state)
         const sortedApts = this.props.appointments.sort(function (aptA, aptB) {
            return new Date (aptA.date) - new Date(aptB.date)
        })
        return (
            <>
                <div className="appointmentList">
                <img src={DoctorIcon} alt="doctor icon" width="50" height="50"/>
                    <h2>Appointment List</h2>
                </div>
                <div>


                <NewDoctorForm {...this.props}/>

                </div>

                <section className="appointment-list">
                    {sortedApts.map(appointment =>
                    (
                        <div key={appointment.id}>
                        <AppointmentCard key={appointment.id} appointment={appointment} {...this.props} />
                        </div>

                    ))}
                </section>

                <NewAppointmentForm {...this.props}/>
            </>
        )
    }
}