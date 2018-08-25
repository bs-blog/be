import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './lib/firebase'
import { BrowserRouter as Router } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker'
import SideBar from './Components/SideBar'
import PublicLayout from './Pages/PublicLayout'
import PrivateLayout from './Pages/PrivateLayout'
import Auth from './Components/Auth'
import Private from './router/Private'
import Public from './router/Public'
import { Layout } from 'antd'

import { Provider } from 'react-redux'

import store from './store'
import './lib/polyfill.js'

const basename = process.env.ROUTER_BASENAME || window.ROUTER_BASENAME || ''

const Root = ({ store }) => (
  <Provider store={store}>
    <Auth>
      <Private>
        <Router basename={`/${basename}`}>
          <Layout>
            <SideBar />
            <PublicLayout />
          </Layout>
        </Router>
      </Private>
      <Public>
        <Router basename={`/${basename}`}>
          <PrivateLayout />
        </Router>
      </Public>
    </Auth>
  </Provider>
)

ReactDOM.render(<Root store={store} />, document.getElementById('root'))
registerServiceWorker()
