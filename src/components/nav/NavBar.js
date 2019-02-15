//Component is responsible for setting up the NavBar element
//Eventually will need to add a dropdown menu on far right

import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./NavBar.css"
// import plusIcon from "../../images/navbar/add.png"
// import auth0Client from "../../Auth"

export default class NavBar extends Component {
    // signOut = () => {
    //     auth0Client.signOut();
    //     this.props.history.replace('/');
    //   };

    render() {

        return (
            <nav className="navbar fixed-bottom navbar-light light-blue flex-md-nowrap p-0 shadow">
                <div className="container">
                    <ul className="nav nav-pills nav-fill">
                        <li className="nav-item">
                            <Link className="nav-link"
                            to="/home">HOME</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link"
                            to="/trackedsymptoms">TRACK</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link"
                            to="/meds">MEDS</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/appointments">APTS</Link>
                        </li>
                        {/* checking to see if user is logged in, if they are display profile name and sign out button. If they are not, display sign in button */}
                        {/* {
        !auth0Client.isAuthenticated() &&
        <button className="btn btn-dark" onClick={auth0Client.signIn}>Sign In</button>
      }
      {
        auth0Client.isAuthenticated() &&
        <div>
          <label className="mr-2 text-white">{auth0Client.getProfile().name}</label>
          <button className="btn btn-dark" onClick={() => {this.signOut()}}>Sign Out</button>
        </div>
      } */}





                        {/* <li className="nav-item">
                           <img src={plusIcon} height="20px" width="20px" alt="plus icon"/>
                            Will be dropdown menu
                            MORE
                        </li> */}

                    </ul>
                </div>

            </nav>
        )
    }
}