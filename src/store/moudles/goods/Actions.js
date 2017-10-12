import {SAVE_GOODS, SOLD_OUT, EDIT_GOODS, GET_GOODS} from '../../Mutation-types'
import axios from 'axios'
import baseURL from '../../../utils/httpApi'

axios.defaults.withCredentials = true
/**
 * 保存商品
 * @param commit
 * @param list
 * @returns {Promise.<TResult>}
 */
export const savegoods = function ({commit}, list) {
  console.log(list)
  return axios.post(baseURL + 'insertGoods.do', list).then(res => {
    console.log(list)
    commit(SAVE_GOODS, res)
  }).catch(error => {
    console.log(error)
  })
}
/**
 * 编辑商品
 * @param commit
 * @param list
 * @returns {Promise.<TResult>}
 */
export const editGood = function ({commit}, object) {
  return axios.post(baseURL + 'editGoods.do', object).then(res => {
    commit(EDIT_GOODS, res)
  }).catch(error => {
    console.log(error)
  })
}
/**
 * 上、下架商品
 * @param commit
 * @param list
 * @returns {Promise.<TResult>}
 */
export const soldOut = function ({commit}, list) {
  return axios.post(baseURL + 'soldOut.do', list).then(res => {
    commit(SOLD_OUT, res)
  }).catch(error => {
    console.log(error)
  })
}
/**
 * 查询商品列表
 * @param commit
 * @param list
 * @returns {Promise.<TResult>}
 */
export const getGoods = function ({commit}, adExId) {
  return axios.post(baseURL + 'getGoods.do', adExId).then(res => {
    commit(GET_GOODS, res)
  }).catch(error => {
    console.log(error)
  })
}
