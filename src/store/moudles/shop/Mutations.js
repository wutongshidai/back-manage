import {UP_ADEX, SELECT_NAV, ADD_NAV, UP_NAV, UP_SHOP, SELECT_SHOP} from '../../Mutation-types'

const mutations = {
  [UP_ADEX] (state, res) {
    // state.signup_states = list
    state.upAdExState = res.data
  },
  [SELECT_NAV] (state, res) {
    // state.signup_states = list
    state.selectNavState = res.data
  },
  [ADD_NAV] (state, res) {
    // state.signup_states = list
    state.addNavState = res.data
  },
  [UP_NAV] (state, res) {
    // state.signup_states = list
    state.upNavState = res.data
  },
  [UP_SHOP] (state, res) {
    // state.signup_states = list
    state.upShopState = res.data
  },
  [SELECT_SHOP] (state, res) {
    // state.signup_states = list
    state.shopInfo = res.data
  }
}

export default mutations
