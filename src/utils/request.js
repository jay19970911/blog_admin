import axios from 'axios'
import authority from '@/utils/authority'

import { baseURL, isDev } from '@/constants'

// 创建一个axios实例，为其设置一些基础配置参数
const instance = axios.create({
  timeout: 5000, // 请求超时时间,如果超过5s就会报错
  baseURL: isDev ? '' : baseURL // 表示我们请求api时候的基地址,此地址会拼接上请求中的url
})

// Add a request interceptor
//  全局请求拦截，所有的网络请求发起之前都会走这这里
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // console.log('请求执行之前')
    const user = authority.get()
    if (user.token) {

      config.headers.authorization = `bearer ${user.token} ` // 当登录成功之后会把token信息存储在本地，此时可以同本地中取出token
    }
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
//  全局相应拦截，所有的网络请求返回之后都会走这里
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // response表示返回的结果，我们可以对这个结果做处理
    // console.log('请求执行完成')
    // console.log(response)
    return response.data
  },
  function (error) {
    // console.dir(error)
    if (error.response.status === 401) {
      // window.location.href = '/#/login' // 跳转到登录页
    }
    // if (error.message.indexOf('timeout') > -1) {
    //   alert('请求超时，请重试')
    // }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
)

export default instance