import React, { Component } from 'react'
import './index.css'
import { Row, Col, Button, Icon } from 'antd'
import { timestampToDateFormat } from '../../lib/time'
import { squareDiv } from '../../lib/style'
import { Link } from 'react-router-dom'

const rowStyle = {
  height: '50px',
  borderTop: '1px solid lightgray',
  lineHeight: '50px'
}

/*eslint no-useless-constructor: 0*/
class HomePage extends Component {
  state = {}

  handleCreate = () => {
    return this.props.createAuthor().then(newestAuthor => {
      return window.location.replace(`/author/${newestAuthor.id}`)
    })
  }
  render() {
    const { authors } = this.props
    return (
      <div className="App">
        <h1> Author </h1>
        <Row style={{ marginBottom: '20px' }}>
          <Button onClick={this.handleCreate}> New </Button>
        </Row>

        {authors.map((item, index) => {
          const { name, description, imageUrl, createdAt, id } = item
          return (
            <Row gutter={16} key={index} style={rowStyle}>
              {/* <Col span={4}> {index}</Col> */}
              <Col span={6}>
                <Link to={`/author/${id}`}>
                  <Icon type="edit" />
                  <span> {name} </span>
                </Link>
              </Col>
              <Col span={6}>
                {imageUrl ? (
                  <div className="userImage" style={squareDiv(imageUrl)} />
                ) : (
                  <b>Not found</b>
                )}
              </Col>
              <Col span={6}>{description}</Col>
              <Col span={6}>{timestampToDateFormat(createdAt)}</Col>
            </Row>
          )
        })}
      </div>
    )
  }
}
export default HomePage
