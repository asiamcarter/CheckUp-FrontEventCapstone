//component is responsible for rendering the login page
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import logo1 from "../../images/login/logo1.jpeg";

export default class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  //function records changes to input fields and places them in state
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
    console.log(this.state);
  };

  //function prevents form default, gets user by email and password entered in input fields. If that user does not exist within the database, an alert message is displayed. If the entered email and password do exist in the database, session storage is set and the user is sent to the homepage
  onLogin = evt => {
    evt.preventDefault();
    this.props
      .checkForUser(this.state.email, this.state.password)
      .then(user => {
        console.log("userArray:", user);
        if (user.length === 0) {
          alert("We can't seem to find you! Try registering below");
        } else {
          user.forEach(u => {
            let loggedIn = false;
            if (
              this.state.email === u.email &&
              this.state.password === u.password
            ) {
              loggedIn = true;
            }
            if (loggedIn === true) {
              sessionStorage.setItem("User", u.id);
              let seshUser = sessionStorage.getItem("User");
              console.log(seshUser);
              this.props.history.push("/home");
            }
          });
        }
      });
  };
  render() {
    return (
      <>
        <div className="wrapper fadeInDown">
          <div id="formContent">
            <div className="fadeIn first">
              <img src={logo1} id="icon" alt="CheckUp Logo" />
            </div>
            {/* <!-- Login Form --> */}
            <form>
              <input
                type="text"
                id="email"
                className="fadeIn second"
                name="login"
                autoComplete="off"
                required
                onChange={this.handleFieldChange}
                placeholder="email"
              />
              <input
                type="text"
                id="password"
                autoComplete="off"
                required
                onChange={this.handleFieldChange}
                className="fadeIn third"
                name="login"
                placeholder="password"
              />
              <input
                type="submit"
                className="fadeIn
                                fourth"
                onClick={this.onLogin}
                value="Log In"
              />
            </form>
            <div id="formFooter">
              <p>
                <Link to="/register">Register Here</Link>
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }
}
