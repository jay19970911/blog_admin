// import axios from 'axios'
import request from '@/utils/request'

// 项目列表
export function list(params) {
  return request({
    url: '/api/project/query',
    params
  })
}

// 详情接口
export function detail(id) {
  return request({
    url: `/api/project/detail/${id}`,
    method: 'get'
  })
}


// 新增接口
export function add(data) {
  return request({
    url: `/api/project/add`,
    method: 'post',
    data
  })
}

// 编辑接口
export function update(data) {
  return request({
    url: `/api/project/update/${data.id}`,
    method: 'put',
    data
  })
}

// 删除
export function remove(id) {
  return request({
    url: `/project/delete/${id}`,
    method: 'delete'
  })
}