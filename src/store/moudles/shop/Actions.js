import {UP_ADEX, SELECT_NAV, ADD_NAV, UP_NAV, UP_SHOP, SELECT_SHOP} from '../../Mutation-types'
import axios from 'axios'
import baseURL from '../../../utils/httpApi'

axios.defaults.withCredentials = true

/**
 * 更新拓展表信息
 * @param commit
 * @param list
 * @returns {Promise.<TResult>}
 */
export const upAdEx = function ({commit}, adEx) {
  return axios.post(baseURL + 'upAdExpend.do', adEx).then(res => {
    commit(UP_ADEX, res)
  }).catch(error => {
    console.log(error)
  })
}
/**
 * 查询导航表信息
 * @param commit
 * @param list
 * @returns {Promise.<TResult>}
 */
export const selectNav = function ({commit}, adEx) {
  return axios.post(baseURL + 'selectNav.do', adEx).then(res => {
    commit(SELECT_NAV, res)
  }).catch(error => {
    console.log(error)
  })
}
/**
 * 添加导航表信息
 * @param commit
 * @param list
 * @returns {Promise.<TResult>}
 */
export const addNav = function ({commit}, navObj) {
  return axios.post(baseURL + 'addNavigation.do', navObj).then(res => {
    commit(ADD_NAV, res)
  }).catch(error => {
    console.log(error)
  })
}
/**
 * 编辑导航表信息
 * @param commit
 * @param list
 * @returns {Promise.<TResult>}
 */
export const upNav = function ({commit}, navObj) {
  return axios.post(baseURL + 'upNavigation.do', navObj).then(res => {
    commit(UP_NAV, res)
  }).catch(error => {
    console.log(error)
  })
}
/**
 * 编辑店铺表信息
 * @param commit
 * @param list
 * @returns {Promise.<TResult>}
 */
export const upShop = function ({commit}, company) {
  return axios.post(baseURL + 'upShop.do', company).then(res => {
    commit(UP_SHOP, res)
  }).catch(error => {
    console.log(error)
  })
}
/**
 * 编辑店铺表信息
 * @param commit
 * @param list
 * @returns {Promise.<TResult>}
 */
export const selectInfo = function ({commit}, adExIdObj) {
  return axios.post(baseURL + 'selectInfo.do', adExIdObj).then(res => {
    commit(SELECT_SHOP, res)
  }).catch(error => {
    console.log(error)
  })
}
