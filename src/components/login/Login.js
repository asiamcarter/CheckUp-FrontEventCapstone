import React, { Component } from "react";
import auth0Client from "../../Auth"
import logo1 from "../../images/login/logo1.jpeg"


export default class Login extends Component {

    componentDidMount() {
        if (auth0Client.isAuthenticated()){
            this.props.history.push("/home")
        }
    }
    signOut = () => {
        auth0Client.signOut();
        this.props.history.push("/");
    }
    userAuthorized = () => {
        if(!auth0Client.isAuthenticated()) {
         return (<button className="btn btn-primary" id="login-button" onClick={auth0Client.signIn}>Login / Register</button>)
        }
}
    render() {
        return (
            <div className="wrapper fadeInDown">
                <div id="formContent">
                    <div className="fadeIn first">
                        <img src={logo1} id="icon" alt="CheckUp Logo" />
                        {/* <!-- Login Button --> */}
                        {this.userAuthorized()}
                    </div>
                 </div>
            </div>
        )
    }
}