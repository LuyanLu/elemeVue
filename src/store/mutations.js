export default {
  // 设置是否登录
  SET_LOGIN (state, payload) {
    state.isLogin = payload
  },
  // 设置是否在加载
  SET_LOADING (state, payload) {
    state.isLoading = payload
  },
  // 设置当前所在页面标记
  SET_WHICH_PAGE (state, payload) {
    state.whichPage = payload
  },
  // 首页加载更多
  SET_HOME_PAGE_MORE (state, payload) {
    state.falseBusinessBrief = payload
  },
  // 添加订单
  SET_ORDER (state, payload) {
    state.falseOrder.unshift(payload)
  },
  SET_FALSE_HOT_WORD (state, payload) {
    state.falseHotWord = payload
  },
  SET_FALSE_ORDER (state, payload) {
    state.falseOrder = payload
  },
  SET_FALSE_BUSINESS_BRIEF (state, payload) {
    state.falseBusinessBrief = payload
  },
  SET_BUSINESS_INFO (state, payload) {
    state.falseBusinessInfo = payload
  }
}
