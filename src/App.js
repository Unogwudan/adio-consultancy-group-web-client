import React, { Component } from 'react';
import logo from './logo.svg';
import { Form, InputGroup } from "react-html5-form";
import { NavLink, Link } from "react-router-dom";
// import Application from './application';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  withRouter
} from "react-router-dom";
import './App.css';

class App extends Component {

  state = {
    stocks: []
  };

  componentDidMount() {
    this.getAllStocks();
  }

  getAllStocks = () => {
    fetch("http://localhost:8083/stocks", {
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

        <div className="row">
          <div className="col-md-12">
            <table className="table table-sm">
              <thead className="bg-dark text-white">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Current Price</th>
                  <th scope="col">Date Created</th>
                  <th scope="col">Last Updated</th>
                </tr>
              </thead>

              <tbody>
                {this.state.stocks.map((stock, index) => {
                  return (
                    <tr key={index}>
                      <td>{stock.id}</td>
                      <td>{stock.name}</td>
                      <td>{stock.currentPrice}</td>
                      <td>{stock.createdDate}</td>
                      <td>{stock.lastUpdated}</td>
                    </tr>
                  );
                })}

              </tbody>
            </table>
          </div>

          {/* End Stocks table */}
        </div>
      </div>
    );
  }

  // render() {
  //   return (
  //     <div className="container">

  //       <nav class="navbar navbar-expand-lg navbar-light bg-light">
  //         <ul className="navbar-nav mr-auto">
  //           <li className="nav-item">
  //             <a className="nav-link">
  //               {/* <NavLink to="/application" className="d-inline">
  //                 Apply
  //                 </NavLink> */}
  //             </a>
  //           </li>
  //           <li className="nav-item">
  //             <a className="nav-link">
  //               {/* <NavLink to="/admin" className="d-inline">
  //                 Admin
  //               </NavLink> */}
  //             </a>
  //           </li>
  //         </ul>
  //       </nav>

  //       {/* <Route path="/" exact component={} /> */}
  //       {/* <Route path="/application" component={Application} /> */}

  //       <div className="container">

  //       </div>
  //     </div >
  //   );
  // }
}

export default App;
