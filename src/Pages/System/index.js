import React, { Component } from 'react'
import './index.css'
import { message, Button, Form, Input } from 'antd'
import { Route } from 'react-router-dom'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
}
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
}

class System extends Component {
  handleSubmit = e => {
    const { update, history } = this.props
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        return update(values).then(() => {
          message.success(`system updated success `)
          return history.push(`/`)
        })
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { system = {} } = this.props

    const textFieldRules = [{ required: true, message: `Please input your text!` }]
    const textField = (field = '', placeholder = '') => (
      <FormItem label={placeholder} {...formItemLayout}>
        {getFieldDecorator(field, { rules: textFieldRules, initialValue: system && system[field] })(
          <Input placeholder={placeholder} />
        )}
      </FormItem>
    )

    return (
      <div className="storyPageWrapper">
        <h1> System Configuration</h1>
        <div className="systemFormWrapper">
          <Form onSubmit={this.handleSubmit} className="login-form">
            {textField('productShortName', 'Short Name')}
            {textField('productNameZh', 'Chinese Name')}
            {textField('productNameEng', 'English Name')}
            {textField('productDescription', 'Description')}
            {textField('productLogoUrl', 'Logo Url')}
            {textField('productHost', 'Host Url')}
            {textField('productFacebookId', 'Facebook Id')}
            {textField('youtubeUrl', 'Youtube Url')}
            {textField('facebookUrl', 'facebook Url')}
            {textField('contactEmail', 'Contact Email')}
            <FormItem {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Save
              </Button>
            </FormItem>
          </Form>
        </div>
      </div>
    )
  }
}

const WrappedSystem = Form.create()(System)

export default props => {
  return (
    <Route
      render={({ history }) => {
        const _props = { ...props, history }
        return <WrappedSystem {..._props} />
      }}
    />
  )
}
