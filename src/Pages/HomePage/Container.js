import React, { Component } from 'react';
import PresentationalComponent from './index'
import dao from './dao'
import firebase from 'firebase';

class Container extends Component {
  constructor(props){
    super(props)
    this.database = firebase.database()
    this.dao = new dao(this.database)
    this.state = {categorys: []}
  }

  componentDidMount(){
    this.dao.on(categorys => {
      return this.setState({categorys})
    })
  }

  render() {
    const {categorys = []} = this.state
    return (
      <PresentationalComponent
            categorys={categorys}
        />
    );
  }
}

export default Container;
