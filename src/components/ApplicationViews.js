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
import EditMedicationForm from "./medications/EditMedicationForm"
import AppointmentList from "./appointments/AppointmentList"
import NewAppointmentForm from "./appointments/NewAppointmentForm"
import NewDoctorForm from "./doctors/NewDoctorForm"
import NewNoteForm from "./notes/NewNoteForm"
import NoteCard from "./notes/NoteCard"
import EditNoteForm from "./notes/EditNoteForm"
import EditAppointmentForm from "./appointments/EditAppointmentForm"
import TrackChoice from "./symptoms/TrackChoice"
import { Button } from 'reactstrap';
export default class ApplicationViews extends
    Component {

    state = {
        users: [],
        symptoms: [],
        medications: [],
        appointments: [],
        notes: [],
        doctors: [],
        trackedSymptoms: []

    }

    componentDidMount() {
        const newState = {}
        DataManager.getAllUserInfo().then(allUsers => newState.users = allUsers)
            .then(() => DataManager.getAll("symptoms")).then(allSymptoms => newState.symptoms = allSymptoms)
            .then(() => DataManager.getAll("medications")).then(allMedications =>
                newState.medications = allMedications)
            .then(() => DataManager.getAptDoc()).then(allAppointments => newState.appointments = allAppointments)
            // .then(() => DataManager.getAll("notes")).then(allNotes => newState.notes = allNotes)
            .then(() => DataManager.getAll("doctors")).then(allDoctors => newState.doctors = allDoctors)
            .then(()=> DataManager.getAll("trackedSymptoms").then(allSymptoms =>
                newState.trackedSymptoms = allSymptoms))
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

    addTrackedSymptom = (newTrackedSymptom) => {
        return DataManager.postTrackedSymptom(newTrackedSymptom)
        .then(()=> DataManager.getAll("trackedSymptoms"))
        .then(allTrackedSymptoms => {
            this.setState({trackedSymptoms: allTrackedSymptoms})
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
    deleteTrackedSymptom = id => {
        return DataManager.delete(id, "trackedSymptoms").then(() => {
            DataManager.getAll("trackedSymptoms")
                .then(allSymptoms => {
                    this.setState({
                        trackedSymptoms: allSymptoms
                    })

                })
        })
    }
    getAllSymptoms() {
        DataManager.getAll("symptoms")
    }

    getAllTrackedSymptoms() {
       return DataManager.getAll("trackedSymptoms")
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

    //appointments

    deleteAppointment= id => {
        return DataManager.delete(id, "appointments").then(() => {
            DataManager.getAptDoc()
                .then(allAppointments => this.setState({
                    appointments: allAppointments
                }))
        })
    }

    getAllAppointments() {
        return DataManager.getAllAptNotes()
    }

    getAptDocs() {
        return DataManager.getAptDoc()
    }

    addAppointment = (newAppointment) => {
        return DataManager.postAppointment(newAppointment).then(() => {
            DataManager.getAptDoc()
                .then(allAppointments => this.setState({
                    appointments: allAppointments
                }))

        })
    }

    editAppointment = (id, newObject) => {
        return DataManager.putAppointment(id, newObject).then(() => {
            DataManager.getAptDoc().then(allAppointments => this.setState({
                appointments: allAppointments
            }))
        })

    }

    postNewDoctor = (newDoctor) => {
        return DataManager.postNewDoctor(newDoctor).then(() => {
            DataManager.getAll("doctors")
                .then(allDoctors => this.setState({
                    doctors: allDoctors
                }))
        })
    }
    getAllDoctors() {
        return DataManager.getAll("doctors")
    }

    getAppointmentNotes = (appointmentId) => {
        return DataManager.getAppointmentNotes(appointmentId)
    }
    //notes

    postNewNote = (newNote) => {
        return DataManager.postNewNote(newNote).then(() => {
            DataManager.getAll("notes")
                .then(allNotes => this.setState({
                    notes: allNotes
                }))
        })
    }

    render() {
        // console.log("ApplicationViewsState", this.state.appointments)
        // console.log("APPVIEWS STATE", this.state)
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
                    return <Homepage {...props} users={this.state.users} appointments={this.state.appointments} doctors={this.getAptDocs()} />
                }} />
                <Route exact path="/track" render={(props) => {
                    return <TrackChoice {...props} symptoms={this.state.symptoms} addTrackedSymptom={this.addTrackedSymptom} deleteSymptom={this.deleteTrackedSymptom} getAll={this.getAllSymptoms} trackedSymptoms={this.state.trackedSymptoms}/>
                }} />
                <Route exact path="/trackedsymptoms" render={(props)=> {
                    return <SymptomList {...props} symptoms={this.state.symptoms} addSymptom={this.addSymptom} deleteSymptom={this.deleteSymptom} getAll={this.getAllTrackedSymptoms} trackedSymptoms={this.state.trackedSymptoms}/>
                }} />

                <Route exact path="/symptoms/:symptomId/new" render={props => {
                    return <NewSymptomForm {...props} symptoms={this.state.symptoms} addSymptom={this.addSymptom} getAll={this.getAllSymptoms} />
                }} />
                <Route exact path="/meds" render={props => {
                    return <MedicationList {...props} medications={this.state.medications} addMedication={this.addMedication} deleteMedication={this.deleteMedication} getAll={this.getAllMedications} editMedication={this.editMedication} />
                }} />
                <Route exact path="/medications/new" render={props => {
                    return <NewMedicationForm {...props} medications={this.state.medications} addMedication={this.addMedication} getAll={this.getAllMedications} />
                }} />
                <Route exact path="/meds/editmedication/:id" render={(props) => {
                    return <EditMedicationForm {...props} medications={this.state.medications} editMedication={this.editMedication} />
                }} />
                <Route exact path="/appointments" render={(props) => {
                    return <AppointmentList {...props}
                    addAppointment={this.addAppointment}
                    appointments={this.state.appointments}
                    editAppointment={this.editAppointment}
                    getAptNotes={this.getAllAppointments}
                    getAptDocs={this.getAptDocs}
                    getAllDoctors={this.componentDidMount}
                    getAppointmentNotes={this.getAppointmentNotes}
                    doctors={this.state.doctors}
                    postNewDoctor={this.postNewDoctor}
                    allDoctors={this.state.doctors}
                    deleteAppointment={this.deleteAppointment}
                    />
                }} />
                <Route exact path="/appointment/new" render={props => {
                    return <NewAppointmentForm {...props} appointments={this.state.appointments} addAppointment={this.addAppointment} getAptNotes={this.getAllAppointments}
                    allDoctors={this.state.doctors}
                     />
                }} />
                <Route exact path="/doctor/new" render={props => {
                    return <NewDoctorForm {...props} doctors={this.state.doctors} postNewDoctor={this.postNewDoctor}
                     />
                }} />
                <Route exact path="/appointment/newnote/:id" render={props=> {
                    return <NewNoteForm {...props} appointments={this.state.appointments} editAppointment={this.editAppointment}
                  />
                }} />
                <Route exact path="/note/:id" render={props => {
                    return <NoteCard {...props} appointments={this.state.appointments} editAppointment={this.editAppointment}/>
                }} />
                 <Route exact path="/note/edit/:id" render={props => {
                    return <EditNoteForm {...props} appointments={this.state.appointments} editAppointment={this.editAppointment} />
                }} />
                 <Route exact path="/appointments/edit/:id" render={props => {
                    return <EditAppointmentForm {...props} appointments={this.state.appointments} editAppointment={this.editAppointment}
                    allDoctors={this.state.doctors} />
                }} />




            </>
        )
    }
}