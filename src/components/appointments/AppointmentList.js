import React, { Component } from "react"
import AppointmentCard from "./AppointmentCard"


export default class AppointmentList extends Component {

    render() {
        console.log("LIST PROPS",this.props.appointments)
        return (
            <>
                <div className="appointmentList">
                    <h2>Appointment List</h2>
                    <button type="submit" onClick={() => {
                        this.props.history.push("/appointment/new")
                    }} >
                        Add Appointment
                </button>
                <button type="submit" onClick={()=> {
                    this.props.history.push("/doctor/new")
                }} >
                Add Doctor
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