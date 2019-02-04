import React, { Component } from "react"
import NavBar from "./nav/NavBar"
import { Route, Redirect } from "react-router-dom"
import SymptomList from "./symptoms/SymptomList"
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