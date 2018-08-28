import React, { Component } from 'react'
import daoEidtor from './dao'
import daoAuthors from '../../lib/dao/authors'
import daoCategorys from '../../lib/dao/categorys'
import PresentationalComponent from './index'
import { database } from '../../lib/firebase'
import { createEditorState } from 'medium-draft'
import { convertToRaw } from 'draft-js'

class Container extends Component {
  constructor(props) {
    super(props)
    this.database = database
    this.daoCategorys = new daoCategorys(this.database)
    this.daoAuthors = new daoAuthors(this.database)
    this.dao = new daoEidtor(this.database)
    this.state = {
      storys: [],
      categorys: [],
      authors: []
    }
  }

  componentDidMount() {
    this.dao.on(storys => {
      return this.setState({ storys })
    })
    this.daoCategorys.on(categorys => {
      return this.setState({ categorys })
    })
    this.daoAuthors.on(authors => {
      return this.setState({ authors })
    })
  }

  createStory = () => {
    const editorState = createEditorState()
    const data = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
    const payload = { data }
    return this.dao.create(payload).then(snap => {
      const res = snap.val()
      const storyList = this.dao.fbListToArray(res)
      const newestStory = storyList[storyList.length - 1]
      return newestStory
    })
  }

  deleteStory = id => {
    return this.dao.deleteById(id)
  }
  disableStory = id => {
    return this.dao.updateById(id, { status: 'DISABLE' })
  }

  render() {
    const { storys = [], categorys, authors } = this.state
    return (
      <PresentationalComponent
        storys={storys}
        createStory={this.createStory}
        categorys={categorys}
        authors={authors}
        deleteStory={this.deleteStory}
        disableStory={this.disableStory}
      />
    )
  }
}

export default Container
