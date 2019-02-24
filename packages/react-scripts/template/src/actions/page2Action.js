import {
  FAILURE,
  REQUEST,
  SUCCESS,
  action,
  createRequestTypes,
} from './baseAction'

// Page2 load action
export const PAGE2_LOAD = 'PAGE2_LOAD'
export const page2Load = () => action(PAGE2_LOAD)

// getPage2Data 接口请求 actions & types
export const PAGE2_DATA_GET = createRequestTypes('PAGE2_DATA_GET')
export const page2DataGet = {
  request: () => action(PAGE2_DATA_GET[REQUEST]),
  success: data => action(PAGE2_DATA_GET[SUCCESS], { data }),
  failure: error => action(PAGE2_DATA_GET[FAILURE], { error }),
}
