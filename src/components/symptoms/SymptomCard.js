//Component builds cards for each symptom added to the symptom list
import React, { Component } from "react"
import deleteIcon from "../../images/symptoms/delete.png"


export default class SymptomCard extends Component {
//function checks to see if logged in userid matches the sessionstorage id of the symptom and if it does, renders that symptom card to the DOM

    intensityRender = () => {
        if (this.props.symptom.intensity === "none") {

        }
    }

    // <div className={"btn-group pull-right " + (this.props.showBulkActions ? 'show' : 'hidden')}>

    showUsersSymptoms = () => {
        if (this.props.symptom.userId === Number(sessionStorage.getItem("User"))) {
            return (
                <>
                {/* {console.log("SYMPTOMS:",this.props)} */}
                <div key= {this.props.symptom.id} className="card symptom-list-card">
                    <div className={"card-body " + (this.props.symptom.intensity==="none" ?  "none" : this.props.symptom.intensity === "mild" ? "mild" : this.props.symptom.intensity==="med" ? "med" :  "severe")}>
                    <div className="symptom-card-body">
                        <h4 className="card-title">
                            {this.props.symptom.name}
                            <div className="symptom-card-button">
                            <button type="button symptom-list-delete" onClick={() => this.props.deleteSymptom(this.props.symptom.id)}
                                className="card-link" >
                                <img src={deleteIcon} width="10px" height="10px" alt="delete icon"/>

                        </button>
                        </div>
                        </h4>
                        <h6>{this.props.symptom.date}</h6>
                        <p>{this.props.symptom.notes}</p>
                        </div>
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
