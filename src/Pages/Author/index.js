import React, { Component } from 'react'
import './index.css'
import { message, Button, Icon, Form, Input, Upload } from 'antd'
import { squareDiv } from '../../lib/style'
import { AUTHOR_IMAGE_NOT_FOUND } from '../../lib/const'
const { TextArea } = Input
const FormItem = Form.Item

const imageProps = {
  name: 'file',
  action: '/ajax/upload',
  headers: {
    authorization: 'authorization-text'
  }
}

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
                  <Upload {...imageProps} onChange={this.onChangeUpload}>
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