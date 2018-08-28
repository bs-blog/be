import React from 'react'
import { Link } from 'react-router-dom'
import { Table, Divider, Tag, Icon } from 'antd'
import './index.css'

import { AUTHOR_IMAGE_NOT_FOUND } from '../../../lib/const'
import { squareDiv } from '../../../lib/style'
import { timestampToDateFormat } from '../../../lib/time'

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

const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    render: ({ title, id }) => <Link to={`/storys/${id}`}> {title} </Link>
  },
  {
    title: 'Categorys',
    key: 'categorys',
    dataIndex: 'categorys',
    render: categorys => (
      <span>
        {categorys.map(({ name }) => (
          <Tag color="blue" key={name}>
            {name}
          </Tag>
        ))}
      </span>
    )
  },
  {
    title: 'Author',
    dataIndex: 'author',
    key: 'author',
    render: authorFieldDiv
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: 'CreatedAt',
    dataIndex: 'createdAt',
    key: 'createdAt'
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => {
      const { deleteStory, disableStory } = record
      return (
        <span>
          <a onClick={disableStory}>
            <Icon type="minus-circle-o" />
          </a>
          <Divider type="vertical" />
          <a onClick={deleteStory}>
            <Icon type="delete" />
          </a>
        </span>
      )
    }
  }
]

export default class StoreListTable extends React.Component {
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
  tableData(storys = []) {
    return storys.map((item, index) => {
      const { deleteStory, disableStory } = this.props
      const {
        name: title,
        categorys: selectedCategorys,
        author,
        createdAt,
        id,
        status = 'DRAFT'
      } = item
      const targetAuthor = this.findAuthorById(author)
      const selectedCategorysList = this.findCategorysByCatMapping(selectedCategorys)

      return {
        id,
        key: index,
        author: targetAuthor,
        createdAt: timestampToDateFormat(createdAt),
        title: { title, id },
        categorys: selectedCategorysList,
        status,
        deleteStory: function() {
          if (window.confirm('Are you sure to delete the story? It will never come back.')) {
            return deleteStory(id)
          }
        },
        disableStory: function() {
          if (window.confirm('Disable story.')) {
            return disableStory(id)
          }
        }
      }
    })
  }
  render() {
    const { storys = [] } = this.props
    const data = this.tableData(storys)

    return (
      <div className="">
        <Table columns={columns} dataSource={data} />
      </div>
    )
  }
}
