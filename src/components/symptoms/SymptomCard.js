//Component builds cards for each symptom added to the symptom list
import React, { Component } from "react"

export default class SymptomCard extends Component {
//function checks to see if logged in userid matches the sessionstorage id of the symptom and if it does, renders that symptom card to the DOM
    showUsersSymptoms = () => {
        if (this.props.symptom.userId === Number(sessionStorage.getItem("User"))) {
            return (
                <>
                {/* {console.log("SYMPTOMS:",this.props)} */}
                <div key= {this.props.symptom.id} className="card">
                    <div className="card-body">
                        <h5 className="card-title">
                            {this.props.symptom.name}
                            <button type="button" onClick={() => this.props.deleteSymptom(this.props.symptom.id)}
                                className="card-link" >
                                Delete
                        </button>
                        </h5>
                        <h6>Intensity:</h6>
                        {this.props.symptom.intensity}
                        <h6>Date:</h6>
                        <p>{this.props.symptom.date}</p>
                        <h6>Time:</h6>
                        <p>{this.props.symptom.time}</p>
                        <h6>Notes:</h6>
                        <p>{this.props.symptom.notes}</p>
                    </div>
                </div>
            </>

            )
        }
    }
    render() {
        return (
            <>
            {this.showUsersSymptoms()}
            </>
        )
    }
}
