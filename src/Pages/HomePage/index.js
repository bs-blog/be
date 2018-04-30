import React, { Component } from "react";
import "./index.css";
/* eslint-disable no-alert, no-console */

class HomePage extends Component {
  constructor(){
    super()
  }

  componentDidMount(){
  }

  render() {
    const categorys = this.props.categorys

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Home page</h1>
        </header>

        <div>
          {
            categorys.map((item, index) => (<div key={index}>
              <span>{item.id}</span>
              <span>{item.name}</span>
            </div>))
          }
        </div>
      </div>
    );
  }
}

export default HomePage;
