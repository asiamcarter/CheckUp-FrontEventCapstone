import React, { Component } from "react"

export default class NewSymptomForm extends Component {
    state = {
        name: "",
        intensity: "",
        date: "",
        time: "",
        notes: "",
        userId: ""
    }

    handleFieldChange = evt => {
        const stateToChange={};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
        console.log(evt.target, evt.target.value)
    }

//    getDate = function() {
//         var now = new Date();
//         var month = (now.getMonth() + 1);
//         var day = now.getDate();
//         if (month < 10)
//             month = "0" + month;
//         if (day < 10)
//             day = "0" + day;
//         var today = now.getFullYear() + '/' + month + '/' + day;
//         console.log(today)
//     }

    addNewSymptom = evt => {
        evt.preventDefault();
        let d = new Date();
        let day = d.getDate();
        let year = d.getFullYear();
        let month = (d.getMonth() + 1);
        let hours = (d.getHours()-12)
        let minutes = d.getMinutes()
        const newSymptomObject = {
            name: this.state.name,
            intensity: this.state.intensity,
            date: this.state.date,
            time: this.state.time,
            notes: this.state.notes,
            userId: Number(sessionStorage.getItem("User"))
        }
        this.props.addSymptom(newSymptomObject)
        .then(() => this.props.history.push("/track"))
    }
    render() {
        return (
            <>
            <form>
                <h2> Add New Symptom </h2>
                <div>
                    <label htmlFor="name">Name
                    </label>
                    <select id="name" required onChange={this.handleFieldChange}>
                        <option value="nausea">Nausea</option>
                        <option value="cough">Cough</option>
                        <option value="headache">Headache</option>
                        <option value="pain">Pain</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="intensity">Intensity</label>
                    <select id="intensity" required onChange={this.handleFieldChange}>
                        <option value="none">None</option>
                        <option value="mild">Mild</option>
                        <option value="medium">Medium</option>
                        <option value="severe">Severe</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="date">Date</label>
                    <input type="date" required onChange={this.handleFieldChange} id="date" />
                </div>
                <div>
                    <label htmlFor="time">Time</label>
                    <input type="time" id="time" onChange={this.handleFieldChange} />
                </div>
                <div>
                    <label htmlFor="notes">Notes</label>
                    <input type="text" id="notes" onChange={this.handleFieldChange} />
                </div>
                <div>
                    <button type="submit" onClick={this.addNewSymptom} >
                    Add</button>
                </div>
            </form>
            </>
        )
    }
}