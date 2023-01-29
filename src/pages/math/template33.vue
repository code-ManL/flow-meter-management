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
      <div v-for="(val, key, i) in roww" :key="i">{{ key }}:{{ val }}</div>
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
    foundation1() {
      return Object.entries(this.found).filter((b, index) => {
        return index % 2 == 0;
      });
    },
    foundation2() {
      return Object.entries(this.found).filter((b, index) => {
        return index % 2 != 0;
      });
    },

    countobject1() {
      return Object.entries(this.count).filter((b, index) => {
        return index % 2 == 0;
      });
    },

    countobject2() {
      return Object.entries(this.count).filter((b, index) => {
        return index % 2 != 0;
      });
    },
    resultobject1() {
      return Object.entries(this.result).filter((b, index) => {
        return index % 2 == 0;
      });
    },

    resultobject2() {
      return Object.entries(this.result).filter((b, index) => {
        return index % 2 != 0;
      });
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
  letter-spacing: 5px;
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
  letter-spacing: 5px;
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