import React, { Component } from 'react'
import PresentationalComponent from './index'
import dao from './dao'
import { database } from '../../lib/firebase'

class Container extends Component {
  constructor(props) {
    super(props)
    this.database = database
    this.dao = new dao(this.database)
    this.state = { system: null }
  }

  update = payload => {
    return this.dao.update(payload)
  }

  componentDidMount() {
    this.dao.on(system => {
      return this.setState({ system })
    })
  }

  render() {
    const { system = {} } = this.state
    const { update } = this
    return <PresentationalComponent system={system} update={update} />
  }
}

export default Container
