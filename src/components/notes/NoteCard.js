import React, { Component } from "react"
import DataManager from "../../modules/DataManager"
import { Link } from "react-router-dom"

export default class NoteCard extends Component {

    state = {
        userId: "",
        doctorId: "",
        time: "",
        date: "",
        reason: "",
        note: "",
        timestamp: "",
        audio: "",
        photo: "",
        id: ""
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
                audio: appointment.audioDownloadURL,
                photo: appointment.photo,
                id: appointment.id
            })
        })
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


    }

  saveEdits =(evt)=> {

        //get the editable element
        var editElem = document.getElementById("note");

        //get the edited element content
        var userVersion = editElem.innerHTML;

        //save the content to local storage
        this.setState({
            note: userVersion
        })
        console.log(this.state)
        this.editNote(evt)

        }

    render () {
console.log(this.state)

        return (
            <>
            {/* <div> */}

                {/* <Link to={`/note/edit/${this.state.id}`}>Edit</Link> */}
            {/* </div> */}

    <h4>Text</h4>
    <hr/>
   <p contentEditable={true} onMouseLeave={this.saveEdits}
id="note" onChange={this.saveEdits}>
   {this.state.note}</p>
    <h4>Audio</h4>
    <hr/>
                            {this.state.audio === "" ? <></> :
                            <figure>
                            <audio
                                controls
                                src={this.state.audio}>
                                Your browser does not support the
                                <code>audio</code> element.
                            </audio>
                            </figure>
                            }

                        <div className="note-images-div">
                        <h4>Images</h4>
                        <hr />
                        {this.state.photo !== "" ?
                        <img src={this.state.photo} alt="savedbyuser" width="50px" height="50px"/>
                        : ""}
                        </div>

            <button type="button" onClick={()=> this.props.history.push("/appointments")}>Back</button>

            </>
        )

}
}

