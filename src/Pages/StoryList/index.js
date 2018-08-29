import React, { Component } from 'react'
import { Row, Button, Breadcrumb } from 'antd'
import StoreListTable from '../../Components/StoryListPage/StoryTable'
import { Route } from 'react-router-dom'
import './index.css'

class StoryPage extends Component {
  handleCreate = () => {
    const { history, createStory } = this.props
    return createStory().then(newestStory => {
      return history.push(`/storys/${newestStory.id}`)
    })
  }
  render() {
    return (
      <div className="storyPageWrapper">
        <div className="titleBarWrapper">
          <Breadcrumb>
            <Breadcrumb.Item>Storys/</Breadcrumb.Item>
          </Breadcrumb>
          <Button onClick={this.handleCreate} type="primary">
            {' '}
            New{' '}
          </Button>
        </div>
        <div className="storyWrapper">
          <StoreListTable {...this.props} />
        </div>
      </div>
    )
  }
}

export default props => {
  return (
    <Route
      render={({ history }) => {
        const _props = { ...props, history }
        return <StoryPage {..._props} />
      }}
    />
  )
}
