import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Admin extends Component {
  state = {
    applicants: []
  };

  componentDidMount() {
    if (localStorage.getItem("token") !== null) {
      this.getAllApplicants();
    } else {
      this.props.history.push("/login");
    }

  }

  getAllApplicants = () => {
    fetch("http://localhost:8080/", {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    })
      .then(response => response.json())
      .then(res => {
        this.setState({
          applicants: res
        });
        console.log(res);
      });
  }

  render() {
    return (
      <div>
        <Link
          to="/login"
          className="d-inline btn btn-sm btn-primary text-white px-3"
        >Logout</Link>
        <div className="row">
          <div className="col-md-12">
            <table className="table table-sm">
              <thead className="bg-dark text-white">
                <tr>
                  <th scope="col">First Name</th>
                  <th scope="col">Surname</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Cover Letter</th>
                </tr>
              </thead>
              <tbody>
                {this.state.applicants
                  ? this.state.applicants.map((applicant, index) => {
                    return (
                      <tr key={index}>
                        <td>{applicant.firstName}</td>
                        <td>{applicant.surname}</td>
                        <td>{applicant.email}</td>
                        <td>{applicant.phoneNumber}</td>
                        <td>{applicant.coverLetter}</td>
                      </tr>
                    );
                  })
                  : ""}
                {!this.state.applicants && (
                  <div className="spinner-grow text-success" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                )}
              </tbody>
            </table>
          </div>

          {/* End inputs table */}
        </div>
      </div>
    );
  }
}
