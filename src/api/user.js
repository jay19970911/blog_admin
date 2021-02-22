// import axios from 'axios'
import request from '@/utils/request'

// 登录接口
export function login(data) {
  return request({

    url: '/api/user/login',
    method: 'post',
    data
  })
}