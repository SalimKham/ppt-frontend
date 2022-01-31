import React, { Component } from "react";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../../actions/userActions'


class Header extends Component {
  render() {
     const loggedIn = (localStorage.jwtToken ? true : false);
     
     
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Personal Project Management Tool
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            {loggedIn && <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link" href="/dashboard">
                  Dashboard
                </a>
              </li>
            </ul>
            }

            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link " to={loggedIn ? "/dashboard" : "/register"}>
                  { loggedIn ? (this.props.security.user.fullName) : "Sign Up"} 
                </Link>
              </li>
              <li className="nav-item">
              { !loggedIn ?  (<Link className="nav-link" to="/login">
                  Login
                </Link>): (<Link className="nav-link" onClick = {this.props.logout} to="/">
                Logout
              </Link>)
              }
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state =>({
   security : state.security
});

export default connect(mapStateToProps,{logout})(Header);
