import axios from 'axios'
import { baseURL } from '@/constants'

// 项目列表
export function list(params) {
  return axios({
    baseURL: baseURL,
    url: '/project/query',
    params
  })
}

// 详情接口
export function detail(id) {
  return axios({
    baseURL: baseURL,
    url: `/project/detail/${id}`,
    method: 'get'
  })
}


// 新增接口
export function add(data) {
  return axios({
    baseURL: baseURL,
    url: `/project/add`,
    method: 'post',
    data
  })
}

// 编辑接口
export function update(data) {
  return axios({
    baseURL: baseURL,
    url: `/project/update/${data.id}`,
    method: 'put',
    data
  })
}

// 删除
export function remove(id) {
  return axios({
    baseURL: baseURL,
    url: `/project/delete/${id}`,
    method: 'delete'
  })
}