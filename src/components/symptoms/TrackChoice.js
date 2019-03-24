import React, { Component } from "react"
import "./Symptoms.css"
import { Link } from "react-router-dom"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
export default class TrackChoice extends Component {
    state = {
        symptoms: [],
        modal: false
    }

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }
    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);

    }

    addSymptomToDatabase = () => {
        this.props.addTrackedSymptom()
    }

    addSymptomSave = () => {
        this.props.history.push(`/symptoms/${this.state.symptoms}/new`)
        let user = Number(sessionStorage.getItem("User"))
        let newSymptomToAdd = {
            name: this.state.symptoms,
            userId: user
        }
        this.props.addTrackedSymptom(newSymptomToAdd)
    }

    deleteSymptom = (e) => {
        this.props.deleteSymptom(e.target.parentNode.id)
    }

    test = () => {
        let sortedSymptom = this.props.trackedSymptoms.filter(symptom => {
            return (symptom.userId === Number(sessionStorage.getItem("User")))
        })
        let sorted = sortedSymptom.map(symptom => {
            return (
                <div key={symptom.id} className="list-group my-list-group right">
                    <div key={symptom.id} className="list-group-item" id={symptom.id}>
                        <Link to={`/symptoms/${symptom.name}/new`} id="track-link">
                            <h1 className="nausea-h1" id="nausea">
                                {symptom.name}
                            </h1>
                        </Link>
                        <button onClick={this.deleteSymptom}>Delete</button>
                    </div>
                </div>
            )
        })
        return sorted
    }

    render() {
        return (
            <>
                <nav className="navbar fixed-top navbar-light light-blue flex-md-nowrap p-0 shadow">
                    <div className="container">
                        <ul className="nav nav-pulls nav-fill">
                            <li className="nav-item">
                                TRACK
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="symptom-container">
                    <h5 className="symptom-question">What symptom would you like to track?</h5>
                    <div className="symptom-name-container">
                    </div>
                </div>
                <div className="container">
                    <div className="list-group my-list-group right">
                        <div className="list-group-item" id="nausea">
                            <Link to={"/symptoms/Nausea/new"} id="track-link">
                                <h1 className="nausea-h1" id="nausea">
                                    Nausea
                                </h1>
                            </Link>
                        </div>
                        <div className="list-group-item" id="Blood Pressure">
                            <Link to={"/symptoms/Blood Pressure/new"} id="track-link">
                                <h1 className="weight-h1" id="Blood Pressure">
                                    Blood Pressure
                                </h1>
                            </Link>
                        </div>
                        <div className="list-group-item" id="pain">
                            <Link to={"/symptoms/Pain/new"} id="track-link">
                                <h1 className="pain-h1" id="pain">
                                    Pain
                                </h1>
                            </Link>
                        </div>

                        <>
                            {this.test()}
                        </>

                        <div className="list-group-item" id="add">
                            <Button color="none" onClick={this.toggle}> {this.props.buttonLabel}
                                <h1 className="add-h1" id="add">
                                    +
                            </h1>
                            </Button>
                            <div className="centerModal">
                                <Modal isOpen={this.state.modal} className="modal-sm" toggle={this.toggle} >
                                    <ModalHeader toggle={this.toggle}>What symptom would you like to track?</ModalHeader>
                                    <ModalBody >
                                        <div>
                                            <label htmlFor="symptom">Symptom</label>
                                            <input type="text" id="symptoms" onChange={this.handleFieldChange} />
                                        </div>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="primary" onClick={this.addSymptomSave}>Save</Button>{' '}
                                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                                    </ModalFooter>
                                </Modal>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
