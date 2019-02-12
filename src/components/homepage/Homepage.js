import React, { Component } from "react"
import DataManager from "../../modules/DataManager";
import { Link } from "react-router-dom"
import happy from "../../images/homepage/happy.png"
import  mild from "../../images/homepage/mild.png"
import med from "../../images/homepage/med.png"
import severe from "../../images/homepage/severe.png"
import pill from "../../images/homepage/pill.png"
import "./Homepage.css"
import dummyavatar from "../../images/homepage/avatar.jpg"

export default class Homepage extends Component {

    state = {
        users: "",
        dataLoaded: false,
        userAptDoc:""
    }

    componentDidMount() {
        const newState = {}
        DataManager.getAllUserInfo().then(allUsers => newState.users= allUsers, newState.dataLoaded= true)
        .then(()=> DataManager.getAptDoc()).then(allDocs => newState.userAptDoc= allDocs)
        .then(()=> this.setState(newState))
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
    // test = () => {
    //     let aptMap = this.state.userAptDoc.filter(apt => {
    //         return (apt.userId === Number(sessionStorage.getItem("User")))
    //      })
    //     console.log(aptMap)
    // }

    welcomeUser() {
        let seshUser = Number(sessionStorage.getItem("User"))
        console.log("session user:", seshUser)

        let userObject = this.state.users.find(user => {
            return (seshUser === user.id)
        })
        let aptMap = this.state.userAptDoc.filter(apt => {
            return (apt.userId === Number(sessionStorage.getItem("User")))
         })
        console.log(userObject)
        if (aptMap.length > 0  && userObject.medications.length > 0) {
            return (
                <div>
                    <Link to={"/meds"}>
                        <hr />
                        <div className="homepage-medication">
                            <div className="homepage-pill-image">
                                <img src={pill} alt="pill graphic" width="50px" height="50px"/>
                            </div>
                            <div className="homepage-medication-info">
                                <p className="homepage-medication-quantity-name">
                                    {userObject.medications[0].quantity} {userObject.medications[0].name}
                                </p>
                                <p className="homepage-medication-time">
                                    {userObject.medications[0].time}
                                </p>
                            </div>
                        </div>
                    </Link>
                        <Link to={"/appointments"} className="homepage-appointment-link">
                    <div className="homepage-appointment">
                            <h4> Upcoming Appointment: </h4>
                            <p className="homepage-appointment-date">{aptMap[0].date}</p>
                            <p>{aptMap[0].doctor.name} at {aptMap[0].doctor.location}</p>
                            </div>
                        </Link>

                </div>
            )

        } else if (aptMap.length > 0) {
            return (

                <div>
                      <Link to={"/appointments"} className="homepage-appointment-link">
                    <div className="homepage-appointment">
                            <h4> Upcoming Appointment: </h4>
                            <p className="homepage-appointment-date">{aptMap[0].date}</p>
                            <p>{aptMap[0].doctor.name} at {aptMap[0].doctor.location}</p>
                            </div>
                        </Link>
                </div>

            )
        } else if (userObject.medications.length > 0) {
            return (
               <Link to={"/meds"}>
               <hr />
                <div className="homepage-medication">
                    <div className="homepage-pill-image">
                        <img src={pill} alt="graphic of pill" width="50px" height="50px"/>
                    </div>
                    <div className="homepage-medication-info">
                        <p className="homepage-medication-quantity-name">
                            {userObject.medications[0].quantity} {userObject.medications[0].name}
                        </p>
                        <p className="homepage-medication-time">
                            {userObject.medications[0].time}
                        </p>
                    </div>
                </div>
                </Link>
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
    removeSessionUser = () => {
        sessionStorage.clear()
    }


    render() {

        if (this.state.dataLoaded === false) {
            return (
                <>
                </>
            )
        } else if (this.state.dataLoaded === true && this.state.userAptDoc) {
            return (
                <>
                <nav className="navbar sticky-top navbar-light light-blue flex-md-nowrap p-0 shadow">
                <div className="container">
                    <ul className="nav nav-pills nav-fill homepage-top-nav">
                        <li className="nav-item dropdown">
                        <Link to={"/"} onClick={()=> (this.removeSessionUser())}>
                           <img src={dummyavatar} alt="dummy profile" className="homepage-avatar" width="20px" height="20px"/>
                           </Link>
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

