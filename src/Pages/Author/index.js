import React, { Component } from 'react'
import './index.css'
import { message, Button, Icon, Form, Input, Upload } from 'antd'
import { squareDiv } from '../../lib/style'
import { AUTHOR_IMAGE_NOT_FOUND } from '../../lib/const'
import firebase from '../../lib/firebase'

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
    const { updateAuthorById } = this.props
    const authorId = this.props.author.id
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (err) {
        return message.error(err)
      }

      const { userName: name = '', description = '', about = '', imageUrl: imgObj } = values
      const imageUrl = (imgObj && imgObj.fileList && imgObj.fileList[0].response.url) || ''
      const payload = { name, description, about, imageUrl }
      return updateAuthorById(authorId, payload).then(() => {
        console.log('done')
        return window.location.replace('/author')
      })
    })
  }
  upload = async file => {
    try {
      const name = file.name
      const storageRef = firebase.storage().ref()
      const snapshoot = await storageRef.child(`images/${name}`).put(file)
      const previewImage = await snapshoot.ref.getDownloadURL()

      message.success(`Profile picture uploaded successfully`)
      this.setState({ previewImage })

      return previewImage
    } catch (err) {
      message.error(err)
    }
  }

  render() {
    const { author } = this.props
    const { getFieldDecorator } = this.props.form
    const { previewImage } = this.state
    const { id, name, about, description } = author

    const imageProps = {
      name: 'file',
      action: this.upload
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
                  <Upload {...imageProps}>
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

export default WrappedAuthorEditor
