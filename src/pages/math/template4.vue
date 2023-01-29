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
      <tr v-for="(val, key, i) in row" :key="i">
        <td colspan="2">{{ key }}</td>
        <td colspan="2">{{ val }}</td>
      </tr>
      <!-- 输入信息 -->
      <th colspan="4">
        <span class="c">工艺条件</span> <span class="e">Process Condition</span>
      </th>
      <tr v-for="(item, index) in count" :key="index.id">
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
      <tr v-for="(item, index) in result" :key="index.id">
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
    <div class="button">
      <el-button type="primary" @click="returnn">返回</el-button>
      <el-button type="primary" @click="save">导出pdf</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      foundation: {},
      countobject: {},
      row: {},
      resultobject: {},
      model: "",
      tagvalue: "",
      pricenum: {},
      //订单的编号位号和版本号
      flag: "",
      returnflag: true,
    };
  },
  methods: {
    returnn() {
      var data = {
        serial_number: this.pricenum.serialNumber,
        version: this.pricenum.version,
      };
      this.$store.dispatch("math/covered", data); //判断是否被覆盖
      if (this.iscovered == true) {
        this.$message({
          message: "有最新版本需要完成，请完成最新版本",
          center: true,
        });
        setTimeout(() => {
          this.$router.push({
            path: "unfinished",
          });
        }, 3000);
      } //如果被覆盖了则返回待处理
      else {
        if (this.returnflag == true) {
          setTimeout(() => {
            this.$bus.$emit("result11", this.foundation);
            this.$bus.$emit("result22", this.countobject);
            this.$bus.$emit("result33", this.row);
            this.$bus.$emit("result44", this.model);
            this.$bus.$emit("returnpricenum", this.pricenum);
          }, 1000);
          this.$router.push({
            path: "mathCount",
          });
        } //返回修改时传递填写好的基础信息，长字段信息，输入信息
        else if (this.flag == true) {
          this.$router.push({
            path: "unfinished",
          });
        } //返回到待处理首页当所有位号都执行完毕后
        else {
          setTimeout(() => {
            this.$bus.$emit("returnpricenum", this.pricenum);
          }, 1000);
          this.returnflag = true;
          this.$router.push({
            path: "mathCount",
          });
        } //返回执行下一个订单不返回信息
      } //如果没有被覆盖则判断是返回修改还是返回执行下一个位号
    },
    async save() {
      var data = {
        serial_number: this.pricenum.serialNumber,
        version: this.pricenum.version,
        order_number: this.pricenum.ordernumber,
      };
      await this.$store.dispatch("math/covered", data); //判断是否被覆盖

      if (this.iscovered == true) {
        this.$message({
          message: "有最新版本需要完成，请完成最新版本",
          center: true,
        });
        setTimeout(() => {
          this.$router.push({
            path: "unfinished",
          });
        }, 3000);
      } else {
        this.returnflag = false; //表示已经保存了
        for (var i = 0; i < this.unfinishtag.length; i++) {
          if (this.unfinishtag[i] == this.pricenum.tagnum) {
            this.unfinishtag.splice(i, 1);
          }
        } //将完成的位号进行删除
        if (this.unfinishtag.length) {
          this.flag = false;
        } else {
          this.flag = true;
        } //判断订单中的所有位号是否全部完成
        const arr = {
          foundation: this.foundation,
          // 计算信息
          countobject: Object.entries(this.countobject),
          // 独占一行的信息
          row: this.row,
          // 计算结果信息
          resultobject: Object.entries(this.resultobject),
          //模板信息
          model: this.model,
          //报价订单号
          pricenum: this.pricenum,
          flag: this.flag,
          order_number: this.ordernumber,
        }; //传递基础/长字段/结果/输入/订单编号位号版本号信息/模板
        await this.$store.dispatch("math/mathbookinfor", arr);
        this.$message({
          message: this.savesucess,
          center: true,
        });
        console.log(789);
        //点击保存成功确定后返回计算表页面
      }
    },
  },
  computed: {
    ...mapState("math", ["priceinform"]), //获取计算书信息
    ...mapState("math", ["finishcount"]), //获取计算书信息
    ...mapState("math", ["unfinishtag"]), //获取订单位号数组
    ...mapState("math", ["savesucess"]), //获取保存成功
    ...mapState("math", ["ordernumber"]), //获取是否被覆盖

    foundate() {
      let arr2 = Object.entries(this.foundation);
      for (let i = 0; i < arr2.length - 1; i += 2) {
        arr2[i].push(arr2[i + 1][0], arr2[i + 1][1]);
      }
      return arr2.filter((b, index) => {
        return index % 2 == 0;
      });
    },
    count() {
      let arr = Object.entries(this.countobject);
      for (let i = 0; i < arr.length - 1; i += 2) {
        arr[i].push(arr[i + 1][0], arr[i + 1][1]);
      }
      return arr.filter((b, index) => {
        return index % 2 == 0;
      });
    },
    result() {
      let arr3 = Object.entries(this.resultobject);
      for (let i = 0; i < arr3.length - 1; i += 2) {
        arr3[i].push(arr3[i + 1][0], arr3[i + 1][1]);
      }
      return arr3.filter((b, index) => {
        return index % 2 == 0;
      });
    },
  },
  mounted() {
    this.$bus.$on("result1", (result) => {
      this.foundation = result;
      for (var index in this.priceinform) {
        this.foundation[index] = this.priceinform[index];
      } //将报价信息加入基础信息之中
    });
    this.$bus.$on("result2", (result) => {
      this.countobject = result;
    });
    this.$bus.$on("result3", (result) => {
      this.row = result;
    });
    this.$bus.$on("result4", (result) => {
      this.resultobject = result;
    });
    this.$bus.$on("result5", (result) => {
      this.model = result;
    });
    this.$bus.$on("pricenum", (result) => {
      this.pricenum = result;
    }); //获取计算表传过来的订单信息（位号/编号/版本号）
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
.name {
  display: inline-block;
  vertical-align: top;
  margin-top: 40px;
  font-size: 15px;
  margin-left: 20px;
  margin-right: 20px;
}
.title {
  display: inline-block;
  vertical-align: top;
  margin-top: 30px;
  font-size: 25px;
  margin-left: 50px;
}
.logo {
  border-right: 1px solid black;
  padding-right: 10px;
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
ul li {
  display: inline-block;
}
td {
  border: 1px solid black;
  font-size: 15px;
  width: 20%;
  padding-left: 5px;
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
