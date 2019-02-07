import React, { Component } from "react"
import DataManager from "../../modules/DataManager"

export default class EditNoteForm extends Component {
    state = {
        userId: "",
        doctorId: "",
        time: "",
        date: "",
        reason: "",
        note: "",
        timestamp: "",
        audio: "",
        photo: ""
    }

    componentDidMount() {
        DataManager.getById(this.props.match.params.id, "appointments").then(appointment => {
            console.log("appointment", appointment)
            this.setState({
                userId: appointment.userId,
                doctorId: appointment.doctorId,
                time: appointment.time,
                date: appointment.date,
                reason: appointment.reason,
                note: appointment.note,
                timestamp: appointment.timestamp,
                audio: appointment.audio,
                photo: appointment.photo,
                id: appointment.id
            })
        })
    }

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    }

    editNote = evt => {
        evt.preventDefault();
        const newNoteObject = {
            userId: this.state.userId,
            doctorId: this.state.doctorId,
            time: this.state.time,
            date: this.state.date,
            reason: this.state.reason,
            note: this.state.note,
            timestamp: new Date(),
            audio: this.state.audio,
            photo: this.state.photo,
            id: this.state.id
        }
         this.props.editAppointment(this.props.match.params.id, newNoteObject)
         .then(()=> this.props.history.push(`/note/${this.state.id}`))

    }
 render() {
     console.log(this.state)
     return (
         <>
         <h2>Edit Note</h2>
               <div>
                   <label htmlFor="content">Content</label>
                   <input type="text" required onChange={this.handleFieldChange} id="note"/>
                   <button type="submit" onClick={this.editNote} >Save</button>
               </div>
         </>
     )
 }
}