import { call, put } from 'redux-saga/effects'

import * as api from '../common/api'

import * as page2Action from '../actions/page2Action'

// 接口调用 与 action 派发 封装实体
function* fetchEntity(entity, apiFn, params = {}) {
  yield put(entity.request())
  try {
    const { data } = yield call(apiFn, params)
    yield put(entity.success(data))
  } catch (e) {
    yield put(entity.failure(e))
  }
}

// ----------------------------------------------------------------------------

// 获取page2数据 请求实体
export const fetchPage2Data = fetchEntity.bind(
  null,
  page2Action.page2DataGet,
  api.getPage2Data
)
