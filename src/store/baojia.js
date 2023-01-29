import { reqTitleList, reqFilterList, reqLastBit, reqInitDemo, reqCounterList, reqSerialcode } from "@/api";
import store from '@/store'

const state = {
  checkList: [],
  titleList: [],
  filterList: [],
  lastbit: 0,
  initdemo: {},
  counterList: [],
  serialcode: ''
};

const actions = {
  async getSerialcode({ commit }) {
    let result = await reqSerialcode();
    if (result.status == 200) {
      commit('SERIALCODE', result.data.data)
    }
  },
  async getCounterList({ commit }) {
    let result = await reqCounterList();
    if (result.status == 200) {
      commit('COUNTERLIST', result.data.data)
    }
  },
  async getTitleList({ commit }) {
    let result = await reqTitleList();
    if (result.status == 200) {
      commit('TITLELSIT', result.data.data)
    }
  },

  async getFilterList({ commit }, data) {
    let result = await reqFilterList(data);
    if (result.status == 200) {
      commit('FILTERLIST', result.data.data)
    }
  },

  async getLastBit({ commit }) {
    let result = await reqLastBit();
    if (result.status == 200) {
      commit('LASTBIT', result.data.data)
    }
  },

  async getInitDemo({ commit }) {
    let token = store.state.login.token;
    let result = await reqInitDemo(token);
    if (result.status == 200) {
      commit('INITDEMO', result.data.data)
    }
  }
};

const mutations = {
  SERIALCODE(state, serialcode) {
    console.log(serialcode);
    state.serialcode = serialcode
  },
  COUNTERLIST(state, counterList) {
    state.counterList = counterList
  },
  INITDEMO(state, initdemo) {
    state.initdemo = initdemo
  },
  LASTBIT(state, lastbit) {
    state.lastbit = Number(lastbit)
  },

  CHECKLIST(state, checkList) {
    state.checkList = checkList;
  },
  TITLELSIT(state, titleList) {
    state.titleList = titleList;
  },
  FILTERLIST(state, filterList) {
    state.filterList = filterList
  },
  UPDATEBIT(state, newbit) {
    state.lastbit = newbit
  },
  CLEARFILTER(state) {
    state.filterList = []
  },
  CHANGEBIANHAO(state) {
    let newNum = Number(state.initdemo.serial_code.split('-')[1]) + 1;
    let newCode = state.initdemo.serial_code.split('-')[0] + '-' + (newNum < 10 ? '0' + newNum : newNum);
    state.initdemo.serial_code = newCode;
    // 清空数据
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
