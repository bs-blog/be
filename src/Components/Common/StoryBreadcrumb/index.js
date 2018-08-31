import React from 'react'
import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'
import './index.css'

export default class StoryBreadcrumb extends React.Component {
  render() {
    const { queryType, current } = this.props

    if (queryType === 'story') {
      return (
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/storys">Storys</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{current}</Breadcrumb.Item>
        </Breadcrumb>
      )
    }

    if (queryType && current) {
      return (
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/storys">Storys</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{queryType}</Breadcrumb.Item>
          <Breadcrumb.Item>{current}</Breadcrumb.Item>
        </Breadcrumb>
      )
    }

    return (
      <Breadcrumb>
        <Breadcrumb.Item>Storys/</Breadcrumb.Item>
      </Breadcrumb>
    )
  }
}
