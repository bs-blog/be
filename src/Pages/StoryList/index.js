import React, { Component } from 'react'
import './index.css'
import { Row, Col, Button, Icon } from 'antd'
import { timestampToDateFormat } from '../../lib/time'
import { squareDiv } from '../../lib/style'
import { AUTHOR_IMAGE_NOT_FOUND } from '../../lib/const'
import { Link } from 'react-router-dom'

const rowStyle = {
  height: '50px',
  borderTop: '1px solid lightgray',
  lineHeight: '50px'
}

const authorFieldDiv = targetAuthor => {
  const { imageUrl: authorImageUrl, id, name } = targetAuthor
  const imageUrl = authorImageUrl || AUTHOR_IMAGE_NOT_FOUND
  return (
    <div>
      {name && (
        <Link to={`/author/${id}`}>
          <div className="UserWrapperImageEditorList">
            {<div className="spuareUserImageEditorList" style={squareDiv(imageUrl)} />}
            <span> {name} </span>
          </div>
        </Link>
      )}
      {!name && <span> No author </span>}
    </div>
  )
}

class StoryPage extends Component {
  findCategorysByCatMapping(targetCategorys = {}) {
    if (!targetCategorys || global.isEmptyObject(targetCategorys)) return []

    const { categorys } = this.props
    const targetCatIds = Object.entries(targetCategorys).map(([key, val]) => key)
    return categorys.filter(catItem => targetCatIds.some(targetId => targetId === catItem.id))
  }
  findAuthorById(authorId = '') {
    if (!authorId) return {}
    const { authors } = this.props
    return authors.find(item => item.id === authorId) || {}
  }
  handleCreate = () => {
    return this.props.createStory().then(newestStory => {
      return window.location.replace(`/storys/${newestStory.id}`)
    })
  }
  render() {
    const { storys = [] } = this.props
    return (
      <div className="storyPageWrapper">
        <h1> Storys </h1>
        <Row style={{ marginBottom: '20px' }}>
          <Button onClick={this.handleCreate}> New </Button>
        </Row>
        <div className="storyWrapper">
          {storys.map((item, index) => {
            const { id, name, categorys: selectedCategorys, author, createdAt = '' } = item
            const targetAuthor = this.findAuthorById(author)

            return (
              <Row gutter={10} key={index} style={rowStyle}>
                <Col span={6}>{authorFieldDiv(targetAuthor)}</Col>
                <Col span={8}>
                  <Link to={`/storys/${id}`}>
                    <Icon type="edit" />
                    <span> {name} </span>
                  </Link>
                </Col>
                <Col span={8}>
                  {this.findCategorysByCatMapping(selectedCategorys).map(item => (
                    <span key={item.name}> {item.name} </span>
                  ))}
                </Col>
                <Col span={2}> {timestampToDateFormat(createdAt)} </Col>
              </Row>
            )
          })}
        </div>
      </div>
    )
  }
}

export default StoryPage
