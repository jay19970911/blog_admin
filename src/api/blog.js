// import axios from 'axios'
import request from '@/utils/request'

// 博客列表
export function list(params) {
  return request({
    url: '/api/blog/query',
    params
  })
}

// 删除
export function remove(id) {
  return request({
    url: `/api/blog/delete/${id}`,
    method: 'delete'
  })
}

// 详情接口
export function detail(id) {
  return request({
    url: `/api/blog/detail/${id}`,
    method: 'get'
  })
}


// 新增接口
export function add(data) {
  return request({
    url: `/api/blog/add`,
    method: 'post',
    data
  })
}

// 编辑接口
export function update(data) {
  return request({
    url: `/api/blog/update/${data.id}`,
    method: 'put',
    data
  })
}

// 分类 
// 查询接口
export function cateList(params) {
  return request({
    url: '/api/blog/cate/query',
    params
  })
}

// 新增接口
export function cateAdd(data) {
  return axios({
    url: `/api/blog/cate/add`,
    method: 'post',
    data
  })
}

// 编辑接口
export function cateUpdate(data) {
  return request({
    url: `/api/blog/cate/update/${data.id}`,
    method: 'put',
    data
  })
}

// 删除接口
export function cateRemove(id) {
  return request({
    url: `/api/blog/cate/delete/${id}`,
    method: 'delete'
  })
}

// 启用和禁用
export function change(data) {
  const url = !data.status
    ? `/api/blog/cate/${data.id}/resume`
    : `/api/blog/cate/${data.id}/forbid`
  return request({
    url,
    method: 'patch'
  })
}