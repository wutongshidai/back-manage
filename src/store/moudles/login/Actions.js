import {CHECK_PHONE, CHECK_USER, SEND_MSG, SIGN_UP, CHECK_CODE, SIGN_IN, CHECK_LOGIN} from '../../Mutation-types'
import baseURL from '../../../utils/httpApi'
import axios from 'axios'
axios.defaults.withCredentials = true
/**
 * 校验账户名
 * @param commit
 * @param userName 账户名对象
 * @returns {Promise.<TResult>}
 */

export const checkUser = function ({commit}, userNameList) {
  return axios.post(baseURL + 'selectByUserName.do', userNameList).then(res => {
    commit(CHECK_USER, res)
  }).catch(error => {
    console.log(error)
  })
}
/**
 * 校验手机号是否唯一
 * @param commit
 * @param phone 手机号对象
 * @returns {Promise.<T>}
 */
export const checkPhone = function ({commit}, phoneList) {
  return axios.post(baseURL + 'selectByPhone.do', phoneList).then((res) => {
    commit(CHECK_PHONE, res)
  }).catch(error => {
    console.log(error)
  })
}
/**
 * 发送短信
 * @param commit
 * @param phone 手机号对象
 * @returns {Promise.<T>}
 */
export const sendCheckMsg = function ({commit}, phoneList) {
  return axios.post(baseURL + 'sdkTestSend2.do', phoneList).then((res) => {
    commit(SEND_MSG, res)
  }).catch(error => {
    console.log(error)
  })
}
/**
 * 校验短信验证码
 * @param commit
 * @param codeList 验证码对象
 * @returns {Promise.<T>}
 */
export const checkcode = function ({commit}, codeList) {
  return axios.post(baseURL + 'checkCodesss2.do', codeList).then((res) => {
    commit(CHECK_CODE, res)
  }).catch(error => {
    console.log(error)
  })
}
/**
 * 注册接口
 * @param commit
 * @param company 公司对象
 * @returns {Promise.<T>}
 */
export const signUps = function ({commit}, company) {
  console.log(company)
  return axios.post(baseURL + 'signUp.do', company).then((res) => {
    if (res.status === 200) {
      commit(SIGN_UP, res)
    } else {
      console.log(res)
    }
  }).catch(error => {
    return error
  })
}
/**
 * 登录接口
 * @param commit
 * @param admin 店铺对象
 * @returns {Promise.<T>}
 */
export const signIns = function ({commit}, admin) {
  console.log(admin)
  return axios.post(baseURL + 'signIn.do', admin).then((res) => {
    if (res.status === 200) {
      commit(SIGN_IN, res)
    } else {
      console.log(res)
    }
  }).catch(error => {
    return error
  })
}
/**
 * 校验登录接口
 * @param commit
 * @param admin 店铺对象
 * @returns {Promise.<T>}
 */
export const checkLogin = function ({commit}) {
  return axios.post(baseURL + 'checkLogin.do').then((res) => {
    if (res.status === 200) {
      commit(CHECK_LOGIN, res)
    } else {
      console.log(res)
    }
  }).catch(error => {
    return error
  })
}
