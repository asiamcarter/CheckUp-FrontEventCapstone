import React, { Component } from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "./Symptoms.css"
export default class NewSymptomForm extends Component {
    state = {
        name: "",
        intensity: "",
        date: "",
        time: "",
        notes: "",
        userId: "",
        modal: false
    }

    handleFieldChange2 = evt => {
        const stateToChange = {};
        stateToChange[evt.target.className] = evt.target.value;
        this.setState(stateToChange);
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

    addNewSymptom = evt => {
        evt.preventDefault();
        const newSymptomObject = {
            name: this.props.match.params.symptomId,
            intensity: this.state.intensity,
            date: this.state.date,
            notes: this.state.notes,
            userId: Number(sessionStorage.getItem("User"))
        }
        this.props.addSymptom(newSymptomObject)
            .then(() => this.props.history.push("/trackedsymptoms"))
    }

    render() {
        return (
            <>
                <form>
                    <h2> Add New Symptom </h2>
                    <div>
                        <h4>{this.props.match.params.symptomId}</h4>
                    </div>
                    <div className="box">
                        <p className="intensity">Intensity</p>
                        <div className="rating" onChange={this.handleFieldChange2} id="intensity">
                            <input type="radio" name="rating" id="none" value="none" className="intensity" />
                            <label htmlFor="none" className="none"
                            >None
                            </label>
                            <input type="radio" name="rating" id="mild" value="mild" className="intensity" />
                            <label htmlFor="mild" className="mild">
                                Mild
                            </label>
                            <input type="radio" name="rating" id="med" value="med" className="intensity" />
                            <label htmlFor="med" className="med">
                                Med
                            </label>
                            <input type="radio" name="rating" id="severe" value="severe" className="intensity" />
                            <label htmlFor="severe" className="severe">
                                Severe
                            </label>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="date">Date</label>
                        <input type="date" required onChange={this.handleFieldChange} id="date" />
                    </div>
                    <div>
                        <label htmlFor="notes">Notes</label>
                        <input type="text" id="notes" onChange={this.handleFieldChange} />
                    </div>
                    <div>
                    </div>
                </form>
                <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}
                    Add
                </Button>
                <div className="centerModal">
                    <Modal isOpen={this.state.modal} className="modal-sm modalSize" toggle={this.toggle} >
                        <ModalHeader toggle={this.toggle}>You're All Set!</ModalHeader>
                        <ModalBody >
                            We recommend that you check-in daily
                         </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.addNewSymptom}>Save</Button>{' '}
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </>
        )
    }
}