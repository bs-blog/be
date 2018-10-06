import React, { Component } from 'react'
import './index.css'
import { message, Button, Icon, Form, Input, Upload } from 'antd'
import { squareDiv } from '../../lib/style'
import { AUTHOR_IMAGE_NOT_FOUND } from '../../const/images'
import firebase from '../../lib/firebase'
import { Route } from 'react-router-dom'

const { TextArea } = Input
const FormItem = Form.Item

class AuthorEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      msg: null,
      previewImage: (props.author && props.author.imageUrl) || AUTHOR_IMAGE_NOT_FOUND
    }
  }

  handleSubmit(e) {
    const { updateAuthorById, history } = this.props
    const authorId = this.props.author.id
    const { previewImage } = this.state
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (err) {
        return message.error(err)
      }

      const { userName: name = '', description = '', about = '' } = values
      const imageUrl = previewImage || ''
      const payload = { name, description, about, imageUrl }

      return updateAuthorById(authorId, payload).then(() => {
        message.success(`User ${name} is saved successfully`)
        return history.push(`/author`)
      })
    })
  }
  firebaseUpload = async file => {
    try {
      const name = file.name
      const storageRef = firebase.storage().ref()
      const snapshoot = await storageRef.child(`images/${name}`).put(file)
      const previewImage = await snapshoot.ref.getDownloadURL()

      message.success(`Profile picture uploaded successfully`)
      return this.setState({ previewImage })
    } catch (err) {
      message.error(err)
    }
  }

  onChangeUpload = info => {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList)
    }
    if (info.file.status === 'done') {
      const previewImage = info.file.response.url
      message.success(`${info.file.response.url} file uploaded successfully`)
      this.setState({ previewImage })
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`)
    }
  }

  render() {
    const { author } = this.props
    const { getFieldDecorator } = this.props.form
    const { previewImage } = this.state
    const { id, name, about, description } = author

    const imageApiUploadProps = {
      name: 'file',
      action: '/ajax/upload',
      headers: {
        authorization: 'authorization-text'
      }
    }

    const imageFirebaseUploadProps = {
      name: 'file',
      action: this.firebaseUpload
    }

    return (
      <div>
        <div className="editorPageTitleBox">
          <h1> Author of {id}</h1>
        </div>
        <div className="author-edit-form-wrapper">
          <div className="author-edit-form">
            <Form onSubmit={this.handleSubmit.bind(this)}>
              <FormItem>
                {getFieldDecorator('userName', {
                  rules: [{ required: true, message: 'Please input your username!' }],
                  initialValue: name
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Username"
                  />
                )}
              </FormItem>

              <FormItem>
                {getFieldDecorator('description', { initialValue: description })(
                  <Input placeholder="Description" />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('about', { initialValue: about })(
                  <TextArea name="about" placeholder="AboutMe" />
                )}
              </FormItem>

              <FormItem>
                {getFieldDecorator('imageUrl', {})(
                  <Upload {...imageApiUploadProps} onChange={this.onChangeUpload}>
                    <Button>
                      <Icon type="upload" /> Click to Upload
                    </Button>
                  </Upload>
                )}
              </FormItem>

              <FormItem>
                <Button type="primary" htmlType="submit" className="author-edit-form-button">
                  Save
                </Button>
              </FormItem>
            </Form>
          </div>
          <div className="author-edit-preview" style={squareDiv(previewImage)} />
        </div>
      </div>
    )
  }
}

const WrappedAuthorEditor = Form.create()(AuthorEditor)

export default props => {
  return (
    <Route
      render={({ history }) => {
        const _props = { ...props, history }
        return <WrappedAuthorEditor {..._props} />
      }}
    />
  )
}
