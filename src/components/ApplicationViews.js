import React, { Component } from "react"
import NavBar from "./nav/NavBar"
import { Route } from "react-router-dom"
// import { Redirect } from "react-router-dom"
import SymptomList from "./symptoms/SymptomList"
// import Login from "./login/Login"
// import Register from "./login/Register"
import DataManager from "../modules/DataManager"
// import TrackNavBar from "./nav/TrackNavBar"

export default class ApplicationViews extends
Component {

    state= {
        users: [],
        symptoms: [],
        medications: [],
        appointments: [],
        notes: [],
        doctors: []

    }

    componentDidMount() {
        DataManager.getAll("users").then(allUsers => {this.setState({users:allUsers})})
        .then(()=> DataManager.getAll("symptoms")).then(allSymptoms => {this.setState({symptoms:allSymptoms})})
        .then(() => DataManager.getAll("medications")).then(allMedications => {this.setState ({medications: allMedications})})
        .then(() => DataManager.getAll("appointments")).then(allAppointments => {this.setState({appointments: allAppointments})})
        .then(()=> DataManager.getAll("notes")).then(allNotes => {this.setState({notes: allNotes})})
        .then(()=> DataManager.getAll("doctors")).then(allDoctors => {this.setState({doctors:allDoctors})})
        .then(()=> {console.log("componentDidMount:", this.state)})
    }

    isAuthenticated = () => sessionStorage.getItem("User") !== null



    render() {
        return (
            <>
                <NavBar />
                <Route exact path="/track" render={(props) => {
                    return <SymptomList {...props} symptoms={this.props.symptoms} />
                }} />
            </>
        )
    }
}