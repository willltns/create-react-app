import '../../common/css/base.css'

import React from 'react'
import { Switch } from 'react-router-dom'

import routes from '../../configureRoutes'

import RouteWithSubRoutes from '../routeWithSubRoutes'

class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </Switch>
      </div>
    )
  }
}

export default App
