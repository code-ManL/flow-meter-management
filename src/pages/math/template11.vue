<template>
  <div>
    <div class="header">
      <img src="@/assets/logo.jpg" alt="" height="150px" width="150px" />
      <div class="name">
        <div class="chinese">川仪流量仪表</div>
        <div>SIC FLOW METER</div>
      </div>
      <div class="adress">
        <div>重庆川仪自动化股份有限公司流量仪表分公司</div>
        <div>重庆市北部新区黄山大道中段61号</div>
        <div>Tel：023-68230961 Fax：023-67032636</div>
      </div>
    </div>
    <div class="title1">节流装置计算书</div>
    <div class="title2">Design and Cacluation sheet for Throttling device</div>
    <div>
      <table>
        <!-- 
        基础信息1  -->
        <tr v-for="(item, index) in List1" :key="index.id">
          <td>{{ item[0] }}:{{ item[1] }}</td>
          <td v-if="item.length != 2">{{ item[2] }}:{{ item[3] }}</td>
        </tr>
        <!-- 单独占一行的 -->
        <tr v-for="(item, index) in List4" :key="index.id">
          <td colspan="2">{{ item[0] }}:{{ item[1] }}</td>
        </tr>
        <!-- 工艺条件 -->
        <th colspan="2">
          <span class="c">工艺条件</span>
          <span class="e">Process Condition</span>
        </th>
        <tr v-for="(item, index) in List2" :key="index.id">
          <td>{{ item[0] }}:{{ item[1] }}</td>
          <td v-if="item.length != 2">{{ item[2] }}:{{ item[3] }}</td>
          <td v-if="item.length == 2"></td>
        </tr>
        <!-- 计算结果 -->
        <th colspan="2">
          <span class="c">计算结果</span> <span class="e">Result</span>
        </th>
        <tr v-for="(item, index) in List3" :key="index.id">
          <td>{{ item[0] }}:{{ item[1] }}</td>
          <td v-if="item.length != 2">{{ item[2] }}:{{ item[3] }}</td>
          <td v-if="item.length == 2"></td>
        </tr>
        <tr>
          <td>计算公式 Calculation formula</td>
          <td></td>
        </tr>
        <tr>
          <td>备注 Remarks</td>
          <td></td>
        </tr>
      </table>
      <div class="other">
        <div class="infor">
          <div>计算者:</div>
          <div>检验者:</div>
        </div>
        <div class="date">
          <div>日期:</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState("math", ["found"]), //获取基础信息
    ...mapState("math", ["count"]), //获取输入信息
    ...mapState("math", ["roww"]), //获取长字段信息
    ...mapState("math", ["result"]), //获取结果信息
    List1() {
      let arr2 = Object.entries(this.found);
      // console.log("list1 fundation", arr2);
      for (let i = 0; i < arr2.length - 1; i += 2) {
        arr2[i].push(arr2[i + 1][0], arr2[i + 1][1]);
      }
      return arr2.filter((b, index) => {
        return index % 2 == 0;
      });
    },
    List2() {
      let arr = Object.entries(this.count);
      // console.log("list2 countobject", arr);
      for (let i = 0; i < arr.length - 1; i += 2) {
        arr[i].push(arr[i + 1][0], arr[i + 1][1]);
      }
      return arr.filter((b, index) => {
        return index % 2 == 0;
      });
    },
    List3() {
      let arr = Object.entries(this.result);
      // console.log("list3 resultobject", arr);
      for (let i = 0; i < arr.length - 1; i += 2) {
        arr[i].push(arr[i + 1][0], arr[i + 1][1]);
      }
      return arr.filter((b, index) => {
        return index % 2 == 0;
      });
    },
    List4() {
      return Object.entries(this.roww);
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: center;
}
.name {
  display: inline-block;
  font-size: 30px;
  letter-spacing: 5px;
  margin-left: 40px;
  margin-top: 30px;
}
.chinese {
  margin-left: 50px;
  margin-top: 10px;
}
.adress {
  display: inline-block;
  font-size: 10px;
  margin-left: 100px;
  letter-spacing: 2px;
  margin-top: 50px;
}
.title1 {
  font-size: 25px;
  letter-spacing: 60px;
  display: flex;
  justify-content: center;
  font-weight: 600;
}
.title2 {
  font-size: 20px;
  display: flex;
  justify-content: center;
  font-weight: 400;
  margin-bottom: 5px;
  margin-left: -50px;
  word-spacing: 10px;
}
table {
  border: 1px solid;
  width: 65%;
  margin: auto;
  margin-top: 10px;
}
tr {
  font-size: 15px;
  height: 30px;
}
td {
  border: 1px solid;
  padding-left: 10px;
  letter-spacing: 2px;
}
th {
  text-align: center;
  font-size: 20px;
}
.c {
  letter-spacing: 20px;
}
.e {
  word-spacing: 10px;
}
.date,
.infor {
  display: inline-block;
  font-size: 10px;
  margin-top: 10px;
  letter-spacing: 2px;
  margin-left: 18%;
}
.date div,
.infor div {
  margin-bottom: 2px;
}
.date {
  margin-left: 40%;
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
