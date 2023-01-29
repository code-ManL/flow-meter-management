<template>
  <div>
    <div class="header-container" v-if="!show">
      <div class="title">
        <img src="../../assets/logo.jpg" alt="" width="100px" height="100px" />
        <span class="name">川仪流量仪表</span>
      </div>
      <div class="menu-container">
        <el-menu mode="horizontal" @select="handleSelect">
          <el-menu-item index="1"> 待处理 </el-menu-item>
          <el-menu-item index="2"> 已完成 </el-menu-item>
          <el-menu-item index="3">退出登录</el-menu-item>
        </el-menu>
      </div>
    </div>
    <!-- 查看订单位号选择 -->
    <div v-else class="selecttag">
      <span> 位号</span>
      <select v-model="tagvalue" class="selectnum">
        <option
          :value="item"
          v-for="(item, index) in finishtag"
          :key="index.id"
        >
          {{ item }}
        </option>
      </select>

      <el-button type="primary" @click="returnn">返回</el-button>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "mytop",
  data() {
    return {
      tagvalue: "1", //位号
      show: false,
      version: "", //版本号
      number: "", //订单号
    };
  },
  computed: {
    ...mapState("math", ["finishtag"]), //获取订单位号
    ...mapState("math", ["model"]), //获取模板信息
    ...mapState("math", ["numbering"]), //获取模板信息
  },
  mounted() {
    this.$bus.$on("show", (result) => {
      this.show = result;
    });
    this.$bus.$on("orderNumber", (result) => {
      console.log("订单号", result);
      this.number = result;
    }); //已完成页面传过来的编号
    this.$bus.$on("calVersion", (result) => {
      this.version = result;
    }); //已完成页面传过来的版本号
  }, //挂载下拉框
  methods: {
    ...mapActions("login", ["loginOut"]),
    handleSelect(key) {
      switch (Number(key)) {
        case 1:
          this.$router.push({
            path: "/math/unfinished",
          });
          break;
        case 2:
          this.$router.push({
            path: "/math/finished",
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
    returnn() {
      this.show = false; //将下拉框隐藏
      this.tagvalue = "";
      this.$router.push({
        path: "finished",
      });
    }, //返回完成页面
  },
  watch: {
    tagvalue: function () {
      var data = {
        quo_order_number: this.number,
        quoBitNumber: this.tagvalue,
        calVersion: this.version,
      };
      if (this.tagvalue != "") {
        console.log(data);
        this.$store.dispatch("math/finishcountinfor", data);
        if (this.model == "模板1") {
          this.$router.push({
            path: "template11",
          });
        }
        if (this.model == "模板2") {
          this.$router.push({
            path: "template22",
          });
        }
        if (this.model == "模板3") {
          this.$router.push({
            path: "template33",
          });
        }
        if (this.model == "模板4") {
          this.$router.push({
            path: "template44",
          });
        }
      }
    },
  },
};
</script>

<style scoped lang="less">
.header-container {
  height: 80px;
  display: flex;
  justify-content: space-between;
  .title {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-family: "Times New Roman", Times, serif;
    span {
      margin-left: 50px;
      font-size: 40px;
    }
  }
  .el-menu-item {
    margin-top: 10px;
  }
}
select {
  width: 150px;
  height: 40px;
  outline: none;
  line-height: 40px;
  padding-left: 10px;
  margin-right: 20px;
}
.selecttag {
  font-size: 15px;
  letter-spacing: 20px;
  font-weight: 400;
  margin-left: 20px;
  margin-bottom: 20px;
  margin-top: 20px;
}
</style>
