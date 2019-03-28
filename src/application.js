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

export default class Application extends Component {

    state = {
        firstName: "",
        surname: "",
        email: "",
        phoneNumber: "",
        coverLetter: "",
        resume: "",
        passport: ""
    };

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
                    <p style={this.errorStyles}>{error}</p>
                </div>
            )
        );
    };

    handleResumeFile = event => {
        /// get list of files
        var file_list = event.target.files;

        /// go through the list of files
        for (var i = 0, file; file = file_list[i]; i++) {

            var sFileName = file.name;
            var sFileExtension = sFileName.split('.')[sFileName.split('.').length - 1].toLowerCase();
            var iFileSize = file.size;
            var iConvert = (file.size / 1048576).toFixed(2);

            if (!(sFileExtension === "pdf" ||
                sFileExtension === "doc" ||
                sFileExtension === "docx") || iFileSize > 2000000) { /// 2 mb
                var txt;
                txt = "File type : " + sFileExtension + "\n\n";
                txt += "Size: " + iConvert + " MB \n\n";
                txt += "Please make sure your file is in pdf or doc format and less than 2 MB.\n\n";
                alert(txt);
                return;
            } else {
                this.setState({
                    resume: event.target.files[0]
                });
            }
        }

    };

    handlePassportFile = event => {
        /// get list of files
        var file_list = event.target.files;

        /// go through the list of files
        for (var i = 0, file; file = file_list[i]; i++) {

            var sFileName = file.name;
            var sFileExtension = sFileName.split('.')[sFileName.split('.').length - 1].toLowerCase();
            var iFileSize = file.size;
            var iConvert = (file.size / 1048576).toFixed(2);

            if (!(sFileExtension === "jpeg") || iFileSize > 100000) { /// 100 KB
                var txt;
                txt = "File type : " + sFileExtension + "\n\n";
                txt += "Size: " + iConvert + " MB \n\n";
                txt += "Please make sure your file is in jpeg format and less than 100 KB.\n\n";
                alert(txt);
                return;
            } else {
                this.setState({
                    passport: event.target.files[0]
                });
            }
        }

    };

    handleUpload = () => {
        const resourceData = {
            firstName: this.state.firstName,
            surname: this.state.surname,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,
            coverLetter: this.state.coverLetter,
        }

        console.log(resourceData)

        const data = new FormData();
        data.append("resume", this.state.resume, this.state.resume.name);
        data.append("passport", this.state.passport, this.state.passport.name);
        data.append("model", JSON.stringify(resourceData))

        fetch(
            "http://localhost:8080/upload",
            {
                method: "POST",
                body: data,
                headers: {
                    // "Content-Type": "multipart/form-data",
                    // "Accept": "application/json"
                }
            }
        )
            .then(res => res.json())
            .then(res => {
                if (res.code === 201) {
                    this.setState({
                        firstName: "",
                        surname: "",
                        email: "",
                        phoneNumber: "",
                        coverLetter: "",
                        resume: "",
                        passport: ""
                    })
                    alert("Successful")
                } else if (res.code === -1) {
                    this.setState({
                        firstName: "",
                        surname: "",
                        email: "",
                        phoneNumber: "",
                        coverLetter: "",
                        resume: "",
                        passport: ""
                    })
                    alert("Application Closed")
                } else {
                    alert("Failed to submit application")
                }

                console.log(res);
            });
    };

    render() {
        return (
            <div className="container">

                <div className="col-md-12">
                    <h2>APPLICATION FORM</h2>
                    <Form id="apply" onSubmit={e => this.handleUpload(e)}>
                        {({ error }) => (
                            <>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <InputGroup validate={["firstName"]}>
                                            {({ error }) => (
                                                <div>
                                                    <input
                                                        required
                                                        className="form-control"
                                                        placeholder="First Name"
                                                        name="firstName"
                                                        value={this.state.firstName}
                                                        onChange={e => this.onChange(e)}
                                                    />
                                                    {this.displayError(error)}
                                                </div>
                                            )}
                                        </InputGroup>
                                    </div><br />
                                    <div className="form-group col-md-6">
                                        <InputGroup validate={["surname"]}>
                                            {({ error }) => (
                                                <div>
                                                    <input
                                                        required
                                                        className="form-control"
                                                        placeholder="Surname"
                                                        name="surname"
                                                        value={this.state.surname}
                                                        onChange={e => this.onChange(e)}
                                                    />
                                                    {this.displayError(error)}
                                                </div>
                                            )}
                                        </InputGroup>
                                    </div><br />

                                    <div className="form-group col-md-6">
                                        <div>
                                            <input
                                                type="email"
                                                required
                                                className="form-control"
                                                placeholder="Email"
                                                name="email"
                                                value={this.state.email}
                                                onChange={e => this.onChange(e)}
                                            />
                                        </div>

                                    </div><br />

                                    <div className="form-group col-md-6">
                                        <div>
                                            <input
                                                required
                                                className="form-control"
                                                placeholder="Phone"
                                                name="phoneNumber"
                                                value={this.state.phoneNumber}
                                                onChange={e => this.onChange(e)}
                                            />
                                            {this.displayError(error)}
                                        </div>

                                    </div><br />

                                    <div className="form-group col-md-6">
                                        <div>
                                            <textarea

                                                required
                                                className="form-control"
                                                placeholder="Cover Letter"
                                                name="coverLetter"
                                                value={this.state.coverLetter}
                                                onChange={e => this.onChange(e)}
                                            />
                                        </div>

                                    </div>

                                    <div className="form-group col-md-3">
                                        <span>Resume </span>
                                        <input type="file" name="resume" id="resume" onChange={this.handleResumeFile} />
                                        <span style={{ color: "red" }}>Please make sure your file is in pdf or doc format and less than 2 MB</span>
                                    </div>

                                    <div className="form-group col-md-3">
                                        <span>Passport </span>
                                        <input type="file" name="passport" id="passport" onChange={this.handlePassportFile} />
                                        <span style={{ color: "red" }}>Please make sure your file is in jpeg format and less than 100 KB</span>
                                    </div>

                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary text-white mb-2">
                                    Submit
                                 </button>
                            </>
                        )}
                    </Form>
                </div>
            </div>
        );
    }
}