import React from 'react'
import { Table, Divider, Tag, Icon } from 'antd'
import { timestampToDateFormat } from '../../../lib/time'
import { Link } from 'react-router-dom'

import { AUTHOR_IMAGE_NOT_FOUND } from '../../../const/images'
import { STORY_STATUS_LIST } from '../../../const/story'
import { squareDiv } from '../../../lib/style'
import './index.css'

const filterCondition = STORY_STATUS_LIST.map(item => ({
  text: item.toLowerCase(),
  value: item
}))

const authorFieldDiv = targetAuthor => {
  const { imageUrl: authorImageUrl, id, name } = targetAuthor
  const imageUrl = authorImageUrl || AUTHOR_IMAGE_NOT_FOUND
  return (
    <div>
      {name && (
        <Link to={`/storys/authors/${id}`}>
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

export default class StoreListTable extends React.Component {
  // start -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= copy from antd
  state = {
    filteredInfo: null,
    sortedInfo: null
  }

  handleChange = (pagination, filters, sorter) => {
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter
    })
  }

  clearFilters = () => {
    this.setState({ filteredInfo: null })
  }

  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null
    })
  }

  setAgeSort = () => {
    this.setState({
      sortedInfo: {
        order: 'descend',
        columnKey: 'age'
      }
    })
  }

  // end -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= copy from antd

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
        title,
        categorys: selectedCategorys,
        author,
        createdAt,
        updatedAt,
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
        title: { title, id, updatedAt },
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

    let { sortedInfo, filteredInfo } = this.state
    sortedInfo = sortedInfo || {}
    filteredInfo = filteredInfo || {}

    const columns = [
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        render: ({ title, id, updatedAt }) => (
          <Link to={`/storys/${id}`}>
            <span className="storyListTitle"> {title || 'unknow-title'} </span>
            <span className="storyListTitleUpdate">
              {' '}
              Updated: {`${timestampToDateFormat(updatedAt, true)}`}{' '}
            </span>
          </Link>
        )
      },
      {
        title: 'Categorys',
        key: 'categorys',
        dataIndex: 'categorys',
        render: categorys => (
          <span>
            {categorys.map(({ name, id }) => (
              <Tag color="blue" key={name}>
                <Link to={`/storys/category/${id}`}>{name}</Link>
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
        key: 'status',
        filters: filterCondition,
        filteredValue: filteredInfo.status || null,
        onFilter: (value, record) => record.status.includes(value),
        sorter: (a, b) => a.status.length - b.status.length,
        sortOrder: sortedInfo.columnKey === 'status' && sortedInfo.order,
        render: status => <span className="storyStatusFont">{status}</span>
      },
      {
        title: 'CreatedAt',
        dataIndex: 'createdAt',
        key: 'createdAt',
        sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
        sortOrder: sortedInfo.columnKey === 'createdAt' && sortedInfo.order
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
    return (
      <div>
        <Table
          columns={columns}
          dataSource={data}
          onChange={this.handleChange}
          pagination={false}
        />
      </div>
    )
  }
}
