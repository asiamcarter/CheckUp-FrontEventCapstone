import React, { Component } from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
export default class NewDoctorForm extends Component {
    state = {
        name: "",
        location: "",
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
        this.setState(stateToChange)
    }

    addDoctor = evt => {
        evt.preventDefault();
        const newDoctor = {
            name: this.state.name,
            location: this.state.location,
            userId: Number(sessionStorage.getItem("User"))
        }
        this.props.postNewDoctor(newDoctor).then(() =>
            this.toggle())
    }

    render() {
        console.log(this.props)
        return (
            <>
                <Button onClick={this.toggle} size="sm" id="add-doctor-button2"> {this.props.buttonLabel}
                    <h1 className="add-h1" id="add-doctor-button">
                        Add Doctor
                            </h1>
                </Button>
                <div className="centerModal">
                    <Modal isOpen={this.state.modal} className="modal-sm" toggle={this.toggle} >
                        <ModalHeader toggle={this.toggle}>Add New Doctor</ModalHeader>
                        <ModalBody >
                            <form>
                                <div>
                                    <label htmlFor="doctor">Name</label>
                                    <input type="text" onChange={this.handleFieldChange} id="name" />
                                    <label htmlFor="location">Location</label>
                                    <input type="text" onChange={this.handleFieldChange} id="location" />
                                </div>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color={this.state.location ? "success" : "primary"} onClick={this.addDoctor}>Save</Button>{' '}
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </>
        )
    }
}