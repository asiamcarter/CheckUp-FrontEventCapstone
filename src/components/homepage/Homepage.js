import React, { Component } from "react";
import DataManager from "../../modules/DataManager";
import { Link } from "react-router-dom";
import happy from "../../images/homepage/happy.png";
import mild from "../../images/homepage/mild.png";
import med from "../../images/homepage/med.png";
import severe from "../../images/homepage/severe.png";
import pill from "../../images/homepage/pill.png";
import "./Homepage.css";
import dummyavatar from "../../images/homepage/avatar.jpg";
// import auth0Client from "../../Auth"
export default class Homepage extends Component {
  state = {
    users: "",
    dataLoaded: false,
    userAptDoc: "",
    currentUser: ""
  };

  componentDidMount() {
    const newState = {};
    DataManager.getAllUserInfo()
      .then(
        allUsers => (newState.users = allUsers),
        (newState.dataLoaded = true)
      )
      .then(() => DataManager.getAptDoc())
      .then(allDocs => {
        let sortedApts = allDocs.sort(function(aptA, aptB) {
          return new Date(aptB.date) - new Date(aptA.date);
        });
        newState.userAptDoc = sortedApts;
      })
      .then(() => this.setState(newState));
  }

  moodCheck() {
    let seshUser = Number(sessionStorage.getItem("User"));
    let userObject = this.state.users.find(user => {
      return seshUser === user.id;
    });
    this.setState = { currentUser: userObject };

    return (
      <div className="homepage-feeling">
        <h4 className="feeling-header">
          <strong>
            <span className="space">Welcome, {userObject.name}</span>
          </strong>
          <br />
          How are you feeling?
        </h4>
        <div className="homepage-feeling-icons">
          <Link to={"/symptoms/Mood/new"}>
            <img src={happy} alt="happy face" className="feeling-icon" />
            <img src={mild} alt="okay face" className="feeling-icon" />
            <img src={med} alt="sad face" className="feeling-icon" />
            <img src={severe} alt="pain face" className="feeling-icon" />
          </Link>
        </div>
      </div>
    );
  }
  getUserPhoto() {
    let seshUser = Number(sessionStorage.getItem("User"));
    let userObject = this.state.users.find(user => {
      return seshUser === user.id;
    });
    console.log(userObject.photo);
  }

