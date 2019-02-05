import React, { Component } from "react"
import NavBar from "./nav/NavBar"
import { Route } from "react-router-dom"
// import { Redirect } from "react-router-dom"
import SymptomList from "./symptoms/SymptomList"
import Login from "./login/Login"
import Register from "./login/Register"
import DataManager from "../modules/DataManager"
// import TrackNavBar from "./nav/TrackNavBar"
import Homepage from "./homepage/Homepage"
import NewSymptomForm from "./symptoms/NewSymptomForm"
import MedicationList from "./medications/MedicationList"
import NewMedicationForm from "./medications/NewMedicationForm"

export default class ApplicationViews extends
    Component {

    state = {
        users: [],
        symptoms: [],
        medications: [],
        appointments: [],
        notes: [],
        doctors: []

    }

    componentDidMount() {
        const newState = {}
        DataManager.getAll("users").then(allUsers => newState.users = allUsers)
            .then(() => DataManager.getAll("symptoms")).then(allSymptoms => newState.symptoms = allSymptoms)
            .then(() => DataManager.getAll("medications")).then(allMedications => newState.medications = allMedications)
            .then(() => DataManager.getAll("appointments")).then(allAppointments => newState.appointments = allAppointments)
            .then(() => DataManager.getAll("notes")).then(allNotes => newState.notes = allNotes)
            .then(() => DataManager.getAll("doctors")).then(allDoctors => newState.doctors = allDoctors)
            .then(() => this.setState(newState))
            .then(() => { console.log("COMPONENTDIDMOUNT:", this.state) })
    }




    //authentication
    isAuthenticated = () => sessionStorage.getItem("User") !== null
    showNav() {
        if (this.isAuthenticated()) {
            return <NavBar />
        }
    }

    //login/registration
    registerUser(username, password) {
        DataManager.getUsers(username, password)
    }
    getUsers() {
        return DataManager.getAll("users")
    }
    postUser(newUser) {
        return DataManager.postUser(newUser).then(() => DataManager.getAll("users"))
    }
    checkForUser(email, password) {
        return DataManager.checkForUser(email, password)
    }
    //symptoms
    addSymptom = (newSymptom) => {
        return DataManager.postSymptom(newSymptom).then(() => {
            DataManager.getAll("symptoms")
                .then(allSymptoms =>
                    this.setState({
                        symptoms: allSymptoms
                    })
                );
        })
    }
    deleteSymptom = id => {
        return DataManager.delete(id, "symptoms").then(() => {
            DataManager.getAll("symptoms")
                .then(allSymptoms => {
                    this.setState({
                        symptoms: allSymptoms
                    })

                })
        })
    }
    getAllSymptoms() {
        DataManager.getAll("symptoms")
    }
    //medications
    getAllMedications() {
        DataManager.getAll("medications")
    }
    addMedication = (newMedication) => {
        return DataManager.postMedicaton(newMedication).then(() => {
            DataManager.getAll("medications")
                .then(allMedications => this.setState({
                    medications: allMedications
                }))
        })
    }

    deleteMedication = id => {
        return DataManager.delete(id, "medications").then(() => {
            DataManager.getAll("medications")
                .then(allMedications => {
                    this.setState({
                        medications: allMedications
                    })
                })
        })
    }

    editMedication = (id, newMedicationObject) => {
        return DataManager.putMedication(id, newMedicationObject).then(() => {
            DataManager.getAll("medications").then(allMedication => this.setState({
                medications: allMedication
            }))
        })
    }


    render() {
        return (
            <>
                <Route exact path="/" render={(props) => {
                    return <Login {...props} checkForUser={this.checkForUser} users={this.state.users} />
                }} />
                {this.showNav()}
                <Route exact path="/register" render={(props) => {
                    return <Register {...props} getUsers={this.getUsers}
                        postUser={this.postUser} />
                }} />
                <Route exact path="/home" render={(props) => {
                    return <Homepage {...props} users={this.state.users} />
                }} />
                <Route exact path="/track" render={(props) => {
                    return <SymptomList {...props} symptoms={this.state.symptoms} addSymptom={this.addSymptom} deleteSymptom={this.deleteSymptom} getAll={this.getAllSymptoms} />
                }} />
                <Route exact path="/symptoms/new" render={props => {
                    return <NewSymptomForm {...props} symptoms={this.state.symptoms} addSymptom={this.addSymptom} getAll={this.getAllSymptoms} />
                }} />
                <Route exact path="/meds" render={props => {
                    return <MedicationList {...props} medications={this.state.medications} addMedication={this.addMedication} deleteMedication={this.deleteMedication} getAll={this.getAllMedications} editMedication={this.editMedication} />
                }} />
                  <Route exact path="/medications/new" render={props => {
                    return <NewMedicationForm {...props} medications={this.state.medications} addMedication={this.addMedication} getAll={this.getAllMedications} />
                }} />
            </>
        )
    }
}