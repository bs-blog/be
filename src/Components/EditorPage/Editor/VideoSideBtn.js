import PropTypes from 'prop-types'
import React from 'react'
import { AtomicBlockUtils, EditorState } from 'draft-js'

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
    const url = window.prompt('Enter a URL', 'https://www.youtube.com/watch?v=PMNFaAUs2mo')
    this.props.close()
    if (!url) {
      return
    }
    this.addEmbedURL(url)
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
    return (
      <button
        className="md-sb-button md-sb-video-button"
        type="button"
        title="Add an Embed"
        onClick={this.onClick}
      >
        <i className="fa fa-code" />
      </button>
    )
  }
}