  welcomeUser() {
    let seshUser = Number(sessionStorage.getItem("User"));
    let userObject = this.state.users.find(user => {
      return seshUser === user.id;
    });
    let aptMap = this.state.userAptDoc.filter(apt => {
      return apt.userId === Number(sessionStorage.getItem("User"));
    });
    if (aptMap.length > 0 && userObject.medications.length > 0) {
      return (
        <div>
          <Link to={"/meds"} id="link">
            <div className="homepage-medication">
              <div className="homepage-pill-image">
                <img
                  src={pill}
                  alt="pill graphic"
                  width="80px"
                  height="80px"
                  className="pill"
                />
              </div>
              <div className="homepage-medication-info">
                <p className="homepage-medication-quantity-name" id="link">
                  <span className="med-quantity">
                    {userObject.medications[0].quantity}{" "}
                  </span>{" "}
                  {userObject.medications[0].name}
                </p>
                <p className="homepage-medication-time" id="link">
                  {userObject.medications[0].time.split("", 1)} PM
                </p>
              </div>
            </div>
          </Link>
          <div className="homepage-appointment">
            <Link to={"/appointments"} className="homepage-appointment-link">
              <h4 id="link-white"> Upcoming Appointment: </h4>
            </Link>
            <p className="homepage-appointment-date">{aptMap[0].date}</p>
            <p className="homepage-appointment-location">
              {aptMap[0].doctor.name} <br />
              {aptMap[0].doctor.location}
            </p>
            {aptMap[0].note === "" ? (
              <button
                className="homepage-note"
                onClick={() =>
                  this.props.history.push(`appointment/newnote/${aptMap[0].id}`)
                }
              >
                Add Note
              </button>
            ) : (
              <button
                className="homepage-note"
                onClick={() => this.props.history.push(`note/${aptMap[0].id}`)}
              >
                View Note
              </button>
            )}
          </div>
        </div>
      );
    } else if (aptMap.length > 0) {
      return (
        <div>
          <div className="homepage-appointment">
            <Link to={"/appointments"} className="homepage-appointment-link">
              <h4 id="link-white"> Upcoming Appointment: </h4>
            </Link>
            <p className="homepage-appointment-date">{aptMap[0].date}</p>
            <p className="homepage-appointment-location">
              {aptMap[0].doctor.name} <br />
              {aptMap[0].doctor.location}
            </p>
            {aptMap[0].note === "" ? (
              <button
                className="homepage-note"
                onClick={() =>
                  this.props.history.push(`appointment/newnote/${aptMap[0].id}`)
                }
              >
                Add Note
              </button>
            ) : (
              <button
                className="homepage-note"
                onClick={() => this.props.history.push(`note/${aptMap[0].id}`)}
              >
                View Note
              </button>
            )}
          </div>
          {/* <Link to={"/appointments"} className="homepage-appointment-link">
                        <div className="homepage-appointment">
                            <h4> Upcoming Appointment: </h4>
                            <p className="homepage-appointment-date">{aptMap[0].date}</p>
                            <p>{aptMap[0].doctor.name} at {aptMap[0].doctor.location}</p>
                        </div>
                    </Link> */}
        </div>
      );
    } else if (userObject.medications.length > 0) {
      return (
        <>
          <Link to={"/meds"} id="link">
            <div className="homepage-medication">
              <div className="homepage-pill-image">
                <img
                  src={pill}
                  alt="pill graphic"
                  width="80px"
                  height="80px"
                  className="pill"
                />
              </div>
              <div className="homepage-medication-info">
                <p className="homepage-medication-quantity-name" id="link">
                  <span className="med-quantity">
                    {userObject.medications[0].quantity}{" "}
                  </span>{" "}
                  {userObject.medications[0].name}
                </p>
                <p className="homepage-medication-time" id="link">
                  {userObject.medications[0].time.split("", 1)} PM
                </p>
              </div>
            </div>
          </Link>
          <Link to={"/meds"} id="link">
            <div className="homepage-medication">
              <div className="homepage-pill-image">
                <img
                  src={pill}
                  alt="pill graphic"
                  width="80px"
                  height="80px"
                  className="pill"
                />
              </div>
              <div className="homepage-medication-info">
                <p className="homepage-medication-quantity-name" id="link">
                  <span className="med-quantity">
                    {userObject.medications[1].quantity}{" "}
                  </span>{" "}
                  {userObject.medications[1].name}
                </p>
                <p className="homepage-medication-time" id="link">
                  {userObject.medications[1].time.split("", 1)} PM
                </p>
              </div>
            </div>
          </Link>
        </>
      );
    } else {
      return (
        <div>
          <h3>Hi, {userObject.name}!</h3>
          <h4>How are you feeling?</h4>
          <br />
        </div>
      );
    }
  }
  removeSessionUser = () => {
    sessionStorage.clear();
  };

  signOut = () => {
    // auth0Client.signOut();
    this.props.history.push("/");
  };

  render() {
    if (this.state.dataLoaded === false) {
      return <></>;
    } else if (this.state.dataLoaded === true && this.state.userAptDoc) {
      return (
        <div className="homepage-body">
          <nav className="navbar sticky-top flex-md-nowrap p-0 shadow ">
            <div className="container top-nav-bar">
              <ul className="nav nav-pills nav-fill homepage-top-nav">
                <li className="nav-item dropdown">
                  <Link to={"/"} onClick={() => this.signOut()}>
                    LOGOUT
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          {this.moodCheck()}
          {this.welcomeUser()}
        </div>
      );
    }
  }
}
