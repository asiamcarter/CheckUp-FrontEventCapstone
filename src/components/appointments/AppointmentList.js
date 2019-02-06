import React, { Component } from "react"
import AppointmentCard from "./AppointmentCard"

export default class AppointmentList extends Component {
    render() {
        // const sortedAppointments = this.props.appointments.sort(function (aptA, aptB) {
        //     return new Date(aptA.date) - new Date(aptB.date)
        // })
        return (
            <>
                <div className="appointmentList">
                    <h2>Appointment List</h2>
                    <button type="submit" onClick={() => {
                        this.props.history.push("/appointment/new")
                    }} >
                        Add
                </button>
                </div>
                <section>
                    {this.props.appointments.map(appointment => (

                        <AppointmentCard key={appointment.id} appointment={appointment} {...this.props} />

                    ))}
                </section>
            </>
        )
    }
}