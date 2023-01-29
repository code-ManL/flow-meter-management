import { reqUserInfo } from '@/api'
import { setToken, getToken, removeToken } from "@/utools/token";

const state = {
  token: getToken(),
  userInfo: ''
};

const actions = {
  async pushUserInfo({ commit }, params) {

    let result = await reqUserInfo(params);

    if (result.status == 200) {
      commit("PUSHUSERINFO", result.data);
      //持久化存储token
      setToken(result.data.msg);
      return "ok";
    } else {
      return Promise.reject(new Error("账号或密码错误"));
    }
  },
  loginOut() {
    removeToken()
  }
};

const mutations = {
  PUSHUSERINFO(state, data) {
    state.token = data.msg;
    state.userInfo = data.data
  },

};

const getters = {};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
