import React, { Component } from "react"
import DataManager from "../../modules/DataManager"
import ReactMicRecord from "react-mic-record"
// import Recorder from 'react-mp3-recorder'

export default class NewNoteForm extends Component {
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
        record: false
    }

    componentDidMount() {
        DataManager.getById(this.props.match.params.id, "appointments").then(appointment => {
            this.setState({
                userId: appointment.userId,
                doctorId: appointment.doctorId,
                time: appointment.time,
                date: appointment.date,
                reason: appointment.reason,
                note: appointment.note,
                timestamp: appointment.timestamp,
                audio: appointment.audio,
                photo: appointment.photo
            })
        })
    }

    startRecording = () => {
        this.setState({
            record: true
        });
    }

    stopRecording = () => {
        this.setState({
            record: false
        });
    }

    onData(recordedBlob) {
        console.log('chunk of real-time data is: ', recordedBlob);
    }

    onStop = (recordedBlob) => {
        console.log('recordedBlob is: ', recordedBlob);
        this.setState({
            audio: recordedBlob
        })
        console.log("state after stop:", this.state)
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
            userId: this.state.userId,
            doctorId: this.state.doctorId,
            time: this.state.time,
            date: this.state.date,
            reason: this.state.reason,
            note: this.state.note,
            timestamp: new Date(),
            audio: this.state.audio,
            photo: this.state.photo
        }
        this.props.editAppointment(this.props.match.params.id, newNoteObject)
            .then(() => this.props.history.push("/appointments"))
    }

    render() {

            console.log("NEW NOTE STATE:", this.state)
            return (
                <>
                    <h2>New Note</h2>
                    <div>
                        <label htmlFor="content">Content</label>
                        <input type="text" required onChange={this.handleFieldChange} id="note" />
                        <button type="submit" onClick={this.addNewNote} >Add</button>

                        <ReactMicRecord
                            record={this.state.record}
                            className="sound-wave"
                            onStop={this.onStop}
                            strokeColor="#000000"
                            backgroundColor="#ffffff" />
                        <button onClick={this.startRecording} type="button">Start</button>
                        <button onClick={this.stopRecording} value="audio" type="button">Stop</button>
                        <figure>
                            <figcaption>Listen:</figcaption>
                            <audio
                                controls
                                src={this.state.audio.blobURL}>
                                Your browser does not support the
            <code>audio</code> element.

    </audio>
                        </figure>



                    </div>

                </>
            )
        }
    }