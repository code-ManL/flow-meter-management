import Vue from "vue";

import App from "./App.vue";

import router from "@/router";

import ElemnetUI from "element-ui";

import "element-ui/lib/theme-chalk/index.css";

// import animated from "animate.css";

import store from '@/store'

import exportSheetExcel from '@/utools/exportExcel.js'

Vue.prototype.$excelExport = exportSheetExcel;

Vue.config.productionTip = false;

Vue.use(ElemnetUI);

// Vue.use(animated);

const app = new Vue({
  render: (h) => h(App),
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this
  },
});

app.$mount("#app");
