import React, { Component } from "react"
import DataManager from "../../modules/DataManager"

export default class EditMedicationForm extends Component {
    state = {
        name: "",
        date: "",
        time: "",
        quantity: "",
        frequency: "",
        userId: ""
    }


    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
        console.log(this.state.name)
    }

    editMedication = evt => {
        evt.preventDefault();
        const existingMedication = {
            name: this.state.name,
            date: this.state.date,
            time: this.state.time,
            quantity: this.state.quantity,
            frequency: this.state.frequency,
            userId: Number(sessionStorage.getItem("User"))
        }
        this.props.editMedication(this.props.match.params.id, existingMedication)
            .then(() => this.props.history.push("/meds"))
    }

    componentDidMount() {
        DataManager.getById(this.props.match.params.id, "medications").then(allMedications => {
            this.setState({
                name: allMedications.name,
                date: allMedications.date,
                time: allMedications.time,
                quantity: allMedications.quantity,
                frequency: allMedications.frequency,
                userId: allMedications.userId
            })
        })
    }
    render() {
        console.log(this.state.date)
        return (
            <>
                {console.log("NAME:", this.props)}
                <form>
                    <h2>Edit Medication</h2>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="text" onChange={this.handleFieldChange} id="name" placeholder={this.state.name} />
                    </div>
                    <div>
                        <label htmlFor="date">Date</label>
                        <input type="date" onChange={this.handleFieldChange} value={this.state.date} id="date" placeholder={this.state.date} />
                    </div>
                    <div>
                        <label htmlFor="time">Time</label>
                        <input type="time" onChange={this.handleFieldChange} value={this.state.time} id="time" placeholder={this.state.time} />
                    </div>
                    <div>
                        <label htmlFor="quantity">Quantity</label>
                        <input type="text" onChange={this.handleFieldChange} id="quantity" placeholder={this.state.quantity} />
                    </div>
                    {/* <div>
                        <label htmlFor="frequency">Frequency</label>
                        <input type="text" onChange={this.handleFieldChange} id="frequency" placeholder={this.state.frequency} />
                    </div> */}
                    <div>
                        <button type="submit" onClick={this.editMedication}>Submit</button>
                    </div>
                </form>

            </>
        )
    }
}