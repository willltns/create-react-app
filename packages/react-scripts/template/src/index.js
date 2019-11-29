import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import React, { Suspense } from 'react'
import { createBrowserHistory } from 'history'
import { ConnectedRouter } from 'connected-react-router'

import configureStore from './configureStore'
import * as serviceWorker from './serviceWorker'

import App from './components/app'
import Spinner from './components/spinner'

export const history = createBrowserHistory()

export const store = configureStore(history)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
        <Suspense fallback={Spinner}>
          <App />
        </Suspense>
    </ConnectedRouter>
  </Provider>,

  document.getElementById('root')
)

// If you want your App to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.

// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

