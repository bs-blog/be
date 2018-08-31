import PropTypes from 'prop-types'
import React from 'react'
import { AtomicBlockUtils, EditorState } from 'draft-js'
import styled from 'styled-components'

export default class VideoSideBtn extends React.Component {
  static propTypes = {
    setEditorState: PropTypes.func,
    getEditorState: PropTypes.func,
    close: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
    this.addEmbedURL = this.addEmbedURL.bind(this)
  }

  onClick() {
    const url = window.prompt('Enter a URL', 'insert video link url, please')
    this.props.close()

    const isFromHttp = url && url.includes('http')
    if (!isFromHttp) return window.alert('Given is not a URL')

    return this.addEmbedURL(url)
  }

  addEmbedURL(url) {
    let editorState = this.props.getEditorState()
    const content = editorState.getCurrentContent()
    const contentWithEntity = content.createEntity('embed', 'IMMUTABLE', { url })
    const entityKey = contentWithEntity.getLastCreatedEntityKey()
    editorState = EditorState.push(editorState, contentWithEntity, 'create-entity')
    this.props.setEditorState(AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, 'E'))
  }

  render() {
    return <VideoButtonDiv title="Add an embed Video" onClick={this.onClick} />
  }
}

const VideoButtonDiv = styled.button`
  background-image: url(https://bs-blog.github.io/be/static/video-128.png);
  background-size: 30px 30px;
  background-repeat: no-repeat;
  width: 30px;
  height: 30px;
  border: 0px;
`
