import React, { Component } from 'react'
import { Row, Button } from 'antd'
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
        <h1> Storys </h1>
        <Row style={{ marginBottom: '20px' }}>
          <Button onClick={this.handleCreate}> New </Button>
        </Row>
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
