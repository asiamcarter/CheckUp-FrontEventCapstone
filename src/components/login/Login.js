//component is responsible for rendering the login page
import React, { Component } from "react"
import { Link } from "react-router-dom"

export default class Login extends Component {
    state = {
        email: "",
        password: ""
    }

    //function records changes to input fields and places them in state
    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
        console.log(this.state)
    }

    //function prevents form default, gets user by email and password entered in input fields. If that user does not exist within the database, an alert message is displayed. If the entered email and password do exist in the database, session storage is set and the user is sent to the homepage
    onLogin = evt => {
        evt.preventDefault();
        this.props.checkForUser(this.state.email, this.state.password)
            .then(user => {
                console.log("userArray:", user)
                if (user.length === 0) {
                    alert("We can't seem to find you! Try registering below")
                } else {
                    user.forEach(u => {
                        let loggedIn = false;
                        if (this.state.email === u.email && this.state.password === u.password) {
                            loggedIn = true;
                        }
                        if (loggedIn === true) {
                            sessionStorage.setItem("User", u.id)
                            let seshUser = sessionStorage.getItem("User")
                            console.log(seshUser)
                            this.props.history.push("/home")

                        }
                    })
                }
            })
    }
    render() {
        return (
            <>
                <h2>Login</h2>
                <div>
                    <form>
                        <div>
                            <label htmlFor="Email">
                                Email:
                        </label>
                            <input type="text" required onChange={this.handleFieldChange}
                                id="email"
                                placeholder="jane.smith@gmail.com" />
                        </div>
                        <div>
                            <label htmlFor="Password">
                                Password:
                        </label>
                            <input type="password" required onChange={this.handleFieldChange}
                                id="password" />
                        </div>
                        <div>
                            <button type="submit" onClick={this.onLogin} >
                                Login
                            </button>
                            <p><Link to="/register">Register Here</Link></p>
                        </div>
                    </form>
                </div>

            </>
        )
    }
}