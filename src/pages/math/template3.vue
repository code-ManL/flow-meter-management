<template>
  <div class="center">
    <div class="header">
      <div class="head">
        <img src="@/assets/logo.jpg" alt="" height="80px" width="80px" />
        <div class="name">
          <div class="chinese">川仪流量仪表</div>
          <div class="english">SIC FLOW METER</div>
        </div>
      </div>
      <div class="title">
        <div class="ctitle">节流装置计算书</div>
        <div class="etitle">
          Design and Cacluation sheet for Throttling device
        </div>
      </div>
    </div>
    <hr />
    <div class="biaoti">
      <span class="c">订单信息 </span> <span class="e"> Order Information</span>
    </div>
    <!-- 基本信息 -->
    <div class="banner">
      <ul class="one">
        <li v-for="(item, index) in foundation1" :key="index">
          {{ item[0] }}:{{ item[1] }}
        </li>
      </ul>
      <ul>
        <li v-for="(b, index) in foundation2" :key="index">
          {{ b[0] }}:{{ b[1] }}
        </li>
      </ul>
    </div>

    <div class="row">
      <div v-for="(val, key, i) in row" :key="i">{{ key }}:{{ val }}</div>
    </div>
    <div class="biaoti">
      <span class="c">计算公式</span>
      <span class="e"> Calculation formula</span>
    </div>
    <div class="computer"></div>
    <!-- 输入信息 -->
    <div class="biaoti">
      <span class="c">应用数据</span> <span class="e"> Process Conditions</span>
    </div>
    <div class="banner">
      <ul class="one">
        <li v-for="(b, index) in countobject1" :key="index">
          {{ b[0] }}:{{ b[1] }}
        </li>
      </ul>
      <ul>
        <li v-for="(b, index) in countobject2" :key="index">
          {{ b[0] }}:{{ b[1] }}
        </li>
      </ul>
    </div>
    <!-- 结果信息 -->
    <div class="biaoti">
      <span class="c">计算结果</span> <span class="e"> Result</span>
    </div>
    <div class="banner">
      <ul class="one">
        <li v-for="(b, index) in resultobject1" :key="index">
          {{ b[0] }}:{{ b[1] }}
        </li>
      </ul>
      <ul>
        <li v-for="(b, index) in resultobject2" :key="index">
          {{ b[0] }}:{{ b[1] }}
        </li>
      </ul>
    </div>
    <div class="biaoti">
      <span class="c">备注</span>
      <span class="e"> Remarks</span>
    </div>
    <div class="computer"></div>
    <div class="other">
      <div class="infor">
        <div>计算者:</div>
        <div>检验者:</div>
        <div>日期:</div>
      </div>
      <div class="adress">
        <div>重庆川仪自动化股份有限公司流量仪表分公司</div>
        <div>重庆市北部新区黄山大道中段61号</div>
        <div>Tel：023-68230961 Fax：023-67032636</div>
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
      row: {},
      foundation: {},
      countobject: {},
      resultobject: {},
      model: "",
      tagvalue: "",
      pricenum: {},
      flag: "",
      returnflag: true,
    };
  },
  computed: {
    ...mapState("math", ["priceinform"]), //获取计算书信息
    ...mapState("math", ["finishcount"]), //获取计算书完成信息
    ...mapState("math", ["unfinishtag"]), //获取订单位号数组
    ...mapState("math", ["savesucess"]), //获取保存成功
    ...mapState("math", ["ordernumber"]), //获取是否被覆盖
    foundation1() {
      return Object.entries(this.foundation).filter((b, index) => {
        return index % 2 == 0;
      });
    },
    foundation2() {
      return Object.entries(this.foundation).filter((b, index) => {
        return index % 2 != 0;
      });
    },

    countobject1() {
      return Object.entries(this.countobject).filter((b, index) => {
        return index % 2 == 0;
      });
    },

    countobject2() {
      return Object.entries(this.countobject).filter((b, index) => {
        return index % 2 != 0;
      });
    },
    resultobject1() {
      return Object.entries(this.resultobject).filter((b, index) => {
        return index % 2 == 0;
      });
    },

    resultobject2() {
      return Object.entries(this.resultobject).filter((b, index) => {
        return index % 2 != 0;
      });
    },
  },
  mounted() {
    this.$bus.$on("result1", (result) => {
      console.log(result);
      this.foundation = result;
      for (var index in this.priceinform) {
        this.foundation[index] = this.priceinform[index];
      } //将报价信息加入基础信息之中
    });
    this.$bus.$on("result2", (result) => {
      console.log(result);
      this.countobject = result;
    });
    this.$bus.$on("result3", (result) => {
      console.log(result);
      this.row = result;
    });
    this.$bus.$on("result4", (result) => {
      console.log(result);
      this.resultobject = result;
    });
    this.$bus.$on("result5", (result) => {
      console.log(result);
      this.model = result;
    });
    this.$bus.$on("pricenum", (result) => {
      this.pricenum = result;
    }); //获取计算表传过来的订单信息（位号/编号/版本号）
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
};
</script>

<style scoped>
.center {
  width: 65%;
  margin: auto;
  margin-top: 10px;
}

.header {
  display: flex;
  flex-direction: row;
}

.head {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.name {
  font-size: 20px;
  letter-spacing: 5px;
  font-weight: 500;
  margin-left: 20px;
}

.chinese {
  margin-left: 40px;
}

.title {
  margin-top: 20px;
  margin-left: 100px;
  font-weight: 600;
}
.ctitle {
  font-size: 25px;
  letter-spacing: 10px;
  margin-left: 100px;
}
.etitle {
  word-spacing: 10px;
  font-size: 15px;
}

hr {
  height: 1px;
  background-color: black;
}

/*开头数据*/
.banner {
  display: flex;
  margin-top: 10px;
  border: 1px solid black;
}

.banner ul {
  width: 50%;
}

.banner .one {
  border-right: 1px solid black;
}

.banner ul li {
  font-size: 15px;
  margin: 10px 0;
  padding-left: 5px;
  letter-spacing: 1px;
}

/*标题 */
.biaoti {
  font-size: 20px;
  margin-top: 10px;
  font-weight: 600;
}
.c {
  letter-spacing: 10px;
}
.e {
  word-spacing: 10px;
}
/*计算公式*/
.computer {
  border: 1px solid black;
  height: 50px;
}
.row {
  border: 1px solid black;
  border-top: none;
  font-size: 15px;
  padding-top: 5px;
  padding-left: 5px;
  letter-spacing: 2px;
}
.row div {
  margin-top: 2px;
}
/*计算结果*/
table {
  border: 1px solid black;
}

.adress,
.infor {
  display: inline-block;
  font-size: 10px;
  margin-top: 10px;
  letter-spacing: 2px;
}

.adress div,
.infor div {
  margin-bottom: 2px;
}

.adress {
  margin-left: 60%;
}

.el-button {
  margin-left: 200px;
  margin-top: 20px;
}
</style>