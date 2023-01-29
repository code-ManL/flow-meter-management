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
      // 基础信息
      foundation: {},
      // 计算信息
      countobject: {},
      // 独占一行的信息
      row: {},
      // 计算结果信息
      resultobject: {},
      model: "",
      tagvalue: "",
      pricenum: {},
      //订单的编号位号和版本号
      flag: "", //判断订单是否全部完成
      returnflag: true,
    };
  },
  computed: {
    ...mapState("math", ["priceinform"]), //获取的报价中的信息比如订货单位
    ...mapState("math", ["unfinishtag"]), //获取订单位号数组
    ...mapState("math", ["savesucess"]), //获取保存成功
    ...mapState("math", ["iscovered"]), //获取是否被覆盖
    ...mapState("math", ["ordernumber"]), //获取是否被覆盖
    List1() {
      let arr2 = Object.entries(this.foundation);
      // console.log("list1 fundation", arr2);
      for (let i = 0; i < arr2.length - 1; i += 2) {
        arr2[i].push(arr2[i + 1][0], arr2[i + 1][1]);
      }
      return arr2.filter((b, index) => {
        return index % 2 == 0;
      });
    },
    List2() {
      let arr = Object.entries(this.countobject);
      // console.log("list2 countobject", arr);
      for (let i = 0; i < arr.length - 1; i += 2) {
        arr[i].push(arr[i + 1][0], arr[i + 1][1]);
      }
      return arr.filter((b, index) => {
        return index % 2 == 0;
      });
    },
    List3() {
      let arr = Object.entries(this.resultobject);
      // console.log("list3 resultobject", arr);
      for (let i = 0; i < arr.length - 1; i += 2) {
        arr[i].push(arr[i + 1][0], arr[i + 1][1]);
      }
      return arr.filter((b, index) => {
        return index % 2 == 0;
      });
    },
    List4() {
      return Object.entries(this.row);
    }, //对信息进行分割整理
  },
  methods: {
    returnn() {
      var data = {
        serial_number: this.pricenum.serialNumber,
        version: this.pricenum.version,
        order_number: this.pricenum.ordernumber,
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
          var data = {
            tagnum: this.unfinishtag[0],
            orderNumber: this.ordernumber,
            version: this.orderversion,
          };
          this.$store.dispatch("math/countinfor", data);
          console.log(222);
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
        }; //传递基础/长字段/结果/输入/订单编号位号版本号信息/模板/订单号
        await this.$store.dispatch("math/mathbookinfor", arr);
        this.$message({
          message: this.savesucess,
          center: true,
        });
        //点击保存成功确定后返回计算表页面
      }
    },
  },
  mounted() {
    this.$bus.$on("result1", (foundationobject) => {
      this.foundation = foundationobject; //获取计算表传过来的基础信息
      for (var index in this.priceinform) {
        this.foundation[index] = this.priceinform[index];
      } //将报价信息加入基础信息之中
    });
    this.$bus.$on("result2", (countobject) => {
      this.countobject = countobject;
    }); //获取计算表传过来的输入信息
    this.$bus.$on("result3", (result) => {
      this.row = result;
    }); //获取计算表传过来的长字段信息
    this.$bus.$on("result4", (result) => {
      this.resultobject = result;
    }); //获取计算表传过来的结果信息
    this.$bus.$on("result5", (result) => {
      this.model = result;
    }); //获取计算表传过来的模板信息
    this.$bus.$on("pricenum", (result) => {
      this.pricenum = result;
    }); //获取计算表传过来的订单信息（位号/编号/版本号）
  }, //显示从计算页面传过来的信息：输入/输出/基础/长字段信息
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
