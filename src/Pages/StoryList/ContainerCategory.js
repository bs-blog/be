import React, { Component } from 'react'
import Container from './Container'
import { database } from '../../lib/firebase'
import { queryByCategory } from '../../lib/firebase/queryCommand/story'

class ContainerCategory extends Component {
  render() {
    const categoryId = this.props.match.params.id
    const command = queryByCategory(database, categoryId) || null
    const _props = { ...this.props, command }
    return <Container key={categoryId} {..._props} />
  }
}

export default ContainerCategory
