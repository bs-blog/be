import React, { Component } from 'react'
import './index.css'
import { Row, Col, Button, Icon } from 'antd'
import UpdateCategoryModal from '../../Components/HomePage/UpdateCategoryModal'
import CreateCategoryModal from '../../Components/HomePage/CreateCategoryModal'
import { timestampToDateFormat } from '../../lib/time'

const rowStyle = {
  height: '50px',
  borderTop: '1px solid lightgray',
  lineHeight: '50px'
}

/*eslint no-useless-constructor: 0*/
class HomePage extends Component {
  state = {
    isCreateModalVisible: false,
    isUpdateModalVisible: false,
    targetCategory: null
  }

  reset() {
    return this.setState({
      isCreateModalVisible: false,
      isUpdateModalVisible: false,
      targetCategory: null
    })
  }

  turnOffUpdateModal = e => {
    this.reset()
  }

  turnOffCreateModal = e => {
    this.reset()
  }

  turnOnCreateModal = () => {
    this.setState({
      isCreateModalVisible: true
    })
  }

  turnOnUpdateModal = targetCategory => e => {
    this.setState({
      isUpdateModalVisible: true,
      targetCategory
    })
  }

  onHandleUpdateCategory = e => {
    const { updateCategoryById } = this.props
    const { targetCategory } = this.state

    return this.validateForm('UPDATE')
      .then(formValue => {
        const { name } = formValue
        return updateCategoryById(targetCategory.id, { name })
      })
      .then(() => {
        this.reset()
      })
  }

  onHandleCreateCategory = () => {
    const { createCategory } = this.props

    return this.validateForm('CREATE')
      .then(formValue => {
        const { name } = formValue
        return createCategory({ name })
      })
      .then(() => {
        this.reset()
      })
  }

  validateForm = formKey => {
    return new Promise((resolve, reject) => {
      const form = this[formKey].props.form
      form.validateFields((err, values) => {
        if (err) {
          console.error(err)
          return reject()
        }

        console.log('Received values of form: ', values)
        form.resetFields()
        return resolve(values)
      })
    })
  }

  saveFormRef = formKey => formRef => {
    this[formKey] = formRef
  }

  render() {
    const { categorys = [] } = this.props
    const { isUpdateModalVisible, targetCategory, isCreateModalVisible } = this.state
    return (
      <div className="App">
        <h1> Cateogry </h1>
        <Row style={{ marginBottom: '20px' }}>
          <Button onClick={this.turnOnCreateModal}> New </Button>
        </Row>
        {targetCategory && (
          <UpdateCategoryModal
            wrappedComponentRef={this.saveFormRef('UPDATE')}
            visible={isUpdateModalVisible}
            onCancel={this.turnOffUpdateModal}
            onOk={this.onHandleUpdateCategory}
            item={targetCategory}
          />
        )}

        <CreateCategoryModal
          wrappedComponentRef={this.saveFormRef('CREATE')}
          visible={isCreateModalVisible}
          onCancel={this.turnOffCreateModal}
          onOk={this.onHandleCreateCategory}
        />

        {categorys.map((item, index) => {
          const { name, createdAt } = item
          return (
            <Row gutter={10} key={index} style={rowStyle}>
              <Col span={4}> {index}</Col>
              <Col span={10}>
                <div onClick={this.turnOnUpdateModal(item)}>
                  <Icon type="edit" />
                  <span> {name} </span>
                </div>
              </Col>
              <Col span={10}> {timestampToDateFormat(createdAt)} </Col>
            </Row>
          )
        })}
      </div>
    )
  }
}

export default HomePage
