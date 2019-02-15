//Component builds cards for each medication added to the medication list
import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Button } from 'reactstrap';


export default class MedicationCard extends Component {
    state = {
        textValue : "Take Dose",
        buttonPressed: false,

    }

    takeDosePressed = () => {

        let today = new Date();
        let time = today.toLocaleTimeString('en-US')
        this.setState({
            textValue: `Taken at ${time}`,
            buttonPressed: true
        })
    }

    updateMeds = () => {

    }

    showUsersMedications = () => {
        console.log(this.props.medication.userId, Number(sessionStorage.getItem("User")))
        if (this.props.medication.userId === Number(sessionStorage.getItem("User"))) {
            return (
                <>
                    <div key={this.props.medication.id}
                        className="card">
                        <div className="card-body">
                        <div className="medication-name-and-edit">
                            <h5 className="card-title">
                                {this.props.medication.name}
                                </h5>
                                <Link to={`/meds/editmedication/${this.props.medication.id}`}>Edit</Link>
                                <button type="button"  onClick={() => this.props.deleteMedication(this.props.medication.id)} className="card-link" >
                                    x
                            </button>

                            </div>
                            {/* <h6>Date:</h6>
                            <p>{this.props.medication.date}</p> */}
                            {/* <h6>Time</h6>
                            <p>{this.props.medication.time}</p> */}
                            <h6>Quantity</h6>
                            <p>{this.props.medication.quantity}</p>
                            {/* <h6>Frequency</h6>
                            <p>{this.props.medication.frequency}</p> */}
                        </div>
                        <Button type="button" color={this.state.buttonPressed === true ? "info" : "danger" } id="take-dose-button" onClick={ this.takeDosePressed} className="card-link" >
                                    {this.state.textValue}
                            </Button>

                    </div>
                </>
            )
        }
    }
    render() {



        console.log("STATE",this.state)
        this.updateMeds()
        return (
            <>
                {this.showUsersMedications()}

            </>
        )
    }
}