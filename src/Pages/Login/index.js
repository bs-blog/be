/*eslint-disable no-unused-vars*/
import React, { Component } from 'react'
import './index.css'
import { message, Form, Input } from 'antd'
const FormItem = Form.Item

// read more ant: Form
// https://ant.design/components/form/

const style = {
  margin: 'auto',
  padding: '50px 20px',
  maxWidth: '500px'
}

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = (e, field) => {
    return this.setState({ [field]: e.target.value })
  }

  handleSubmit = async e => {
    e.preventDefault()
    const { email, password } = this.state
    const { signin } = this.props

    try {
      const result = await signin(email, password)

      if (!result.user) throw result

      return message.success(`${email} login successed`)
    } catch (err) {
      return message.error(err.message || 'unknow error')
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form

    const RequiredField = ({ field, placeholder }) =>
      getFieldDecorator(field, {
        onChange: e => this.handleChange(e, field),
        rules: [
          {
            required: true,
            message: `What's your ${field}?`
          }
        ]
      })(<Input placeholder={placeholder} />)

    return (
      <Form onSubmit={this.handleSubmit.bind(this)} style={style}>
        <legend>A Stacked Form</legend>

        <FormItem>{RequiredField({ field: 'email', placeholder: 'peter@peter.com' })}</FormItem>

        <FormItem>{RequiredField({ field: 'password', placeholder: 'yourpassword' })}</FormItem>

        <button type="submit" className="">
          Sign in
        </button>
      </Form>
    )
  }
}

export default Form.create()(Login)
