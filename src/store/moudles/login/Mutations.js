import {CHECK_USER, CHECK_PHONE, SEND_MSG, CHECK_CODE, SIGN_UP, SIGN_IN, SET_TOKEN, CHECK_LOGIN} from '../../Mutation-types'

const mutations = {
  [CHECK_USER] (state, res) {
    // state.signup_states = list
    state.checkUser = res.data
  },
  [CHECK_PHONE] (state, res) {
    state.checkPhone = res.data
  },
  [SEND_MSG] (state, res) {
    state.sendMsg = res.data
  },
  [CHECK_CODE] (state, res) {
    state.checkCode = res.data
  },
  [SIGN_UP] (state, res) {
    state.signUpRes = res.data
  },
  [SIGN_IN] (state, res) {
    state.adminState = res.data
  },
  [SET_TOKEN] (state, res) {
    state.token = res
  },
  [CHECK_LOGIN] (state, res) {
    state.check_login = res.data
  }
}

export default mutations
