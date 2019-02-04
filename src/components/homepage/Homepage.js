import React, { Component } from "react"

export default class Homepage extends Component {
    render() {
        return (
            <>
            Welcome to your homepage!
            {console.log(sessionStorage.getItem("User"))}
            </>

        )
    }
}