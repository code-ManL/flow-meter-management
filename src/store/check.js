import { reqVersion ,reqVersionDetail} from "@/api"
import store from '@/store'

const state = {
    orderList: [],
    detail:[]
}

const actions = {
    async getVersionList({commit}) {
        let token = store.state.login.token;
        let result = await reqVersion(token);
        if (result.status == 200) {
            commit('ORDERVERSION', result.data.data)
        }
    },

    async getVersionDetail({ commit },data) {
        let token = store.state.login.token;
        let result = await reqVersionDetail(data,token);
        if (result.status == 200) {
            commit('VERSIONDETAIL', result.data.data)
        }
    }

}


const mutations = {
    ORDERVERSION(state, data) {
        state.orderList = data
        console.log(data);
    },
    VERSIONDETAIL(state,data) { 
        state.detail = data.templates
        console.log(data.templates);
    },
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}