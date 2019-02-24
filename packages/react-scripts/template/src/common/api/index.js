import axios from '../utils/axios'

// page2页面数据初始获取
export const getPage2Data = params => axios.get('/getPage2Data', { params: params })

// 若为post请求传参 -> axios.post('/getPage2Data', params)
