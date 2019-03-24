//Component renders and registration form
import React, { Component } from "react"
import "./Login.css"
import pill from "../../images/login/pills.png"
export default class Register extends Component {

    state = {
        name: "",
        email: "",
        password: ""
    }
    //records changes to input fields and places them in state
    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }
    //gets all users, checks to make sure no two emails are the same, if they are the user is alerted "sorry this username is taken", if the entered email is unique, the user is alerted "welcome" and the new user is posted to the database and user is re-directed to the login page

    getAllUsers = evt => {
        evt.preventDefault();
        this.props.getUsers().then(allUsers => {
            let usersArray = allUsers.filter(user => {
                console.log(user.email, this.state.email)
                return (user.email === this.state.email)
            })
            if (usersArray.length > 0) {
                 alert("Sorry, this username is taken")

                let name = document.getElementById("name");
                name.value = "";
                let email = document.getElementById("email");
                email.value = "";
                let password = document.getElementById("password");
                password.value = "";


            } else {
                alert(`Welcome ${this.state.name}!`)
                const newUser = {
                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.password
                }
                this.props.postUser(newUser)
                    .then(() => {
                        this.props.getUsers()
                            .then(() => {
                            this.props.history.push("/")
                            })
                    })
            }
        })
    }

    render() {
        return (
            <>
                <div className="wrapper fadeInDown">
                    <div id="formContent">
                        <div className="fadeIn first">
                            <img src={pill} id="registericon" alt="CheckUp Logo" />
                            <br/>
                            <h2>Register</h2>
                        </div>
                        {/* <!-- Login Form --> */}
                            <form>
                                <input type="text" id="name"
                                className="fadeIn second"
                                name="login"
                                autoComplete="off"
                                required onChange={this.handleFieldChange}
                                placeholder="name"/>
                                <input type="text" id="email" className="fadeIn second"
                                name="login"
                                autoComplete="off"
                                required onChange={this.handleFieldChange}
                                placeholder="email"/>
                                <input type="text" id="password"
                                autoComplete="off"
                                required onChange={this.handleFieldChange}className="fadeIn third" name="login" placeholder="password"/>
                                <input type="submit" className="fadeIn
                                fourth"
                                onClick={this.getAllUsers}value="Register"/>
                            </form>
                        <div id="formFooter">
                        </div>
                    </div>
                </div>
            </>
        )
    }
}