import React, { Component } from "react"
import DataManager from "../../modules/DataManager"
import ReactMicRecord from "react-mic-record"
import * as firebase from "firebase"
import mic from "../../images/notes/microphone.png"
import camera from "../../images/notes/camera.png"
import note from "../../images/notes/edit.png"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';



export default class NewNoteForm extends Component {
    state = {
        userId: "",
        doctorId: "",
        time: "",
        date: "",
        reason: "",
        note: "",
        timestamp: "",
        audioDownloadURL: "",
        photo: [],
        record: false,
        audio: "",
        stream: "",
        modal: false,
        photoButtonClicked: false
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
                photo: appointment.photo,
                audio: appointment.audio,
            })
        })
    }


    toggle= () => {
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
        let uploadedAudio = firebase.storage().ref("/audio/"+ recordedBlob.blobURL)
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

    onImageSave = (e) => {
        console.log('This is an image: ', e.target.files);
        let file = e.target.files[0]
        //file name to save in database

        //reference to the file location on firebase
        let uploadedPhoto = firebase.storage().ref("/photos/"+ e.target.files[0].name)
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
              let photosArray= []
              photosArray.push(downloadURL)
              console.log(photosArray)

              this.setState({
               photo: photosArray
            })
          })

    })}

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
            uploadedFileName: this.state.uploadedFileName,
            audio: this.state.audio,
            photo: this.state.photo
        }
        this.props.editAppointment(this.props.match.params.id, newNoteObject)
        this.toggle()

            // .then(() => this.props.history.push(`/note/${this.props.match.params.id}`))
    }

    addNewNote2 = evt => {
        evt.preventDefault();
        const newNoteObject = {
            userId: this.state.userId,
            doctorId: this.state.doctorId,
            time: this.state.time,
            date: this.state.date,
            reason: this.state.reason,
            note: this.state.note,
            timestamp: new Date(),
            uploadedFileName: this.state.uploadedFileName,
            audioDownloadURL: this.state.audioDownloadURL,
            photo: this.state.photo
        }
        this.props.editAppointment(this.props.match.params.id, newNoteObject)


            .then(() => this.props.history.push(`/note/${this.props.match.params.id}`))
    }

    render() {

        console.log("NEW NOTE STATE:", this.state, "PROPS:", this.props)
        return (
            <>
                    <h2>New Note</h2>
                    <div>
                        <button id="myModal" onClick={this.toggle} data-toggle="modal" data-target="#modal-one">
                        <img src={mic} alt="microphone icon" height="50px" width="50px" id="mic-icon"/>
                        </button>
                        <Modal id="modal-one"isOpen={this.state.modal} toggle={this.toggle} >
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
                                src={this.state.audioDownloadURL}>
                                Your browser does not support the
                                <code>audio</code> element.
                            </audio>
                            </figure>

                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={this.addNewNote}>Save</Button >{' '}
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
                </Modal>


                <button onClick={()=>{this.setState({
                    photoButtonClicked : true
                })}} id="myModal2" data-toggle="modal">
                        <img src={camera} alt="camera icon" height="50px" width="50px" id="camera-icon"/>
                </button>

                {/* <Modal id="myModal2" isOpen={this.state.modal} toggle={this.toggle} >
                <ModalHeader toggle={this.toggle}>Photo/Files</ModalHeader>
                <ModalBody id="myModal2" > */}
                {this.state.photoButtonClicked === true ?

                <input type="file" accept="image/*" capture multiple onChange={(e)=> this.onImageSave(e)}></input>
                : <></>}


                {/* </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={this.addNewNote}>Save</Button >{' '}
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
                </Modal> */}





                <button onClick={this.toggle}>
                        <img src={note} alt="note icon" height="50px" width="50px" id="note-icon"/>
                        </button>


                        <label htmlFor="content">CONTENT</label>
                        {/* <input type="text" required onChange={this.handleFieldChange} id="note" /> */}
                        <textarea id="note" name="multiliner" rows="2" cols="20" wrap="hard" onChange={this.handleFieldChange}></textarea>



                         {/* <ReactMicRecord
                            record={this.state.record}
                            className="sound-wave"
                            onStop={this.onStop}
                            strokeColor="#000000"
                            backgroundColor="#ffffff" />
                            <button onClick={this.startRecording} type="button">Start</button>
                        <button onClick={this.stopRecording} value="audio" type="button">Stop</button> */}
                         <h4>Listen</h4>
                            {this.state.audioDownloadURL === "" ? <></> :
                            <figure>
                            <audio
                                controls
                                src={this.state.audioDownloadURL}>
                                Your browser does not support the
                                <code>audio</code> element.
                            </audio>
                            </figure>
                            }

                        <div className="note-images-div">
                        <h4>Images</h4>
                        <hr />
                        {this.state.photo !== "" ?
                        this.state.photo.map(photo =>{
                            console.log(photo)
                            return(
                        <img src={photo} alt="savedbyuser" width="50px" height="50px"/>)})
                        : ""}
                        </div>

<button type="submit" onClick={this.addNewNote2} >Add</button>
                    </div>


                </>
            )
        }
    }
