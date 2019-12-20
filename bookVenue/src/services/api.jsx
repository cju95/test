

import Taro from '@tarojs/taro'
import { HTTP_STATUS } from '../const/status'
import { base } from './config'
import { logError } from '../utils/logError'

let token = ''
//let cookie = 

export default {
  baseOptions(params, method = 'GET') {
   token='6h1oehmldplebj5k2oojct6eg1'
    console.log(token)
    let { url, data } = params
    //  let token = getApp().globalData.token
    // if (!token) login()
    console.log('params', params)
    let contentType = 'application/x-www-form-urlencoded'
    contentType = params.contentType || contentType
    console.log(contentType)
    const option = {
      isShowLoading: false,
      loadingText: '正在加载',
      url: base + url,
      data: data,
      method: method,
      header: { 'content-type': contentType, 'Set-Token': token },
      success(res) {
        if (res.statusCode === HTTP_STATUS.NOT_FOUND) {
          return logError('api', '请求资源不存在')
        } else if (res.statusCode === HTTP_STATUS.BAD_GATEWAY) {
          return logError('api', '服务端出现了问题')
        } else if (res.statusCode === HTTP_STATUS.FORBIDDEN) {
          return logError('api', '没有权限访问')
        } else if (res.statusCode === HTTP_STATUS.SUCCESS) {
          return res.data
        }
      },
      error(e) {
        logError('api', '请求接口出现问题', e)
      }
    }
    return Taro.request(option)
  },
  get(url, data ={device: 1}) {
    token = Taro.getStorageSync('Cookies')? Taro.getStorageSync('Cookies') : ''
    console.log(token)
    let option = { url, data }
    return this.baseOptions(option)
  },
  post: function (url, data, contentType) {
    token = Taro.getStorageSync('Cookies')? Taro.getStorageSync('Cookies') : ''
    console.log(token)
    data= {device: 1, ...data}
    let params = { url, data, contentType }
    return this.baseOptions(params, 'POST')
  }
}