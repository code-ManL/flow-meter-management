<template>
  <div class="excelInit-container">
    <!-- <transition enter-active-class="animate__animated animate__fadeInLeft"> -->
      <div
        class="left"
        v-if="showMenue"
        :style="{ width: showExcel == false ? '100%' : '540px' }"
      >
        <div class="check-area">
          <!-- 表单选区 -->
          <div class="order">
            <div>
              <el-input
                placeholder="订单编号"
                size="mini"
                v-model="OrderNumber"
                @blur="getSerial"
              ></el-input>
            </div>
          </div>
          <el-form ref="form" :model="form" id="selectForm">
            <el-form-item
              label-width="80px"
              v-for="(titleitem, index) in titleList"
              :key="index"
              :label="titleitem.title"
            >
              <el-select
                v-model="form.region[index]"
                size="mini"
                style="width: 80%"
                @change="selectChange($event, titleitem.title)"
                placeholder="请选择参数"
              >
                <el-option
                  :value="item2"
                  v-for="(item2, index) in titleitem.types"
                  :key="index"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>

          <!-- 创建按钮 -->
          <div class="check-sub">
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button type="primary" @click="clearOut">清空选项</el-button>
            <el-button>取消</el-button>
          </div>
        </div>
        <div class="check-show">
          <el-table
            :data="filterList"
            style="width: 100%"
            height="100%"
            @select="checkOption"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column prop="productName" label="产品名称" width="120">
            </el-table-column>
            <el-table-column prop="nominalPath" label="公称通径" width="120">
            </el-table-column>
            <el-table-column
              prop="nominalPressure"
              label="公称压力"
              width="120"
            >
            </el-table-column>
            <el-table-column
              prop="processConnection"
              label="过程连接"
              width="120"
            >
            </el-table-column>
            <el-table-column prop="material" label="材质" width="120">
              <el-table-column
                prop="throttlingParts"
                label="节流件"
                width="120"
              >
              </el-table-column>
              <el-table-column prop="ringHousing" label="环室/壳体" width="120">
              </el-table-column>
              <el-table-column prop="flangName" label="法兰" width="120">
              </el-table-column>
              <el-table-column prop="straightPipe" label="直管段" width="120">
              </el-table-column>
            </el-table-column>
            <el-table-column prop="diffPressure" label="差压" width="120">
            </el-table-column>
            <el-table-column prop="number" label="数量" width="120">
            </el-table-column>
            <el-table-column
              prop="fittingsName"
              label="配件"
              show-overflow-tooltip
            >
            </el-table-column>
          </el-table>
        </div>
      </div>
    <!-- </transition> -->

    <div class="right">
      <!-- <transition enter-active-class="animate__animated animate__fadeInUp"> -->
        <div class="content" v-show="showExcel">
          <init-excel
            :orderNumber="OrderNumber"
            :key="flash"
            @clearInit="clearInit"
            @clearOut="clearOut"
          ></init-excel>
        </div>
      <!-- </transition> -->

      <div class="footer" :style="{ flex: showExcel == false ? '1' : '0' }">
        <i
          class="iconfont icon-zuoce"
          v-show="showMenue"
          @click="hiddenMenue()"
        ></i>
        <i
          class="iconfont icon-youce"
          v-show="showExcel"
          @click="hiddenExcel()"
        ></i>
      </div>
    </div>
  </div>
</template>

<script>
import initExcel from "./init";
import { mapMutations, mapActions, mapState } from "vuex";
export default {
  components: {
    initExcel,
  },
  data() {
    return {
      OrderNumber: "",
      checkNumber: 1,
      flash: true,
      showMenue: true,
      showExcel: true,
      form: {
        name: "",
        region: ["", "", "", "", "", "", "", "", "", ""],
      },
      checkListTemp: [],
    };
  },
  computed: {
    ...mapState("baojia", ["titleList", "lastbit", "filterList", "checkList"]),
  },
  methods: {
    ...mapActions("baojia", [
      "getTitleList",
      "getLastBit",
      "getCounterList",
      "getFilterList",
      "getSerialcode",
    ]),

    ...mapMutations("baojia", ["CHECKLIST", "UPDATEBIT", "CLEARFILTER"]),
    // 改了
    getSerial() {
      this.getSerialcode();
    },
    checkOption(item) {
      this.checkListTemp = item;
    },

    selectChange(value, num) {
      // 请求筛选列表
      let arr = this.titleList.map((item, index) => {
        return {
          title: item.title,
          content: this.form.region[index],
        };
      });
      this.getFilterList(arr);
    },

    onSubmit() {
      let arr = [];
      // checkListTemp 为当前选中的数据
      for (const item of Array.from(this.checkListTemp)) {
        arr.push(JSON.parse(JSON.stringify(item)));
      }

      for (const item of arr) {
        item.checkNumber = this.checkNumber++;
        item.weihao = `K${this.lastbit}`;
        // 更新位号
        this.UPDATEBIT(this.lastbit + 1);
      }

      // 更新仓库数据，子组件重新渲染
      this.CHECKLIST(this.checkList.concat(arr));
    },

    clearOut() {
      this.form.region = ["", "", "", "", "", "", "", "", "", ""];
      this.CLEARFILTER();
      this.OrderNumber = "";
    },

    hiddenMenue() {
      if (this.showExcel == false) {
        this.showExcel = true;
      } else {
        this.showMenue = false;
      }
      this.flash = !this.flash;
    },

    hiddenExcel() {
      if (this.showMenue == false) {
        this.showMenue = true;
      } else {
        this.showExcel = false;
      }
      this.flash = !this.flash;
    },

    clearInit() {
      // 子组件提交数据之后
      this.checkListTemp = [];
      this.checkNumber = 1;
      // 清空仓库的数据，仓库数据是用来进行渲染
      this.CHECKLIST([]);
    },
  },
  mounted() {
    this.getTitleList();
    this.getLastBit();
    this.getCounterList();
  },
};
</script>

<style lang="less" scoped>
.excelInit-container {
  margin-top: 20px;
  height: calc(100vh - 80px);
  width: 100%;
  box-sizing: border-box;
  padding: 1px;
  display: flex;
  .left {
    height: 100%;
    // background-color: antiquewhite;
    .check-area {
      max-width: 540px;
      height: 400px;
      width: inherit;
      background-color: rgba(207, 210, 212, 0.2);
      overflow: hidden;
      padding-top: 10px;
      .order {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .el-form {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
      }
      .check-sub {
        text-align: center;
      }
    }
    .check-show {
      width: 100%;
      height: calc(100vh - 492px);
    }
  }
  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    .content {
      flex: 1;
      width: 100%;
    }
    .footer {
      height: 40px;
      width: 100%;
      font-size: 20px;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding-left: 10px;
      background-color: rgba(207, 210, 212, 0.2);
      .iconfont:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
