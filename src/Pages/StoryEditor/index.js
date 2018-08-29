import React, { Component } from 'react'
import './index.css'
import { Button, message } from 'antd'
import DraftJS from 'draft-js'
import EditorComponent from '../../Components/EditorPage/Editor'
import MultiItemsSeletor from '../../Components/EditorPage/MultiItemsSeletor'
import SingleSelector from '../../Components/EditorPage/SingleSelector'
import StoryBreadcrumb from '../../Components/Common/StoryBreadcrumb'
import { Link, Route } from 'react-router-dom'

class EditorPage extends Component {
  handleRequest = (storyId, payload) => {
    const { onHandleSaveStory, history } = this.props

    return onHandleSaveStory(storyId, payload).then(() => history.push(`/storys`))
  }

  preHandleRequest = () => {
    const { selectedCategory = [], selectedAuthor: author = '' } = this.props
    const { editorState } = this.refs.editorComponent.state

    const data = JSON.stringify(DraftJS.convertToRaw(editorState.getCurrentContent()))
    const categorys = {}
    selectedCategory.forEach(item => (categorys[item] = true))
    return { data, categorys, author }
  }

  onPublishSaveStory = () => {
    const { storyId } = this.props
    const payload = this.preHandleRequest()
    const status = 'PUBLISHED'
    return this.handleRequest(storyId, { ...payload, status }).then(() =>
      message.success(`Story is published successfully`)
    )
  }

  onHandleSaveStory = () => {
    const { storyId } = this.props
    const payload = this.preHandleRequest()
    const status = 'DRAFT'
    return this.handleRequest(storyId, { ...payload, status }).then(() =>
      message.success(`Story is saved as draft successfully`)
    )
  }

  render() {
    const {
      storyId,
      storyData,
      categorys,
      authors,
      selectedCategory,
      selectedAuthor,
      onHandleChangeCategory,
      onHandleChangeAuthor
    } = this.props
    const displayTitle = (storyData && storyData.name) || storyId
    return (
      <div className="editorPageWrapper">
        <div className="titleBarWrapper">
          <StoryBreadcrumb queryType="story" current={displayTitle} />
          <Button onClick={this.onHandleSaveStory} type="primary" className="pushFlex">
            {' '}
            Save Draft{' '}
          </Button>
          <Button onClick={this.onPublishSaveStory} type="primary" className="leftMargin">
            {' '}
            Save Publish{' '}
          </Button>
        </div>
        <div>
          {categorys &&
            categorys.length > 1 && (
              <MultiItemsSeletor
                title="Categorys"
                items={categorys}
                selectedItems={selectedCategory}
                onHandleSelection={onHandleChangeCategory}
              />
            )}

          {authors &&
            authors.length > 1 && (
              <SingleSelector
                title="Author"
                items={authors}
                selectedItem={selectedAuthor}
                onHandleSelection={onHandleChangeAuthor}
              />
            )}
        </div>
        <div className="editorWrapper">
          {storyData &&
            !global.isEmptyObject(storyData) && (
              <EditorComponent ref="editorComponent" storyData={storyData} />
            )}
        </div>
      </div>
    )
  }
}

export default props => {
  return (
    <Route
      render={({ history }) => {
        const _props = { ...props, history }
        return <EditorPage {..._props} />
      }}
    />
  )
}
