import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import commonReducer from './reducers/commonReducer'
import page2Reducer from './reducers/page2Reducer'

export default history =>
  combineReducers({
    common: commonReducer,
    page2: page2Reducer,
    router: connectRouter(history),
  })
