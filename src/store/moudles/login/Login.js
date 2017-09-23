import * as action from './Actions'
import mutation from './Mutations'
const state = {
  checkUser: '',
  checkPhone: '',
  sendMsg: '',
  checkCode: '',
  signUpRes: '',
  adminState: '',
  token: '',
  check_login: ''
}
const actions = action
const mutations = mutation

export default {
  state,
  actions,
  mutations
}
