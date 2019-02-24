import { all, fork } from 'redux-saga/effects'

import { watchPage2Load } from './sagas/page2Saga'

export default function*() {
  yield all([
    // page2-related
    fork(watchPage2Load),

    // ...
  ])
}
