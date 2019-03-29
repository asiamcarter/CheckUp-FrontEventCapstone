// //component is responsible for rendering the login page
// import React, { Component } from "react"
// import { Link } from "react-router-dom"
// import "./Login.css"
// import logo1 from "../../images/login/logo1.jpeg"

// export default class Login extends Component {
//     state = {
//         email: "",
//         password: ""
//     }

//     //function records changes to input fields and places them in state
//     handleFieldChange = evt => {
//         const stateToChange = {};
//         stateToChange[evt.target.id] = evt.target.value
//         this.setState(stateToChange)
//         console.log(this.state)
//     }

//     //function prevents form default, gets user by email and password entered in input fields. If that user does not exist within the database, an alert message is displayed. If the entered email and password do exist in the database, session storage is set and the user is sent to the homepage
//     onLogin = evt => {
//         evt.preventDefault();
//         this.props.checkForUser(this.state.email, this.state.password)
//             .then(user => {
//                 console.log("userArray:", user)
//                 if (user.length === 0) {
//                     alert("We can't seem to find you! Try registering below")
//                 } else {
//                     user.forEach(u => {
//                         let loggedIn = false;
//                         if (this.state.email === u.email && this.state.password === u.password) {
//                             loggedIn = true;
//                         }
//                         if (loggedIn === true) {
//                             sessionStorage.setItem("User", u.id)
//                             let seshUser = sessionStorage.getItem("User")
//                             console.log(seshUser)
//                             this.props.history.push("/home")

//                         }
//                     })
//                 }
//             })
//     }
//     render() {
//         return (
//             <>
//                 <div className="wrapper fadeInDown">
//                     <div id="formContent">
//                         <div className="fadeIn first">
//                             <img src={logo1} id="icon" alt="CheckUp Logo" />
//                         </div>
//                         {/* <!-- Login Form --> */}
//                             <form>
//                                 <input type="text" id="email" className="fadeIn second"
//                                 name="login"
//                                 autoComplete="off"
//                                 required onChange={this.handleFieldChange}
//                                 placeholder="email"/>
//                                 <input type="text" id="password"
//                                 autoComplete="off"
//                                 required onChange={this.handleFieldChange}className="fadeIn third" name="login" placeholder="password"/>
//                                 <input type="submit" className="fadeIn
//                                 fourth"
//                                 onClick={this.onLogin}value="Log In"/>
//                             </form>
//                         <div id="formFooter">
//                             <p>
//                                 <Link to="/register">Register Here
//                                 </Link>
//                             </p>
//                         </div>
//                     </div>
//             </div>
//             </>
//         )
//     }
// }


import React, { Component } from "react";
import { Link } from "react-router-dom";
import { NavbarBrand } from 'reactstrap';
import DataManager from '../../modules/DataManager';
// import "../Conpanion.css";
import auth0Client from "../../Auth"


export default class Login extends Component {

    // Set initial state
    // state = {
    //     username: "",
    //     password: ""
    // }

    componentDidMount() {
        if (auth0Client.isAuthenticated()){
            this.props.history.push("/home")
        }
    }

    // Update state whenever an input field is edited
    // handleFieldChange = (evt) => {
    //     const stateToChange = {}
    //     stateToChange[evt.target.id] = evt.target.value
    //     this.setState(stateToChange)
    // }

    // userLogin = evt => {
    //     evt.preventDefault();
    //     DataManager.checkForUser(this.state.username)
    //         .then(userData => {
    //             console.log("userArray:", userData)
    //             if (userData.length === 0) {
    //                 alert("Your username and password do not match. Please try again.")
    //             } else {
    //                 userData.forEach(user => {
    //                     let loggedIn = false;
    //                     if (this.state.username === user.username) {
    //                         loggedIn = true;
    //                     }
    //                     if (loggedIn === true) {
    //                         sessionStorage.setItem("User", user.id)
    //                         let seshUser = sessionStorage.getItem("User")
    //                         console.log(seshUser)
    //                         this.props.history.push("/home")
    //                     }
    //                 })
    //             }
    //         })

    // }

    signOut = () => {
        auth0Client.signOut();
        this.props.history.push("/");
    }
    userAuthorized = () => {
        if(!auth0Client.isAuthenticated()) {
         return (<button className="btn btn-primary" onClick={auth0Client.signIn}>Log in or Register</button>)
        }
    //  else if (auth0Client.isAuthenticated()){
    //     this.props.history.push("/home")
        // <div>
        // <label className="mr-2">{auth0Client.getProfile().name}</label>
        // <button className="btn btn-primary" onClick={() => {this.signOut()}}>Sign Out</button>
        // </div>
    // }
}

    render() {
        return (
            <section className="login">
                <div className="logo text-center"><NavbarBrand tag={Link} to="/"><span className="nav-highlight">con</span>panion</NavbarBrand></div>
                {/* <div className="login_form my-4">
                    <Form inline onSubmit={this.userLogin}>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="username" hidden>Username</Label>
                            <Input type="text" name="username" id="username"
                            onChange={this.handleFieldChange} required placeholder="Username" />
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="password" hidden>Password</Label>
                            <Input type="password" name="password" id="password"
                            onChange={this.handleFieldChange} required placeholder="Password" />
                        </FormGroup>
                        <Button color="primary">Submit</Button>
                    </Form>
                </div> */}

                <div className="text-center mt-4">
                    {/* Auth0 code that checks if user is logged in. If they are, display profile name and sign out button. If they are not, display sign in button. */}
                    {this.userAuthorized()}
                </div>

                {/* <div className="text-center">
                    New to ConPanion? <a href="#" onClick={() => this.props.history.push("/register")} className="link">Sign up now!</a>
                </div> */}
            </section>
        )
    }
}