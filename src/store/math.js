import { getunfinishtagnum } from '@/api/index'
import { getfinishtagnum } from '@/api/index'
import { getunfinish } from '@/api/index'
import { getfinish } from '@/api/index'
import { getcountinform } from '@/api/index'
import { getsave } from '@/api/index'
import { getfinishcount } from '@/api/index'
import { getcovered } from '@/api/index'
import store from '@/store'
const state = {
  unfinishtag: [],//未完成的位号 ok
  finishtag: [], //完成的位号 ok
  unfinishnum: [],//未完成的订单编号 ok
  finishnum: [], //完成的订单编号 ok
  count: {},//计算的输入信息 ok
  resultinform: {},//计算的结果字段 ok
  priceinform: {},//计算书的节流装置名字订货单位等 ok
  savesucess: '',//计算书保存成功 ok
  found: {},//查看计算书的基础信息 ok
  roww: {},//查看计算书的长字段信息ok
  model: '',//查看计算书的模板信息ok
  result: {},//查看计算书的结果信息ok
  ordernumber: '',//保存订单号
  numbering: '',//保存编号
  orderversion: '',//保存版本号
  iscovered: ''

};

const actions = {

  async covered({ commit }, params) {
    let token = store.state.login.token;
    let result = await getcovered(token, params);
    if (result.status == 200) {
      commit("MCOVERED", result.data.flag);
    }
  },//获取订单位号

  async unfinish({ commit }) {
    let token = store.state.login.token;
    let result = await getunfinish(token)

    if (result.status == 200) {
      commit("MUNFINISHNUM", result.data.data);
    }
  },//获取未完成的订单编号
  async finish({ commit }) {
    let token = store.state.login.token;
    let result = await getfinish(token);

    if (result.status == 200) {
      commit("MFINISHNUM", result.data.data);
    }
  },//获取完成的订单编号
  async unfinishtagnum({ commit }, params) {
    // console.log('未完成位号传递给后台的数据', params)
    let result = await getunfinishtagnum(params);
    if (result.status == 200) {
      commit("MUNFINISH", result.data.data);
    }
  },//获取订单位号
  async finishtagnum({ commit }, params) {
    // console.log('已完成位号传递给后台的数据', params)
    let result = await getfinishtagnum(params);

    if (result.status == 200) {
      commit("MFINISH", result.data.data);
    }
  },//获取完成的订单位号
  async countinfor({ commit }, params) {
    // console.log('获取计算书参数传递给后台的数据', params)
    let result = await getcountinform(params);

    if (result.status == 200) {//ok
      commit("MCOUNT", result.data.data);
    }
  },//获取计算书计算参数
  async mathbookinfor({ commit }, params) {
    // console.log('保存计算书传递给后台的数据', params)
    let token = store.state.login.token;
    let result = await getsave(token, params);
    if (result.status == 200) {
      commit("MMATHBOOK", result.data.data);
    }
  },//传递计算参数进行保存
  async finishcountinfor({ commit }, params) {
    // console.log('获取完成的计算书信息传递给后台的数据', params)
    let result = await getfinishcount(params);
    if (result.status == 200) {
      commit("MFINISHCOUNT", result.data.data);
    }
  },//获取完成的计算书信息
  ordernumber({ commit }, params) {
    commit("MORDERNUMBER", params);
  },
  orderversion({ commit }, params) {
    commit("MORDERVERSION", params);
  },
  numbering({ commit }, params) {
    commit("MNUMBERING", params);
  },

}

const mutations = {
  MUNFINISHNUM(state, data) {
    state.unfinishnum = data;
    // console.log('完成订单包含订单编号位号', data)
  },//获取未完成时订单编号
  MFINISHNUM(state, data) {
    state.finishnum = data;
    // console.log('完成订单包含订单编号位号', data)
  },//获取完成的订单编号
  MUNFINISH(state, data) {
    state.unfinishtag = data;
    // console.log('未完成位号', data)
  },//获取未完成时订单位号
  MFINISH(state, data) {
    state.finishtag = data;
    // console.log('完成位号', data)
  },//获取完成的订单位号
  MCOUNT(state, data) {
    state.count = data.input;
    state.resultinform = data.output;
    state.priceinform = data.map;
    // console.log('计算书参数信息', data)
  },//获取计算书计算参数
  MMATHBOOK(state, data) {
    state.savesucess = data;
    // console.log('保存数据得到保存成功消息', data)
  },//保存数据得到保存成功消息
  MFINISHCOUNT(state, data) {
    // console.log('获取完成的计算书所有信息', data)
    state.found = data.shortInit
    state.result = data.output
    state.count = data.input
    state.model = data.model
    state.roww = data.longInit
  },//获取完成的计算书所有信息
  MORDERNUMBER(state, data) {
    state.ordernumber = data;
  },//获取订单号
  MORDERVERSION(state, data) {
    state.orderversion = data;
  },//获取版本号
  MCOVERED(state, data) {
    console.log('覆盖', data)
    state.iscovered = data;
  },//获取是否覆盖
  MNUMBERING(state, data) {
    state.numbering = data;
  }//获取编号
};
const getters = {};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
