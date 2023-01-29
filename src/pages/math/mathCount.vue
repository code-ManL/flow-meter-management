<template>
  <div>
    <div class="bookname">节流装置计算表</div>
    <table>
      <!-- 1模板选择 -->
      <tr>
        <td>
          位号<select name="" id="" v-model="tagvalue" @click="change">
            <option
              :value="item"
              v-for="(item, index) in unfinishtag"
              :key="index.id"
            >
              {{ item }}
            </option>
          </select>
        </td>
        <td>
          模板选择
          <select name=" " id="" v-model="model">
            <option value="模板1">模板1</option>
            <option value="模板2">模板2</option>
            <option value="模板3">模板3</option>
            <option value="模板4">模板4</option>
          </select>
        </td>
      </tr>
      <!-- 2基础信息 -->
      <tr v-for="(item1, index1) in foundationform" :key="index1.id">
        <td v-for="(item2, index2) in item1" :key="index2">
          {{ item2.title.split(" ")[0] }}
          <input
            type="text"
            v-model="foundationobject[item2.title]"
            v-if="!item2.options.length"
          />
          <!-- 表单形式 -->
          <select
            name=""
            id=""
            v-model="foundationobject[item2.title]"
            v-if="item2.options.length"
          >
            <option
              v-for="(item3, index3) in item2.options"
              :key="index3"
              :value="item3"
            >
              {{ item3 }}
            </option>
          </select>
        </td>
      </tr>
      <!-- 3单独占一行 -->
      <tr v-for="(item5, index5) in row" :key="index5.id">
        <td v-for="(item6, index6) in item5" :key="index6.id">
          {{ item6.title.split(" ")[0] }}
          <input
            type="text"
            v-model="rowobject[item6.title]"
            v-if="!item6.options.length"
          />
          <select
            name=""
            id=""
            v-model="rowobject[item6.title]"
            v-if="item6.options.length"
          >
            <option
              v-for="(item8, index8) in item6.options"
              :key="index8"
              :value="item8"
            >
              {{ item8 }}
            </option>
          </select>
        </td>
      </tr>
      <!-- 4工艺条件信息 -->
      <tr v-for="(item3, index3) in count" :key="index3.id">
        <td v-for="(item4, index4) in item3" :key="index4">
          {{ item4.title.split(" ")[0] }}
          <input
            type="text"
            v-model="countobject[item4.title]"
            v-if="!item4.options"
          />
          <select
            name=""
            id=""
            v-model="rowobject[item4.title]"
            v-if="item4.options"
          >
            <option
              v-for="(item8, index8) in item4.options"
              :key="index8"
              :value="item8"
            >
              {{ item8 }}
            </option>
          </select>
        </td>
      </tr>
    </table>
    <div class="btn">
      <el-button type="primary" @click="back">返回</el-button>
      <el-button type="primary" @click="result">计算</el-button>
      <el-button type="primary" @click="estimate">估算</el-button>
      <el-button type="danger" @click="renew">重新开始</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  components: {},
  data() {
    return {
      //输入信息
      foundationform: [
        [
          {
            title: "设计编号 Design number",
            options: [],
          },
          { title: "合同编号 Contract number", options: [] },
          { title: "安装方式 Installation mode", options: [] },
          { title: "安装位号 Installation Tag", options: [] },
        ],
        [
          {
            title: "取压方式 Pressure extraction method",
            options: [],
          },
          {
            title: "流体名称 Fluid name",
            options: [],
          },
          {
            title: "数量 quantity",
            options: [],
          },
          {
            title: "管道材质 Pipe material",
            options: [],
          },
        ],
        [
          {
            title: "气体名称 Gas name",
            options: [],
          },
          {
            title: "气体体积 Gas volume",
            options: [],
          },
          {
            title: "密度值状态 Density value status",
            options: ["工作状态", "标准状态"],
          },
          {
            title: "流量值状态 Traffic value status",
            options: ["工作状态", "标准状态"],
          },
        ],
      ], //基础信息
      row: [
        [
          {
            title:
              "节流件上游侧阻流件形式 baffle type at upsteam of throttling element",
            options: [
              "单个90°弯头，任一平面上的两个90°弯头（S>30d）",
              "单个90°弯头或三通（仅从一个支管流出）",
              "单个90°弯头",
            ],
          },

          {
            title: "供货内容 Contents of supply",
            options: [],
          },
          {
            title: "附件 annex",
            options: [],
          },
        ],
      ], //长字段信息
      foundationobject: {},
      //基础信息对象
      countobject: {},
      //输入信息对象
      rowobject: {},
      //长字段信息对象
      resultcount: {},
      //结果字段信息对象
      model: "",
      //模板信息
      tagvalue: "",
      //位号信息
      serialNumber: "",
      //订单号信息
      version: "",
      //订单版本号信息
      versionflag: false,
      ordering: "",
      //订单编号
    };
  },
  methods: {
    back() {
      this.$router.push({
        path: "unfinished",
      });
    },
    estimate() {
      // if (this.degreeflow == "" && this.maxflow != "") {
      //   this.degreeflow = this.maxflow;
      // }
      // if (this.degreeflow != "" && this.maxflow == "") {
      //   this.maxflow = this.degreeflow;
      // }
      // if (this.degreeflow != "" && this.oftenflow == "") {
      //   this.oftenflow = this.degreeflow * 0.8;
      // }
      // if (this.degreeflow != "" && this.minflow == "") {
      //   this.minflow = this.degreeflow / 3;
      // }
    }, //估算
    renew() {
      // console.log(document.getElementsByTagName("select"));
      for (var i = 0; i < document.getElementsByTagName("select").length; i++) {
        document.getElementsByTagName("select")[i].value = "";
      }
      for (var i = 0; i < document.getElementsByTagName("input").length; i++) {
        document.getElementsByTagName("input")[i].value = "";
      }
      for (var key in this.foundationobject) {
        delete this.foundationobject[key];
      }
      for (var key in this.countobject) {
        delete this.countobject[key];
      }
      for (var key in this.rowobject) {
        delete this.rowobject[key];
      }
      this.model = "";
      this.tagvalue = "";
      this.$message({
        message: "重新开始",
        center: true,
      });
    }, //重新开始删除长字段/基础信息/输入信息，清空input和select的值
    Maxpression() {
      var value = document.getElementsByClassName("maxpression")[0].value;
      if (value == 4000) {
        this.β = 0.42451;
        this.degreeloss = 3202;
        this.unsure = 0.7;
      }
      if (value == 2500) {
        this.β = 0.47412;
        this.degreeloss = 1887;
        this.unsure = 0.71;
      }
      if (value == 1600) {
        this.β = 0.52514;
        this.degreeloss = 1127;
        this.unsure = 0.72;
      }
    },
    result() {
      var datacover = {
        orderNumber: this.ordernumber,
        version: this.orderversion,
      };
      this.$store.dispatch("math/covered", datacover);
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
      for (var i = 0; i < this.resultinform.length; i++) {
        this.resultcount[this.resultinform[i]] = "";
      } //将结果字段转变为结果对象
      for (var i in this.resultcount) {
        if (i == "开孔比 Cut-out ratio") {
          this.resultcount["开孔比 Cut-out ratio"] =
            this.countobject["最大流量 Maximum flow"];
        }
        if (i == "流里系数 Flow coefficient") {
          this.resultcount["流里系数 Flow coefficient"] =
            this.countobject["最大流量 Maximum flow"];
        }
        if (i == "后直管段 Rear straight pipe segment") {
          this.resultcount["后直管段 Rear straight pipe segment"] =
            this.countobject["最大流量 Maximum flow"];
        }
        if (i == "20℃节流件开孔 20°C throttle cut-out") {
          this.resultcount["20℃节流件开孔 20°C throttle cut-out"] =
            this.countobject["最大流量 Maximum flow"];
        }
        if (i == "最大差压压损 Maximum differential pressure pressure loss") {
          this.resultcount[
            "最大差压压损 Maximum differential pressure pressure loss"
          ] = this.countobject["最大流量 Maximum flow"];
        }
        if (i == "最小差压压损 Minimum differential pressure pressure loss") {
          this.resultcount[
            "最小差压压损 Minimum differential pressure pressure loss"
          ] = this.countobject["最大流量 Maximum flow"];
        }
        if (i == "流量不确定度 Traffic uncertainty") {
          this.resultcount["流量不确定度 Traffic uncertainty"] =
            this.countobject["最大流量 Maximum flow"];
        }
        if (i == "常用差压压损 Common differential pressure pressure loss") {
          this.resultcount[
            "常用差压压损 Common differential pressure pressure loss"
          ] = this.countobject["最大流量 Maximum flow"];
        }
        if (i == "刻度差压压损 Scale differential pressure pressure loss") {
          this.resultcount[
            "刻度差压压损 Scale differential pressure pressure loss"
          ] = this.countobject["最大流量 Maximum flow"];
        }
        if (i == "管壁绝对粗糙度 Absolute roughness of the pipe wall") {
          this.resultcount[
            "管壁绝对粗糙度 Absolute roughness of the pipe wall"
          ] = this.countobject["最大流量 Maximum flow"];
        }
        if (i == "工作压力 Working pressure") {
          this.resultcount["工作压力 Working pressure"] =
            this.countobject["最大流量 Maximum flow"];
        }
        if (i == "常温管道内径 Room temperature pipe inner diameter") {
          this.resultcount[
            "常温管道内径 Room temperature pipe inner diameter"
          ] = this.countobject["最大流量 Maximum flow"];
        }
        if (
          i == "工况下管道内径 Pipe inner diameter under working conditions"
        ) {
          this.resultcount[
            "工况下管道内径 Pipe inner diameter under working conditions"
          ] = this.countobject["最大流量 Maximum flow"];
        }
        if (i == "最大雷诺数 Maximum Reynolds number") {
          this.resultcount["最大雷诺数 Maximum Reynolds number"] =
            this.countobject["最大流量 Maximum flow"];
        }
        if (i == "最小雷诺数 Minimum Reynolds number") {
          this.resultcount["最小雷诺数 Minimum Reynolds number"] =
            this.countobject["最大流量 Maximum flow"];
        }
        if (i == "常用雷诺数 Commonly used Reynolds numbers") {
          this.resultcount["常用雷诺数 Commonly used Reynolds numbers"] =
            this.countobject["最大流量 Maximum flow"];
        }
        if (i == "流出系数 outflow coefficient") {
          this.resultcount["流出系数 outflow coefficient"] =
            this.countobject["最大流量 Maximum flow"];
        }
        if (i == "可膨胀系数 Coefficient of expansion") {
          this.resultcount["可膨胀系数 Coefficient of expansion"] =
            this.countobject["最大流量 Maximum flow"];
        }
        if (i == "流量系数 Flow coefficient") {
          this.resultcount["流量系数 Flow coefficient"] =
            this.countobject["最大流量 Maximum flow"];
        }
        if (i == "前直管段 Front straight pipe segment") {
          this.resultcount["前直管段 Front straight pipe segment"] =
            this.countobject["最大流量 Maximum flow"];
        }
        if (i == "后直管段线 Rear straight line") {
          this.resultcount["后直管段线 Rear straight line"] =
            this.countobject["最大流量 Maximum flow"];
        }
        if (i == "锥体外径 Cone outer diameter") {
          this.resultcount["锥体外径 Cone outer diameter"] =
            this.countobject["最大流量 Maximum flow"];
        }
        if (i == "Δd") {
          this.resultcount.Δd = this.countobject["最大流量 Maximum flow"];
        }
        if (i == "差压上限 Upper differential pressure limit") {
          this.resultcount["Upper differential pressure limit"] =
            this.countobject["最大流量 Maximum flow"];
        }
        if (i == "最大差压 Maximum differential pressure") {
          this.resultcount["最大差压 Maximum differential pressure"] =
            this.countobject["最大流量 Maximum flow"];
        }
        if (i == "常用差压 Common differential pressure") {
          this.resultcount["常用差压 Common differential pressure"] =
            this.countobject["最大流量 Maximum flow"];
        }
        if (i == "最小差压 Minimum differential pressure") {
          this.resultcount["最小差压 Minimum differential pressure"] =
            this.countobject["最大流量 Maximum flow"];
        }
        if (i == "刻度量压力损失 Measure pressure loss") {
          this.resultcount["刻度量压力损失 Measure pressure loss"] =
            this.countobject["最大流量 Maximum flow"];
        }
        if (i == "最大量压力损失 Maximum pressure loss") {
          this.resultcount["最大量压力损失 Maximum pressure loss"] =
            this.countobject["最大流量 Maximum flow"];
        }
        if (i == "常用量压力损失 Commonly used amount of pressure loss") {
          this.resultcount[
            "常用量压力损失 Commonly used amount of pressure loss"
          ] = this.countobject["最大流量 Maximum flow"];
        }
        if (i == "最小量压力损失 Minimum pressure loss") {
          this.resultcount["最小量压力损失 Minimum pressure loss"] =
            this.countobject["最大流量 Maximum flow"];
        }
        if (i == "验算常用流量 Minimum flow") {
          this.resultcount["验算常用流量 Minimum flow"] =
            this.countobject["最大流量 Maximum flow"];
        }
        if (i == "计算误差 Calculation error") {
          this.resultcount["计算误差 Calculation error"] =
            this.countobject["最大流量 Maximum flow"];
        }
        if (i == "流出系数") {
          this.resultcount.流出系数 = this.countobject["最大流量 Maximum flow"];
        }
        if (i == "流量系数") {
          this.resultcount.流量系数 = this.countobject["最大流量 Maximum flow"];
        }
        if (i == "后直管线") {
          this.resultcount.后直管线 = this.countobject["最大流量 Maximum flow"];
        }
        if (i == "前直管段") {
          this.resultcount.前直管段 = this.countobject["最大流量 Maximum flow"];
        }
        if (i == "管壁绝对粗糙度") {
          this.resultcount.管壁绝对粗糙度 =
            this.countobject["最大流量 Maximum flow"];
        }
      } //遍历结果字段进行计算
      var data = {
        tagnum: this.tagvalue,
        serialNumber: this.numbering,
        version: this.orderversion,
        ordernumber: this.ordernumber,
      }; //传递订单编号 位号 版本号
      setTimeout(() => {
        this.$bus.$emit("result1", this.foundationobject);
        this.$bus.$emit("result2", this.countobject);
        this.$bus.$emit("result3", this.rowobject);
        this.$bus.$emit("result4", this.resultcount);
        this.$bus.$emit("result5", this.model);
        this.$bus.$emit("pricenum", data);
      }, 1000);
      // 传递基础/长字段/输入/结果信息生成计算书，同时携带订单位号/编号/版本号，以及模板
      if (this.model == "模板1") {
        this.$router.push({
          path: "template1",
        });
      }
      if (this.model == "模板2") {
        this.$router.push({
          path: "template2",
        });
      }
      if (this.model == "模板3") {
        this.$router.push({
          path: "template3",
        });
      }
      if (this.model == "模板4") {
        this.$router.push({
          path: "template4",
        });
      }
    }, //传递位号和订单号，获取计算字段和输入字段信息
    change() {
      for (var i = 0; i < document.getElementsByTagName("select").length; i++) {
        document.getElementsByTagName("select")[i].value = "";
      }
      for (var i = 0; i < document.getElementsByTagName("input").length; i++) {
        document.getElementsByTagName("input")[i].value = "";
      }
      for (var key in this.foundationobject) {
        delete this.foundationobject[key];
      }
      for (var key in this.countobject) {
        delete this.countobject[key];
      }
      for (var key in this.rowobject) {
        delete this.rowobject[key];
      }
      this.model = "";
      var data = {
        tagnum: this.tagvalue,
        orderNumber: this.ordernumber,
        version: this.orderversion,
      };
      var datacover = {
        orderNumber: this.ordernumber,
        version: this.orderversion,
      };
      this.$store.dispatch("math/covered", datacover);
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
      else if (this.tagvalue != "") {
        this.$store.dispatch("math/countinfor", data);
      }
    },
  },
  mounted() {
    var data = {
      tagnum: this.unfinishtag[0],
      orderNumber: this.ordernumber,
      version: this.orderversion,
    };
    console.log(111);
    this.$store.dispatch("math/countinfor", data);

    var datacover = {
      serial_number: this.ordernumber,
      version: this.orderversion,
    };
    this.$store.dispatch("math/covered", datacover);
    //接受从未完成页面传过来的版本和订单号
    // var a = document.getElementsByTagName("select")[1];
    // var b = document.getElementsByTagName("option")[0];
    // a.value = this.unfinishtag[0];
    // console.log(a);
    // console.log(a.value);
    // a.value = b.value; //设置下拉框默认选择第一个
    this.$bus.$on("result11", (result) => {
      this.foundationobject = result;
    }); //接受模板传递的基础信息
    this.$bus.$on("result22", (result) => {
      this.countobject = result;
    }); //接受模板传递的输入信息
    this.$bus.$on("result33", (result) => {
      this.rowobject = result;
    }); //接受模板传递的长字段信息
    this.$bus.$on("result44", (result) => {
      this.model = result;
    }); //接受模板传递的模板信息
    this.$bus.$on("returnpricenum", (result) => {
      this.version = result.version;
      this.tagvalue = result.tagnum;
      this.serialNumber = result.serialNumber;
      this.$store.dispatch("math/countinfor", result);
    }); //接受从模板返回的订单信息
  },
  computed: {
    ...mapState("math", ["unfinishtag"]), //获取订单位号
    ...mapState("math", ["count"]), //获取输入字段信息
    ...mapState("math", ["resultinform"]), //获取结果字段信息
    ...mapState("math", ["ordernumber"]), //获取订单编号
    ...mapState("math", ["numbering"]), //获取订单编号
    ...mapState("math", ["orderversion"]), //获取订单版本号
    ...mapState("math", ["iscovered"]), //获取是否被覆盖
  },
  // watch: {
  //   tagvalue: function () {
  //     //负责清除多余内容
  //     // for (var i = 0; i < document.getElementsByTagName("select").length; i++) {
  //     //   document.getElementsByTagName("select")[i].value = "";
  //     // }
  //     // for (var i = 0; i < document.getElementsByTagName("input").length; i++) {
  //     //   document.getElementsByTagName("input")[i].value = "";
  //     // }
  //     // for (var key in this.foundationobject) {
  //     //   delete this.foundationobject[key];
  //     // }
  //     // for (var key in this.countobject) {
  //     //   delete this.countobject[key];
  //     // }
  //     // for (var key in this.rowobject) {
  //     //   delete this.rowobject[key];
  //     // }
  //     // this.model = "";
  //     //下面的代码负责判断是否有最新版本以及获取字段信息
  //     var data = {
  //       tagnum: this.tagvalue,
  //       orderNumber: this.ordernumber,
  //       version: this.orderversion,
  //     };
  //     var datacover = {
  //       orderNumber: this.ordernumber,
  //       version: this.orderversion,
  //     };
  //     this.$store.dispatch("math/covered", datacover);
  //     if (this.iscovered == true) {
  //       this.$message({
  //         message: "有最新版本需要完成，请完成最新版本",
  //         center: true,
  //       });
  //       setTimeout(() => {
  //         this.$router.push({
  //           path: "unfinished",
  //         });
  //       }, 3000);
  //     } //如果被覆盖了则返回待处理
  //     else if (this.tagvalue != "") {
  //       this.$store.dispatch("math/countinfor", data);
  //     }
  //   }, //根据位号获取对应的输入字段信息/结果字段信息
  // },
};
</script>

<style lang='less' scoped>
table {
  border: 1px solid;
  margin: auto;
  width: 1200px;
  height: 500px;
  background-color: floralwhite;
  margin-top: 10px;
}
td {
  padding-right: 20px;
  text-align: right;
  font-size: 15px;
}
input,
select {
  width: 140px;
  margin-left: 5px;
}
input:focus {
  outline: none;
}
.bookname {
  text-align: center;
  font-size: 25px;
  letter-spacing: 20px;
}
.btn {
  margin-top: 10px;
  margin-left: 35vw;
}
.el-button {
  margin-right: 25px;
}
</style>