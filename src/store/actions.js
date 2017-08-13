import Axios from 'axios'

export default {
  // 改变是否登录状态
  setLogin ({commit}, platform) {
    commit('SET_LOGIN', platform)
  },
  // 改变是否正在加载状态
  setLoading ({commit}, platform) {
    commit('SET_LOADING', platform)
  },
  // 改变当前页
  setWhichpage ({commit}, platform) {
    commit('SET_WHICH_PAGE', platform)
  },
  // 首页加载更多
  setHomepageMore ({commit}, platform) {
    commit('SET_HOME_PAGE_MORE', platform)
  },
  // 添加订单
  setOrder ({commit}, platform) {
    commit('SET_ORDER', platform)
  },
  fetchFalseHotWord ({commit}) {
    Axios.get('api/falseHotWord')
      .then((res) => {
        commit('SET_FALSE_HOT_WORD', res.data)
      })
  },
  fetchFalseOrder ({commit}) {
    Axios.get('api/falseOrder')
      .then((res) => {
        commit('SET_FALSE_ORDER', res.data)
      })
  },
  fetchFalseBusinessBrief ({commit}) {
    Axios.get('api/falseBusinessBrief')
      .then((res) => {
        commit('SET_FALSE_BUSINESS_BRIEF', res.data)
      })
  },
  fetchFalseBusinessInfo ({commit}) {
    Axios.get('api/falseBusinessInfo')
      .then((res) => {
        commit('SET_BUSINESS_INFO', res.data)
      })
  }
}
