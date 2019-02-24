import { take, call, put } from 'redux-saga/effects'
import { push } from 'connected-react-router'

import { PAGE2_LOAD } from '../actions/page2Action'

import { fetchPage2Data } from './baseSaga'

export function* watchPage2Load() {
  while (true) {
    yield take(PAGE2_LOAD)

    // 同步调用接口实体
    yield call(fetchPage2Data)

    // 路由跳至'/page1'
    // yield put(push('/page1'))
  }
}
