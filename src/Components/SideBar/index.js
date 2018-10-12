import React, { Component } from 'react'
import './index.css'
import { Route, Link } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'
import router from '../../router/publicConfig'
const { Sider } = Layout
const { Item } = Menu

const iconMapping = {
  Category: 'global',
  Author: 'user',
  Storys: 'book',
  Logout: 'logout'
}

const RowItem = ({ path, title, icon, isSidebar = true }) => {
  if (!isSidebar) return

  const _icon = icon || iconMapping[title] || 'user'

  return (
    <Item key={title}>
      <Link to={path}>
        <Icon type={_icon} />
        <span className="nav-text">{title}</span>
      </Link>
    </Item>
  )
}

const SiderMenu = ({ match }) => {
  return (
    <Menu theme="dark" mode="inline" defaultSelectedKeys={[match.url]}>
      {router.map(RowItem)}
    </Menu>
  )
}

class SideBar extends Component {
  state = {
    collapsed: false
  }
  onCollapse = collapsed => {
    this.setState({ collapsed })
  }
  render() {
    return (
      <Sider
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0
        }}
      >
        <div className="sideBarLogo" />
        <Route path="/" component={SiderMenu} />
      </Sider>
    )
  }
}

export default SideBar
