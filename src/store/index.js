import Vuex from 'vuex'

import Vue from 'vue'

Vue.use(Vuex)

import baojia from './baojia.js'
import manager from './manager.js'
import login from './login.js'
import math from './math.js'
import check from './check.js'

export default new Vuex.Store({
        modules:
        {
                baojia,
                manager,
                login,
                math,
                check
        }
})