import React, { Component } from 'react'
import Container from './Container'
import { database } from '../../lib/firebase'
import { queryByAuthor } from '../../lib/firebase/queryCommand/story'

class ContainerCategory extends Component {
  render() {
    const authorId = this.props.match.params.id
    const command = queryByAuthor(database, authorId) || null
    const _props = { ...this.props, command }
    return <Container key={authorId} {..._props} />
  }
}

export default ContainerCategory
