import React, { Component } from "react"

export default class NewDoctorForm extends Component {
    state = {
        name: "",
        location: ""
    }

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange)
    }

    addDoctor = evt => {
        evt.preventDefault();
        const newDoctor = {
            name: this.state.name,
            location: this.state.location,
            userId: Number(sessionStorage.getItem("User"))
        }
        this.props.postNewDoctor(newDoctor).then(() =>
            alert("You're doctor has been added!"),
            this.props.history.push("/appointments"))
    }

    render() {
        return (
            <>
            <form>
                <h2>Add New Doctor</h2>
                <div>
                    <label htmlFor="doctor">Name</label>
                    <input type="text" onChange={this.handleFieldChange} id="name"/>
                    <label htmlFor="location">Location</label>
                    <input type="text" onChange={this.handleFieldChange} id="location"/>
                </div>
                <button type="submit" onClick={this.addDoctor}>Add</button>
                </form>
            </>
        )
    }
}