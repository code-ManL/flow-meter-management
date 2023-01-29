import { reqQuotationList, reqCalculationList, reqCreateInfo } from '@/api'

const state = {
  baojiaList: [],
  jisuanshuList: [],
  userList: []
};

// 发送请求
const actions = {
  async getQuotationList({ commit }) {



    let result = await reqQuotationList();
    
    
    if (result.status == 200) {
      commit("GETQUOTATIONLIST", result.data.data);
    }
  },

  async getCalculationList({ commit }) {
    let result = await reqCalculationList();
    if (result.status == 200) {
      commit("GETCALCULATIONLIST", result.data.data);
    }
  },

  async createUserInfo({ commit }, params) {
    let result = await reqCreateInfo(params)
    if (result.status == 200) {
      commit('UPDATEUSERLSIT', result.data.data, params.rootName)
    }
  },

}

const mutations = {

  GETQUOTATIONLIST(state, baojiaList) {
    state.baojiaList = baojiaList
    // 设置默认数据
    state.userList = baojiaList
  },

  GETCALCULATIONLIST(state, jisuanshuList) {
    state.jisuanshuList = jisuanshuList
  },

  CHANGELIST(state, key) {
    switch (Number(key)) {
      case 2:
        state.userList = state.baojiaList;
        break;
      case 3:
        state.userList = state.jisuanshuList;
        break;
    }
  },

  UPDATEUSERLSIT(state, userList, rootName) {
    state.userList = userList
    if (rootName == '报价员') {
      state.baojiaList = userList
    }
    else {
      state.jisuanshuList = userList;
    }
  }

};

const getters = {};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
