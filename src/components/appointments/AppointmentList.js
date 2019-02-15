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

    // appointmentPlacement = () => {
    //     {sortedApts.map(appointment =>
    //         (

    //             <div key={appointment.id} id={appointment.id}>
    //             <p>{appointment.date}</p>
    //             <AppointmentCard key={appointment.id} appointment={appointment} {...this.props} />
    //             </div>

    //         ))}
    // }

    render() {

         const sortedApts = this.props.appointments.sort(function (aptA, aptB) {
            return new Date (aptA.date) - new Date(aptB.date)
        })
        let months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
        let today = Date.now()
        let d = new Date();
        let month = d.getMonth();
        let date = d.getDate();
        let year = d.getFullYear();

        let todayDate =  year + "-" + months[month]+ "-" + date
        console.log(sortedApts)




        // let today = Date.parse("2019-02-12")
        console.log(todayDate)
        // let today= Date.now()
        // console.log(today)
        return (
            <>
                <div className="appointmentList">
                <img src={DoctorIcon} alt="doctor icon" width="50" height="50"/>
                    <h2>Appointment List</h2>
                </div>
                <div>


                <NewDoctorForm {...this.props}/>

                </div>

                <h4>Today</h4>
                {sortedApts.map(appointment =>
            appointment.date === todayDate ?
            <div key={appointment.id} id={appointment.id}>
            <AppointmentCard key={appointment.id} appointment={appointment} {...this.props} />
            </div>
    : "")}

                <section className="appointment-list">
                <h4>Upcoming Appointments</h4>
                {sortedApts.map(appointment =>
            Date.parse(`${appointment.date}`) > today ?
            <div key={appointment.id} id={appointment.id}>
            <AppointmentCard key={appointment.id} appointment={appointment} {...this.props} />
            </div>
    : "")}
    <h4>Previous Appointments</h4>
                {sortedApts.map(appointment =>
            Date.parse(`${appointment.date}`) < today ?
            <div key={appointment.id} id={appointment.id}>
            <AppointmentCard key={appointment.id} appointment={appointment} {...this.props} />
            </div>
    : "")}
                </section>

                <NewAppointmentForm {...this.props}/>
            </>
        )
    }
}