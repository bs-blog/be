/*eslint-disable no-unused-vars*/
import React, { Component } from 'react'
import { connect } from 'react-redux'

class Container extends Component {
  render() {
    const { currentUser = null } = this.props
    if (currentUser && typeof currentUser.isLogin === 'boolean' && !currentUser.isLogin) {
      return this.props.children
    } else {
      return 'not login'
    }
  }
}

function mapStateToProps(state) {
  return { currentUser: state.currentUser }
}

export default connect(mapStateToProps)(Container)
