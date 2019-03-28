import React, { Component } from 'react';
import logo from './logo.svg';
import { Form, InputGroup } from "react-html5-form";
import { NavLink, Link } from "react-router-dom";
import Application from './application';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  withRouter
} from "react-router-dom";
import './App.css';
import Admin from './admin';
import Login from './login';

class App extends Component {

  render() {
    return (
      <div className="container">

        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link">
                <NavLink to="/application" className="d-inline">
                  Apply
                  </NavLink>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link">
                <NavLink to="/admin" className="d-inline">
                  Admin
                </NavLink>
              </a>
            </li>
          </ul>
        </nav>

        {/* <Route path="/" exact component={} /> */}
        <Route path="/application" component={Application} />
        <Route path="/admin" component={Admin} />
        <Route path="/login" component={Login} />

        <div className="container">

        </div>
      </div >
    );
  }
}

export default App;
