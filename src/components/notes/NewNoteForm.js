import React, { Component } from "react"

export default class NewNoteForm extends Component {
    state = {
        note: "",
        appointmentId: ""
    }

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
        console.log(evt.target, evt.target.value)

    }



    addNewNote = evt => {
        evt.preventDefault();
        const newNoteObject = {
            note: this.state.note,
            appointmentId: this.props.match.params.id
        }
        this.props.postNewNote(newNoteObject)
            .then(() => this.props.history.push("/appointments"))
    }

    render() {
        console.log(this.props)
        return (
            <>
               <h2>New Note</h2>
               <div>
                   <label htmlFor="content">Content</label>
                   <input type="text" required onChange={this.handleFieldChange} id="note"/>
                   <button type="submit" onClick={this.addNewNote} >Add</button>
               </div>
            </>
        )
    }
}