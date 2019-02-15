import React, { Component } from "react"
import DataManager from "../../modules/DataManager"
import * as firebase from "firebase"


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
        audioDownloadURL: ""
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
                audioDownloadURL: appointment.audioDownloadURL
            })
        })
    }

    onImageSave = (e) => {
        console.log('This is an image: ', e.target.files[0]);

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

              this.setState({
               photo: photosArray
            })
          })

    })}

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
            .then(() => this.props.history.push(`/note/${this.state.id}`))

    }
    render() {
        console.log("THIS IS STATE",this.state)
        return (
            <>






    <h4>Text</h4>
    <hr/>
   <label htmlFor="content"></label>
                    <input type="text" value={this.state.note}required onChange={this.handleFieldChange} id="note" />
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