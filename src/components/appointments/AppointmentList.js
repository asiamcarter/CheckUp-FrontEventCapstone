import React, { Component } from "react"
import AppointmentCard from "./AppointmentCard"


export default class AppointmentList extends Component {


    render() {
        // console.log("APT PROPS",this.props)
         const sortedApts = this.props.appointments.sort(function (aptA, aptB) {
            return new Date (aptA.date) - new Date(aptB.date)
        })
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
                    {sortedApts.map(appointment =>
                    (
                        <div key={appointment.id}>
                        <AppointmentCard key={appointment.id} appointment={appointment} {...this.props} />
                        </div>

                    ))}
                </section>
            </>
        )
    }
}