import * as types from './types'

export default {
  [types.MODIFY_PRICE](state, data) {
    state.modifyPrice = data
  },
  [types.USER_RIGHTS](state, data) {
    state.userRights = data
  },
}
