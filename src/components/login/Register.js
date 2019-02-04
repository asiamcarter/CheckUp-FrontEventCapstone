//Component renders and registration form
import React, { Component } from "react"

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
                <h2>Register Here</h2>
                <div>
                    <form>
                        <div>
                            <label htmlFor="Name"> Name: </label>
                            <input type="text" required onChange={this.handleFieldChange} id="name" placeholder="Jane Smith" />
                        </div>
                        <div>
                            <label htmlFor="Email"> Email: </label>
                            <input type="text" required onChange={this.handleFieldChange} id="email" placeholder="jane.smith@gmail.com" />
                        </div>
                        <div>
                            <label htmlFor="Password"> Password: </label>
                            <input type="password" required onChange={this.handleFieldChange} id="password" />
                        </div>
                        <div>
                            <button type="submit" onClick={this.getAllUsers}> Submit</button>
                        </div>

                    </form>
                </div>
            </>
        )
    }
}