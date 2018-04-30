import React, { Component } from "react";
import logo from "./logo.svg";
import { signup } from "../../lib/firebase";
import "./index.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange = field => e => {
    this.setState({ [field]: e.target.value });
  };

  handleSubmit = e => {
    console.log(" ------ handleSubmit ------");
    console.log(this.state);
    e.preventDefault();

    const { email, password } = this.state;
    signup(email, password);
    e.preventDefault();
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Login</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <div className="formWarpper">
          <form
            className="pure-form pure-form-stacked"
            onSubmit={this.handleSubmit.bind(this)}
          >
            <fieldset>
              <legend>A Stacked Form</legend>
              <input
                id="email"
                type="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleChange("email")}
              />
              <span className="pure-form-message">
                This is a required field.
              </span>
              <input
                id="password"
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange("password")}
              />
              <button type="submit" className="pure-button pure-button-primary">
                Sign in
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
