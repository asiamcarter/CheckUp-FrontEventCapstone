import React, { Component } from "react"
import DataManager from "../../modules/DataManager";
import { Link } from "react-router-dom"

export default class Homepage extends Component {

    state = {
        users: "",
        dataLoaded: false
    }

    componentDidMount() {
        DataManager.getAllUserInfo().then(allUsers => this.setState({users: allUsers, dataLoaded: true}))
      }


    welcomeUser() {
        let seshUser = Number(sessionStorage.getItem("User"))
        console.log("session user:", seshUser)
        let userObject = this.state.users.find(user => {
            console.log("find method user id:", user.id)
            return (seshUser === user.id)
        })
        console.log(userObject)
        return (
            <div>
            <h3>Welcome to your homepage, {userObject.name}!</h3>
            <br />
            <div>
            <Link to={"/appointments"}> <h4> Appointment: </h4></Link>

                <p>{userObject.appointments[0].reason}</p>
                <p>{userObject.appointments[0].date}</p>
                <p>{userObject.appointments[0].time}</p>
            </div>
            <div>
            <Link to={"/meds"}>  <h4>Next Medication:</h4></Link>
            <p>{userObject.medications[0].name} </p>
            <p>{userObject.medications[0].quantity}</p>
            <p>{userObject.medications[0].date}</p>
            </div>
            </div>
            )
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
                    {this.welcomeUser()}
                </>
            )
        }
    }


}

