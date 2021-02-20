import axios from 'axios'
import { baseURL } from '@/constants'

// 博客列表
export function list(params) {
  return axios({
    baseURL: baseURL,
    url: '/blog/query',
    params
  })
}

// 删除
export function remove(id) {
  return axios({
    baseURL: baseURL,
    url: `/blog/delete/${id}`,
    method: 'delete'
  })
}

// 详情接口
export function detail(id) {
  return axios({
    baseURL: baseURL,
    url: `/blog/detail/${id}`,
    method: 'get'
  })
}


// 新增接口
export function add(data) {
  return axios({
    baseURL: baseURL,
    url: `/blog/add`,
    method: 'post',
    data
  })
}

// 编辑接口
export function update(data) {
  return axios({
    baseURL: baseURL,
    url: `/blog/update/${data.id}`,
    method: 'put',
    data
  })
}

// 分类 
// 查询接口
export function cateList(params) {
  return axios({
    baseURL: baseURL,
    url: '/blog/cate/query',
    params
  })
}

// 新增接口
export function cateAdd(data) {
  return axios({
    baseURL: baseURL,
    url: `/blog/cate/add`,
    method: 'post',
    data
  })
}

// 编辑接口
export function cateUpdate(data) {
  return axios({
    baseURL: baseURL,
    url: `/blog/cate/update/${data.id}`,
    method: 'put',
    data
  })
}

// 删除接口
export function cateRemove(id) {
  return axios({
    baseURL: baseURL,
    url: `/blog/cate/delete/${id}`,
    method: 'delete'
  })
}

// 启用和禁用
export function change(data) {
  const url = !data.status
    ? `/blog/cate/${data.id}/resume`
    : `/blog/cate/${data.id}/forbid`
  return axios({
    baseURL: baseURL,
    url,
    method: 'patch'
  })
}