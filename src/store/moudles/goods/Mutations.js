import {SAVE_GOODS, SOLD_OUT, EDIT_GOODS, GET_GOODS} from '../../Mutation-types'

const mutations = {
  [SAVE_GOODS] (state, res) {
    // state.signup_states = list
    state.saveState = res.data
  },
  [EDIT_GOODS] (state, res) {
    // state.signup_states = list
    state.editGoodsFlag = res.data
  },
  [SOLD_OUT] (state, res) {
    // state.signup_states = list
    state.soldOut = res.data
  },
  [GET_GOODS] (state, res) {
    state.goods_list = res.data
  }
}

export default mutations
