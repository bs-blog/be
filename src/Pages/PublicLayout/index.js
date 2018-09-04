/*eslint-disable no-unused-vars*/
import React, { Component } from 'react'
import './index.css'
import { Route } from 'react-router-dom'
import { Layout } from 'antd'
import routers from '../../router/publicConfig'
const { Header, Content } = Layout
//const { Header, Content, Footer } = Layout

class BigContent extends Component {
  render() {
    return (
      <Layout style={{ marginLeft: 200 }}>
        <Content
          style={{
            margin: '24px 16px 0',
            overflow: 'initial',
            height: '100vh'
          }}
        >
          {routers.map(({ path, component, exact = true }, index) => {
            return <Route exact={exact} path={path} component={component} key={index} />
          })}
        </Content>
        {/* <Footer style={{ textAlign: 'center' }}>designed by</Footer> */}
      </Layout>
    )
  }
}

export default BigContent
