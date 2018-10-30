import React from 'react'
import { Table } from 'antd'
import Media from 'react-media'
import { timestampToDateFormat } from '../../../lib/time'
import { TITLE, CATEGORY, AUTHOR, STATUS, CREATED_AT, ACTION } from './config'
import './index.css'

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

    return (
      <div>
        <Media query="(min-width: 599px)">
          {matches => {
            const columns = [TITLE]

            if (matches)
              columns.push(
                ...[CATEGORY, AUTHOR, STATUS(sortedInfo, filteredInfo), CREATED_AT, ACTION]
              )

            return (
              <Table
                columns={columns}
                dataSource={data}
                onChange={this.handleChange}
                pagination={false}
              />
            )
          }}
        </Media>
      </div>
    )
  }
}
