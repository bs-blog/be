import React, { Component } from 'react'
import './index.css'
import { Row, Button, message } from 'antd'
import DraftJS from 'draft-js'
import EditorComponent from '../../Components/EditorPage/Editor'
import MultiItemsSeletor from '../../Components/EditorPage/MultiItemsSeletor'
import SingleSelector from '../../Components/EditorPage/SingleSelector'
import { Route } from 'react-router-dom'

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

  onHandleSaveStory = () => {
    const { storyId, selectedCategory = [], selectedAuthor: author = '', history } = this.props
    const editorState = this.refs.editorComponent.state.editorState
    const data = JSON.stringify(DraftJS.convertToRaw(editorState.getCurrentContent()))
    const categorys = {}
    selectedCategory.forEach(item => (categorys[item] = true))
    const payload = { data, categorys, author }
    this.setState({ msg: 'Updating story ...' })
    return this.props
      .onHandleSaveStory(storyId, payload)
      .then(() => this.reset())
      .then(() => history.push(`/storys`))
      .then(() => message.success(`Story is saved successfully`))
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
    return (
      <div className="editorPageWrapper">
        <div className="editorPageTitleBox">
          <h1> Editor of {storyId}</h1>
          <Button onClick={this.onHandleSaveStory} type="primary">
            {' '}
            Save{' '}
          </Button>
        </div>
        <Row style={{ margin: '20px 0' }}>{msg && <span> {msg} </span>}</Row>

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
