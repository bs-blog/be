import React from 'react'
import { Link } from 'react-router-dom'
import { Divider, Tag, Icon } from 'antd'
import { timestampToDateFormat } from '../../../lib/time'

import { STORY_STATUS_LIST } from '../../../const/story'

import { AUTHOR_IMAGE_NOT_FOUND } from '../../../const/images'
import { squareDiv } from '../../../lib/style'

export const filterCondition = STORY_STATUS_LIST.map(item => ({
  text: item.toLowerCase(),
  value: item
}))

export const authorFieldDiv = targetAuthor => {
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

export const TITLE = {
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
}

export const CATEGORY = {
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
}

export const AUTHOR = {
  title: 'Author',
  dataIndex: 'author',
  key: 'author',
  render: authorFieldDiv
}

export const STATUS = (sortedInfo, filteredInfo) => ({
  title: 'Status',
  dataIndex: 'status',
  key: 'status',
  filters: filterCondition,
  filteredValue: filteredInfo.status || null,
  onFilter: (value, record) => record.status.includes(value),
  sorter: (a, b) => a.status.length - b.status.length,
  sortOrder: sortedInfo.columnKey === 'status' && sortedInfo.order,
  render: status => <span className="storyStatusFont">{status}</span>
})

export const CREATED_AT = sortedInfo => ({
  title: 'CreatedAt',
  dataIndex: 'createdAt',
  key: 'createdAt',
  sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
  sortOrder: sortedInfo.columnKey === 'createdAt' && sortedInfo.order
})

export const ACTION = {
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

export default { TITLE, CATEGORY, AUTHOR, STATUS, CREATED_AT, ACTION }
