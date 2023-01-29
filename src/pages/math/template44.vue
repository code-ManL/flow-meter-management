<template>
  <div>
    <ul class="header">
      <li class="logo">
        <img src="@/assets/logo.jpg" alt="" height="100px" width="100px" />
        <div class="name">
          <div class="firmname">川仪流量仪表</div>
          <div class="english">SIC FLOW METER</div>
        </div>
      </li>
      <li class="title">
        <div class="bookname">节流装置设计计算书</div>
        <div>Design and Cacluation sheet for Throttling device</div>
      </li>
    </ul>
    <table>
      <!-- 基本信息 -->
      <th colspan="4">
        <span class="c">订单信息</span> <span class="e">Order Information</span>
      </th>
      <tr v-for="(item, index) in foundate" :key="index.id">
        <td>{{ item[0] }}</td>
        <td v-if="item.length != 2">{{ item[2] }}</td>
        <td v-if="item.length == 2"></td>
        <td>{{ item[1] }}</td>
        <td>{{ item[3] }}</td>
      </tr>
      <!-- 单占一行的信息 -->
      <tr v-for="(val, key, i) in roww" :key="i">
        <td colspan="2">{{ key }}</td>
        <td colspan="2">{{ val }}</td>
      </tr>
      <!-- 输入信息 -->
      <th colspan="4">
        <span class="c">工艺条件</span> <span class="e">Process Condition</span>
      </th>
      <tr v-for="(item, index) in countt" :key="index.id">
        <td>{{ item[0] }}</td>
        <td v-if="item.length != 2">{{ item[2] }}</td>
        <td v-if="item.length == 2"></td>
        <td>{{ item[1] }}</td>
        <td>{{ item[3] }}</td>
      </tr>
      <!-- 计算结果 -->
      <th colspan="4">
        <span class="c">计算结果</span> <span class="e">Result</span>
      </th>
      <tr v-for="(item, index) in resultt" :key="index.id">
        <td>{{ item[0] }}</td>
        <td v-if="item.length != 2">{{ item[2] }}</td>
        <td v-if="item.length == 2"></td>
        <td>{{ item[1] }}</td>
        <td>{{ item[3] }}</td>
      </tr>
      <tr>
        <td colspan="2">计算公式 Calculation formula</td>
        <td colspan="2"></td>
      </tr>
      <tr>
        <td colspan="2">备注 Remarks</td>
        <td colspan="2"></td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("math", ["found"]), //获取基础信息
    ...mapState("math", ["count"]), //获取输入信息
    ...mapState("math", ["roww"]), //获取长字段信息
    ...mapState("math", ["result"]), //获取结果信息
    foundate() {
      let arr2 = Object.entries(this.found);
      for (let i = 0; i < arr2.length - 1; i += 2) {
        arr2[i].push(arr2[i + 1][0], arr2[i + 1][1]);
      }
      return arr2.filter((b, index) => {
        return index % 2 == 0;
      });
    },
    countt() {
      let arr = Object.entries(this.count);
      for (let i = 0; i < arr.length - 1; i += 2) {
        arr[i].push(arr[i + 1][0], arr[i + 1][1]);
      }
      return arr.filter((b, index) => {
        return index % 2 == 0;
      });
    },
    resultt() {
      let arr3 = Object.entries(this.result);
      for (let i = 0; i < arr3.length - 1; i += 2) {
        arr3[i].push(arr3[i + 1][0], arr3[i + 1][1]);
      }
      return arr3.filter((b, index) => {
        return index % 2 == 0;
      });
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: center;
}
table,
.header {
  border: 1px solid black;
  width: 70%;
  margin-left: 15%;
  border-bottom: none;
}
.name,
.title {
  display: inline-block;
  vertical-align: top;
  margin-top: 40px;
  font-size: 15px;
  margin-left: 20px;
  margin-right: 20px;
}
.logo {
  border-right: 1px solid black;
  padding-right: 10px;
  margin-left: -100px;
}
.infor {
  border-left: 1px solid black;
  padding-left: 20px;
  padding-top: 20px;
}
.name div,
.title div {
  margin-bottom: 5px;
}
.firmname {
  margin-left: 20px;
}
.bookname {
  margin-left: 100px;
}
.infor div {
  margin-bottom: 10px;
}
ul li {
  display: inline-block;
}
td {
  border: 1px solid black;
  font-size: 15px;
  width: 20%;
  padding-left: 20px;
  letter-spacing: 2px;
}
th {
  border: 1px solid black;
  padding-top: 10px;
  font-size: 20px;
}
.c {
  letter-spacing: 20px;
}
.e {
  word-spacing: 10px;
}
.button {
  width: 65%;
  margin: 0 auto;
  margin-top: 10px;
}
.el-button {
  margin-left: 220px;
}
</style
>
