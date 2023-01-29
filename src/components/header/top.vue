<template>
  <div class="header-container">
    <div class="title">
      <img src="../../assets/logo.jpg" alt="" width="100px" height="100px" />
      <span class="name">川仪流量仪表</span>
    </div>
    <div class="menu-container">
      <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#c0bfbd"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1">报价中心</el-menu-item>
        <el-menu-item index="2">版本查询</el-menu-item>
        <el-menu-item index="3">退出登录 </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "mytop",
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
    };
  },
  methods: {
    ...mapActions("login", ["loginOut"]),
    handleSelect(key) {
      switch (Number(key)) {
        case 1:
          this.$router.push({
            path: "/baojia/init",
          });
          break;
        case 2:
          this.$router.push({
            path: "/baojia/check",
          });
          break;
        case 3:
          // 清空缓存
          this.loginOut();
          this.$router.push({
            path: "/login",
          });
          break;
      }
    },
  },
};
</script>

<style scoped lang="less">
.header-container {
  height: 60px;
  display: flex;
  justify-content: space-between;
  background: linear-gradient(to right, #fff, #dbd9d7);
  .title {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-family: "Times New Roman", Times, serif;
    span {
      margin-left: 50px;
      font-size: 20px;
    }
  }
  .menu-container {
    height: 100%;
  }
}
</style>
