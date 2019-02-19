import React, { Component } from "react"
import AddToCalendar from 'react-add-to-calendar';
export default class NewMedicationForm extends Component {
    state = {
        name: "",
        date: "",
        time: "",
        quantity: "",
        frequency: "",
        userId: ""
    }

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    }

    addNewMedication = evt => {
        evt.preventDefault();
        const newMedicationObject = {
            name: this.state.name,
            date: this.state.date,
            time: this.state.time,
            quantity: this.state.quantity,
            frequency: this.state.frequency,
            userId: Number(sessionStorage.getItem("User")),
        }
        this.props.addMedication(newMedicationObject)
            .then(() => this.props.history.push("/meds"))
    }
    render() {
        let event = {
            title: `Take ${this.state.quantity} ${this.state.name}`,
            description: "Don't forget to take your medicine! If you need an accountability partner, add guests to this event so they will also be notified",
            location: "Anywhere",
            startTime: `${this.state.date}`,
            endTime: `${this.state.date}`
        }
        return (
            <>
                <h2> Add New Medication</h2>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" required onChange={this.handleFieldChange} id="name" />
                </div>
                <div>
                    <label htmlFor="date">Date</label>
                    <input type="date" required onChange={this.handleFieldChange} id="date" />
                </div>
                <div>
                    <label htmlFor="time">Time</label>
                    <input type="time" required id="time" onChange={this.handleFieldChange} />
                </div>
                <div>
                    <label htmlFor="quantity">Quantity</label>
                    <input type="text" required id="quantity" onChange={this.handleFieldChange} />
                </div>
                {/* <label htmlFor="frequency">Frequency</label>
            <input type="text" required id="frequency" onChange={this.handleFieldChange} /> */}
                <div>
                    <button type="submit" onClick={this.addNewMedication} >
                        Add
                </button>
                    <AddToCalendar event={event} />
                </div>
            </>
        )
    }
}