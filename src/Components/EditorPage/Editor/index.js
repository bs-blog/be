import React from 'react'
import { Editor, createEditorState, Block, rendererFn } from 'medium-draft'

import './index.css'
import { ApiImageSideBtn } from './ImageSideBtn'
import VideoSideBtn from './VideoSideBtn'
import AtomicEmbedComponent from './AtomicEmbedComponent'
import { AtomicBlock } from './AtomicBlock'
import blockButtons from '../../../config/editorBlockButtons'
import inlineButtons from '../../../config/editorInlinStyle'

class EditorComponent extends React.Component {
  constructor(props) {
    super(props)
    const { rawContent } = this.props.storyData
    this.state = {
      editorState: createEditorState(rawContent)
    }

    this.sideButtons = [
      {
        title: 'Image',
        component: ApiImageSideBtn
      },
      {
        title: 'Video',
        component: VideoSideBtn
      }
    ]
  }

  componentDidMount() {
    this.refs.editor.focus()
  }

  onChange = editorState => {
    return this.setState({ editorState })
  }

  overideRendererFn = (setEditorState, getEditorState) => {
    const atomicRenderers = {
      embed: AtomicEmbedComponent
    }
    const rFnOld = rendererFn(setEditorState, getEditorState)
    const rFnNew = contentBlock => {
      const type = contentBlock.getType()
      switch (type) {
        case Block.ATOMIC:
          return {
            component: AtomicBlock,
            editable: false,
            props: {
              components: atomicRenderers,
              getEditorState
            }
          }
        default:
          return rFnOld(contentBlock)
      }
    }
    return rFnNew
  }

  render() {
    return (
      <div className="editorLayout">
        <div className="editorComponentWrapper">
          <Editor
            ref="editor"
            editorState={this.state.editorState}
            onChange={this.onChange}
            sideButtons={this.sideButtons}
            rendererFn={this.overideRendererFn}
            blockButtons={blockButtons.blogEditor}
            inlineButtons={inlineButtons.blogEditor}
          />
        </div>
      </div>
    )
  }
}

export default EditorComponent
