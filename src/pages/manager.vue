<template>
  <div class="manager-container">
    <div class="menue-container">
      <div class="menue-left">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          style="height: 100%"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="1">
            <span slot="title">后台人员管理系统</span>
          </el-menu-item>

          <el-menu-item index="2">
            <i class="el-icon-user"></i>
            <span slot="title">报价人员</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-s-custom"></i>
            <span slot="title">计算书人员</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="menue-right">
        <managerBody></managerBody>
      </div>
    </div>
  </div>
</template>

<script>
import managerBody from "@/components/manager/index.vue";
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  components: {
    managerBody,
  },
  data() {
    return {
      userList: [],
    };
  },
  mounted() {
    this.getQuotationList();
    this.getCalculationList();
  },
  methods: {
    ...mapActions("manager", ["getQuotationList", "getCalculationList"]),
    ...mapMutations("manager", ["CHANGELIST"]),
    onSubmit() {
      console.log(arguments);
    },
    handleSelect(key) {
      this.CHANGELIST(key);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  computed: {
    ...mapState("manager", ["baojiaList", "jisuanshuList"]),
  },
};
</script>

<style lang="less" scoped>
.manager-container {
  width: 100%;
  height: 100%;
  .menue-container {
    width: 100%;
    height: 100vh;
    display: flex;
    .menue-left {
      width: 250px;
    }
    .menue-right {
      box-sizing: border-box;
      height: 100%;
      flex: 1;
      // background-color: antiquewhite;
    }
  }
}
</style>
