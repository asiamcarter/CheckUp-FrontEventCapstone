import React, { Component } from "react"
import DataManager from "../../modules/DataManager";
import { Link } from "react-router-dom"
import happy from "../../images/homepage/happy.png"
import  mild from "../../images/homepage/mild.png"
import med from "../../images/homepage/med.png"
import severe from "../../images/homepage/severe.png"
import "./Homepage.css"

export default class Homepage extends Component {

    state = {
        users: "",
        dataLoaded: false
    }

    componentDidMount() {
        DataManager.getAllUserInfo().then(allUsers => this.setState({ users: allUsers, dataLoaded: true }))
    }

    moodCheck() {
        let seshUser = Number(sessionStorage.getItem("User"))
        let userObject = this.state.users.find(user => {
            return (seshUser === user.id)
        })
       return (
       <div className="homepage-feeling">
                        <h4>How are you feeling, {userObject.name}?</h4>
                        <div className="homepage-feeling-icons">
                        <img src={happy} alt="happy face" className="feeling-icon"/>
                        <img src={mild} alt="okay face" className="feeling-icon"/>
                        <img src={med} alt="sad face" className="feeling-icon"/>
                        <img src={severe} alt="pain face" className="feeling-icon"/>
                        </div>
                    </div>

       )
    }

    welcomeUser() {
        let seshUser = Number(sessionStorage.getItem("User"))
        console.log("session user:", seshUser)
        let userObject = this.state.users.find(user => {
            console.log("find method user id:", user.id)
            return (seshUser === user.id)
        })
        if (userObject.appointments.length > 0 && userObject.medications.length > 0) {
            return (
                <div>
                    <br/>
                    <br/>
                    {/* <h3>Welcome to your homepage, {userObject.name}!</h3> */}
                    <br />
                    <div>
                        <Link to={"/appointments"}> <h4> Appointment: </h4></Link>
                        <p>{userObject.appointments[0].reason}</p>
                        <p>{userObject.appointments[0].date}</p>
                        <p>{userObject.appointments[0].time}</p>
                    </div>
                    <div>
                        <Link to={"/meds"}><h4>Next Medication:</h4></Link>
                        <p>{userObject.medications[0].name} </p>
                        <p>{userObject.medications[0].quantity}</p>
                        <p>{userObject.medications[0].date}</p>
                    </div>
                </div>
            )

        } else if (userObject.appointments.length > 0) {
            return (

                <div>
                     <br/>
                    <br/>
                    {/* <h3>Welcome to your homepage, {userObject.name}!</h3> */}
                    <br />
                    <div>
                        <Link to={"/appointments"}> <h4> Appointment: </h4></Link>
                        <p>{userObject.appointments[0].reason}</p>
                        <p>{userObject.appointments[0].date}</p>
                        <p>{userObject.appointments[0].time}</p>
                    </div>
                </div>

            )
        } else if (userObject.medications.length > 0) {
            return (
                <div>
                     <br/>
                    <br/>
                    {/* <h3>Welcome to your homepage, {userObject.name}!</h3> */}
                    <br />
                    <div>
                        <Link to={"/meds"}><h4>Next Medication:</h4></Link>
                        <p>{userObject.medications[0].name} </p>
                        <p>{userObject.medications[0].quantity}</p>
                        <p>{userObject.medications[0].date}</p>
                    </div>
                </div>
            )

        } else {
            return (
                <div>
                    {/* <h3>Hi, {userObject.name}!</h3>
                    <h4>How are you feeling?</h4>
                    <br /> */}
                    {/* be sure to add that they have no medicines to track or upcoming appointments? */}
                </div>
            )
        }


    }


    render() {
        console.log(this.state)
        if (this.state.dataLoaded === false) {
            return (
                <>
                </>
            )
        } else if (this.state.dataLoaded === true) {
            return (
                <>
                <nav className="navbar sticky-top navbar-light light-blue flex-md-nowrap p-0 shadow">
                <div className="container">
                    <ul className="nav nav-pills nav-fill homepage-top-nav">
                        <li className="nav-item">
                            HOME
                        </li>
                        </ul>
                </div>
                </nav>
                    {this.moodCheck()}
                    {this.welcomeUser()}

                </>
            )
        }
    }


}

