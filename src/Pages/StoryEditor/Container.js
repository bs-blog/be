import React, { Component } from 'react'
import PresentationalComponent from './index'
import daoStory from '../../lib/dao/story'
import daoAuthors from '../../lib/dao/authors'
import daoCategorys from '../../lib/dao/categorys'
import { database } from '../../lib/firebase'

class Container extends Component {
  constructor(props) {
    super(props)
    this.storyId = this.props.match.params.id
    this.database = database
    this.daoStory = new daoStory(this.database, this.storyId)
    this.daoCategorys = new daoCategorys(this.database)
    this.daoAuthors = new daoAuthors(this.database)
    this.state = {
      storyData: {},
      categorys: [],
      authors: [],
      selectedCategory: [],
      selectedAuthor: ''
    }
  }

  componentDidMount() {
    this.daoStory.on(storyData => {
      const { categorys = {}, author = '' } = storyData
      const selectedAuthor = author
      const selectedCategory = Object.entries(categorys).map(item => item[0])
      return this.setState({ storyData, selectedCategory, selectedAuthor })
    })

    this.daoCategorys.on(categorys => {
      return this.setState({ categorys })
    })

    this.daoAuthors.on(authors => {
      return this.setState({ authors })
    })
  }

  onHandleSaveStory(id, payload) {
    return this.daoStory.updateById(id, payload)
  }

  onPublishSaveStory(id, payload) {
    return this.daoStory.updateById(id, {
      ...payload,
      status: 'PUBLISHED'
    })
  }

  onHandleChangeCategory(selectedCategory) {
    this.setState({ selectedCategory })
  }

  onHandleChangeAuthor(selectedAuthorId) {
    this.setState({ selectedAuthor: selectedAuthorId })
  }

  render() {
    const storyId = this.storyId
    const { storyData, categorys, authors, selectedCategory, selectedAuthor } = this.state
    return (
      <PresentationalComponent
        storyId={storyId}
        storyData={storyData}
        categorys={categorys}
        authors={authors}
        selectedCategory={selectedCategory}
        selectedAuthor={selectedAuthor}
        onHandleChangeAuthor={this.onHandleChangeAuthor.bind(this)}
        onHandleChangeCategory={this.onHandleChangeCategory.bind(this)}
        onHandleSaveStory={this.onHandleSaveStory.bind(this)}
        onPublishSaveStory={this.onPublishSaveStory.bind(this)}
      />
    )
  }
}

export default Container
