import React, { Component } from "react"
import DataManager from "../../modules/DataManager"
import * as firebase from "firebase"
import mic from "../../images/notes/microphone.png"
import camera from "../../images/notes/camera.png"
import note from "../../images/notes/edit.png"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ReactMicRecord from "react-mic-record"


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
        photo: [],
        record: false,
        audioDownloadURL: "",
        modal: false
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
                id: appointment.id,

            })
        })
    }

    onImageSave = (e) => {
        console.log('This is an image: ', e.target.files[0]);

        let file = e.target.files[0]
        //file name to save in database

        //reference to the file location on firebase
        let uploadedPhoto = firebase.storage().ref("/photos/" + e.target.files[0].name)
        //uploading the song
        let task = uploadedPhoto.put(file)
        //an open connection to the status of that upload
        task.on('state_changed', (snapshot) => {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED:
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING:
                    console.log('Upload is running');
                    break;
                default: //
            }
        }, (error) => {
            console.log(error)
        },
            () => {
                //getting the download url
                task.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    //setting the download url and file name to state
                    let photosArray = []
                    photosArray.push(downloadURL)

                    this.setState({
                        photo: photosArray
                    })
                })

            })
    }

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    }

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
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
        let file = recordedBlob.blob
        //file name to save in database

        //reference to the file location on firebase
        let uploadedAudio = firebase.storage().ref("/audio/" + recordedBlob.blobURL)
        //uploading the song
        let task = uploadedAudio.put(file)
        //an open connection to the status of that upload
        task.on('state_changed', (snapshot) => {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED:
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING:
                    console.log('Upload is running');
                    break;
                default: //
            }
        }, (error) => {
            console.log(error)
        },
            () => {
                //getting the download url
                task.snapshot.ref.getDownloadURL().then((downloadURL) => {

                    //setting the download url and file name to state
                    this.setState({
                        audio: downloadURL
                    })
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
            .then(() => this.props.history.push(`/note/${this.state.id}`))

    }
    render() {
        return (
            <>
                <h2>Edit Note</h2>
                <div>
                    <button id="myModal" onClick={this.toggle} data-toggle="modal" data-target="#modal-one">
                        <img src={mic} alt="microphone icon" height="50px" width="50px" id="mic-icon" />
                    </button>
                    <Modal id="modal-one" isOpen={this.state.modal} toggle={this.toggle} >
                        <ModalHeader toggle={this.toggle}>Audio</ModalHeader>
                        <ModalBody >
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
                                    src={this.state.audio}>
                                    Your browser does not support the
                                <code>audio</code> element.
                            </audio>
                            </figure>

                        </ModalBody>
                        <ModalFooter>
                            <Button color="success" onClick={(evt) => this.editNote(evt)}>Save</Button >{' '}
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
            <button onClick={() => {
                this.setState({
                    photoButtonClicked: true
                })
            }} id="myModal2" data-toggle="modal">
                <img src={camera} alt="camera icon" height="50px" width="50px" id="camera-icon" />
            </button>


            {this.state.photoButtonClicked === true ?

                <input type="file" accept="image/*" capture multiple onChange={(e) => this.onImageSave(e)}></input>
                : <></>}

            <button onClick={this.toggle}>
                <img src={note} alt="note icon" height="50px" width="50px" id="note-icon" />
            </button>


            <label htmlFor="content">CONTENT</label>
            <input type="text" required onChange={this.handleFieldChange} id="note" value={this.state.note} />


            <h4>Listen</h4>
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
                    this.state.photo.map(photo => {
                        console.log(photo)
                        return (
                            <img src={photo} alt="savedbyuser" key={photo} width="50px" height="50px" />)
                    })
                    : ""}
            </div>

            <button type="submit" onClick={(evt) => this.editNote(evt)} >Save</button>
        </div>



































            </>
        )
    }
}