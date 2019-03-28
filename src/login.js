import React, { Component } from 'react';
import { Form, InputGroup } from "react-html5-form";
import { NavLink, Link } from "react-router-dom";
import Admin from './admin';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    withRouter
} from "react-router-dom";

export default class Login extends Component {

    state = {
        username: "",
        password: ""
    };

    componentDidMount() {
        localStorage.removeItem("token");
    }

    // Update the value of the corresponding state field
    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };


    displayError = error => {
        return (
            error && (
                <div className="col-md-12">
                    <p style={{ color: "red" }}>{error}</p>
                </div>
            )
        );
    };

    login = () => {
        const resourceData = {
            username: this.state.username,
            password: this.state.password
        }

        console.log(resourceData)

        fetch(
            "http://localhost:8080/token",
            {
                method: "POST",
                body: JSON.stringify(resourceData),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            }
        )
            .then(res => res.json())
            .then(res => {
                if (res.code === 201) {
                    console.log(res)
                    localStorage.setItem("token", res.message)
                    this.props.history.push("/admin");
                } else {
                    alert("Login failed!!!")
                }
            });
    };


    render() {
        return (
            <div className="container">
                <h2>Login</h2>

                <div className="col-md-8">
                    <Form id="apply" onSubmit={e => this.login(e)}>
                        {({ error }) => (
                            <>
                                <div className="form-row">
                                    <div className="form-group col-md-4">
                                        <InputGroup validate={["username"]}>
                                            {({ error }) => (
                                                <div>
                                                    <input
                                                        required
                                                        className="form-control"
                                                        placeholder="Username"
                                                        name="username"
                                                        value={this.state.username}
                                                        onChange={e => this.onChange(e)}
                                                    />
                                                    {this.displayError(error)}
                                                </div>
                                            )}
                                        </InputGroup>
                                    </div><br />
                                    <div className="form-group col-md-4">
                                        <InputGroup validate={["password"]}>
                                            {({ error }) => (
                                                <div>
                                                    <input
                                                        required
                                                        className="form-control"
                                                        placeholder="Password"
                                                        name="password"
                                                        value={this.state.password}
                                                        onChange={e => this.onChange(e)}
                                                    />
                                                    {this.displayError(error)}
                                                </div>
                                            )}
                                        </InputGroup>
                                    </div><br />
                                    <div className="form-group col-md-6">
                                        <button
                                            type="submit"
                                            className="btn btn-primary text-white mb-2">
                                            Login
                                    </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </Form>
                </div>
            </div>
        );
    }
}