import React, { Component } from 'react'
import { Button } from 'antd'
import StoreListTable from '../../Components/StoryListPage/StoryTable'
import StoryBreadcrumb from '../../Components/Common/StoryBreadcrumb'
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
          <StoryBreadcrumb {...this.props} />
          <Button onClick={this.handleCreate} type="primary" className="pushFlex">
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
