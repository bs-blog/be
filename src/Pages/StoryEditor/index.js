import React, { Component } from 'react'
import './index.css'
import { Button, message, Breadcrumb } from 'antd'
import DraftJS from 'draft-js'
import EditorComponent from '../../Components/EditorPage/Editor'
import MultiItemsSeletor from '../../Components/EditorPage/MultiItemsSeletor'
import SingleSelector from '../../Components/EditorPage/SingleSelector'
import { Link, Route } from 'react-router-dom'

class EditorPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      msg: null
    }
  }

  reset() {
    this.setState({ msg: null })
  }

  handleRequest = (storyId, payload) => {
    const { onHandleSaveStory, history } = this.props

    return onHandleSaveStory(storyId, payload)
      .then(() => this.reset())
      .then(() => history.push(`/storys`))
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
    const { msg } = this.state
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
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/storys">Storys</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{displayTitle}</Breadcrumb.Item>
          </Breadcrumb>
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
