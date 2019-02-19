import React, { Component } from "react"
import AppointmentCard from "./AppointmentCard"
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

        const sortedApts = this.props.appointments.sort(function (aptA, aptB) {
            return new Date(aptA.date) - new Date(aptB.date)
        })
        let today = Date.now()
        return (
            <>
                <div className="homepage-body">
                    <nav className="navbar sticky-top flex-md-nowrap p-0 shadow ">
                        <div className="container top-nav-bar">
                            <ul className="nav nav-pills nav-fill homepage-top-nav">
                                <li className="nav-item ">
                                    Appointment List
                        </li>
                            </ul>
                        </div>
                    </nav>
                </div>

                <div className="appointmentList">
                    <img src={DoctorIcon} alt="doctor icon" width="70" height="70" className="doctor-icon" />
                    <div>
                        <NewDoctorForm {...this.props} /> <NewAppointmentForm {...this.props} />
                    </div>
                </div>
                <div className="appointments-section">
                    <h4>Upcoming Appointments</h4>
                    <section className="appointment-list">
                        {sortedApts.map(appointment =>
                            Date.parse(`${appointment.date}`) > today ?
                                <div key={appointment.id} id={appointment.id}>
                                    <AppointmentCard key={appointment.id} appointment={appointment} {...this.props} />
                                </div>
                                : "")}
                    </section>
                    <h4 className="prev-appt-header">Previous Appointments</h4>
                    <div className="appointment-list">
                        {sortedApts.map(appointment =>
                            Date.parse(`${appointment.date}`) < today ?
                                <div key={appointment.id} id={appointment.id}>
                                    <AppointmentCard key={appointment.id} appointment={appointment} {...this.props} />
                                </div>
                                : "")}
                    </div>
                </div>
            </>
        )
    }
}