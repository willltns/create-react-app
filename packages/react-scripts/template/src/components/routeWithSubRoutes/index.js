import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const RouteWithSubRoutes = route => (
  <Route
    path={route.path}
    exact={!!route.exact}
    render={props =>
      route.redirectTo ? (
        <Redirect to={route.redirectTo} />
      ) : (
        <route.component {...props} routes={route.routes} />
      )
    }
  />
)

export default RouteWithSubRoutes
