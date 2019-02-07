import React, { Component } from "react"

export default class Homepage extends Component {

    welcomeUser() {
        let seshUser = Number(sessionStorage.getItem("User"))
        console.log("session user:", seshUser)
        let userObject = this.props.users.find(user => {
            console.log("find method user id:", user.id)
            return (seshUser === user.id)
        })
        console.log("user object", userObject)
    }

    render() {
        console.log(this.props)
        return (
            <>
                Welcome to your homepage!
            {this.welcomeUser()}
            </>

        )
    }
}