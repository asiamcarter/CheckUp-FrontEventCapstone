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
        console.log(stateToChange)
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
        // let d = new Date();
        // let day = d.getDate();
        // let year = d.getFullYear();
        // let month = (d.getMonth() + 1);
        // let hours = (d.getHours()-12)
        // let minutes = d.getMinutes()
        const newSymptomObject = {
            name: this.props.match.params.symptomId,
            intensity: this.state.intensity,
            date: this.state.date,
            time: this.state.time,
            notes: this.state.notes,
            userId: Number(sessionStorage.getItem("User"))
        }
        this.props.addSymptom(newSymptomObject)
        .then(() => this.props.history.push("/trackedsymptoms"))
    }
    render() {
        return (
            <>
            <form>
                <h2> Add New Symptom </h2>
                <div>
                    <h4>{this.props.match.params.symptomId}</h4>
                    {/* <label htmlFor="name">Name
                    </label>
                    <select id="name" required onChange={this.handleFieldChange}>
                        <option value="nausea">Nausea</option>
                        <option value="cough">Cough</option>
                        <option value="headache">Headache</option>
                        <option value="pain">Pain</option>
                    </select> */}
                </div>
                <div className="box">
                    <p className="intensity">Intensity</p>
                    <div className="rating" onChange={this.handleFieldChange} id="intensity">

                        <input type="radio" name="rating" id="none" value="none" /><label htmlFor="none" className="none"
                        >None</label>

                        <input type="radio" name="rating" id="mild" value="mild"/><label htmlFor="mild" className="mild">Mild</label>
                        <input type="radio" name="rating" id="med" value="med"/><label htmlFor="med" className="med">Med</label>
                        <input type="radio" name="rating" id="severe" value="severe"/><label htmlFor="severe" className="severe">Severe</label>

                </div>
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