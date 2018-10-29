import React, { Component } from 'react'
import './index.css'
import { Route, Link } from 'react-router-dom'
import { Menu } from 'antd'
import router from '../../router/publicConfig'
const { Item } = Menu

// const iconMapping = {
//   Category: 'global',
//   Author: 'user',
//   Storys: 'book',
//   Logout: 'logout'
// }

const RowItem = ({ path, title, icon, isSidebar = true }) => {
  if (!isSidebar) return

  // const _icon = icon || iconMapping[title] || 'user'

  return (
    <Item key={title}>
      <Link to={path}>
        {/* <Icon type={_icon} /> */}
        <span className="nav-text">{title}</span>
      </Link>
    </Item>
  )
}

const HeaderMenu = ({ match }) => {
  return (
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={[match.url]}
      style={{ lineHeight: '60px' }}
    >
      {router.map(RowItem)}
    </Menu>
  )
}

class HeaderBar extends Component {
  state = {
    collapsed: false
  }
  onCollapse = collapsed => {
    this.setState({ collapsed })
  }
  render() {
    return (
      <div className="header" mode="horizontal">
        <div className="sideBarLogo" />
        <Route path="/" component={HeaderMenu} />
      </div>
    )
  }
}

export default HeaderBar
