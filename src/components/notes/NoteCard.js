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
                audio: appointment.songDownloadURL,
                photo: appointment.photo,
                id: appointment.id
            })
        })
    }



    render () {

        return (
            <>
            <div>
                <p>{this.state.note}</p>
                <Link to={`/note/edit/${this.state.id}`}>Edit</Link>
            </div>
            <figcaption>Listen:</figcaption>
            {/* <audio controls>
  <source src={this.state.audio}/>

</audio> */}
        <audio
        controls
        src={this.state.audio}>
            Your browser does not support the
            <code>audio</code> element.
    </audio>

            <button type="button" onClick={()=> this.props.history.push("/appointments")}>Back</button>

            </>
        )

}
}

