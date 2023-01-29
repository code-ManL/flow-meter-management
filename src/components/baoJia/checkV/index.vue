<template>
  <div class="check-container">
    <div class="check-header">
      <div class="check-left">
        <el-form ref="form" :model="form" label-width="80px">
          <!-- 订单号查看 -->
          <el-form-item label="订单编号">
            <el-select
              v-model="form.region[0]"
              @change="select"
              placeholder="选择查看订单号"
              size="mini"
            >
              <el-option
                v-for="(item, index) in orderList"
                :label="item.order_number"
                :key="index"
                :value="item.order_number"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- 订单号版本查看 -->
          <el-form-item label="版本查看">
            <el-select
              v-model="form.region[1]"
              @change="select"
              placeholder="选择查看版本"
              size="mini"
            >
              <el-option
                v-for="(item, index) in options.versions"
                :label="item"
                :key="index"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- 循环展示 -->
        </el-form>
      </div>
      <div class="check-right">
        <el-button
          type="primary"
          icon="el-icon-upload el-icon--right"
          size="mini"
          >导入文件</el-button
        >
        <el-button type="primary" icon="el-icon-download" size="mini"
          >导出文件</el-button
        >
      </div>
    </div>
    <div class="check-footer">
      <div id="luckysheet" class="luckysheet-content"></div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      clearRow: 13,
      judegeWH: [], // 序号
      judegeZDArr: [],
      judegeZD: {}, //对象 序号+字段
      versionData: {
        v1: [
          {
            xuhao: 1,
            weihao: 2323,
            name: "xxxxx",
            size: 12,
            pressure: "1.0Kmp",
            connect: "A",
            jieliu: "x",
            huanshi: "x",
            falan: "x",
            zhiguan: "x",
            chaya: "x",
            number: "x",
            danjia: "x",
            peijian: "x",
            zongjia: "x",
          },
          {
            xuhao: 1,
            weihao: 2133,
            name: "xxxxx",
            size: 12,
            pressure: "1.0Kmp",
            connect: "A",
            jieliu: "a",
            huanshi: "a",
            falan: "v",
            zhiguan: "v",
            chaya: "v",
            number: "v",
            danjia: "v",
            peijian: "v",
            zongjia: "v",
          },
        ],
        v2: [
          {
            xuhao: 1,
            weihao: 2133,
            name: "xxxxx",
            size: 12,
            pressure: "1.0Kmp",
            connect: "A",
            jieliu: "a",
            huanshi: "a",
            falan: "a",
            zhiguan: "v",
            chaya: "a",
            number: "c",
            danjia: "a",
            peijian: "v",
            zongjia: "v",
          },
        ],
      },
      luckysheet: {},
      versionList: 2,
      activities: [
        {
          content: "发起申请",
          timestamp: "2018-04-12 20:46",
          size: "large",
          type: "primary",
          icon: "el-icon-more",
        },
        {
          content: "通过审核",
          timestamp: "2018-04-03 20:46",
          color: "#0bbd87",
        },
        {
          content: "等待处理",
          timestamp: "2018-04-03 20:46",
          size: "large",
        },
      ],
      form: {
        name: "",
        region: ["", ""],
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      options: [],
    };
  },
  mounted() {
    this.getInitDemo();
    this.getVersionList();
    let _this = this;
    (function () {
      let options = _this.getSheetInit;
      options.data = _this.getDataList;
      options.hook = _this.getHooks;
      luckysheet.create(options);
      _this.luckysheet = luckysheet;
    })();
  },
  methods: {
    ...mapActions("baojia", ["getInitDemo"]),
    ...mapActions("check", ["getVersionList", "getVersionDetail"]),
    onJudge() {
      let hasSame = false;
      for (let i = 0; i < this.versionData["v1"].length; i++) {
        for (let j = 0; j < this.versionData["v2"].length; j++) {
          if (
            this.versionData["v1"][i].weihao == this.versionData["v2"][j].weihao
          ) {
            hasSame = true;
            let obj = {};
            this.judegeZDArr.push(this.versionData["v1"][i].weihao);
            for (const key in this.versionData["v1"][0]) {
              if (
                this.versionData["v1"][i][key] != this.versionData["v2"][j][key]
              )
                obj[key] = 1;
            }
            this.judegeZD[this.versionData["v1"][i].weihao] = obj;
          }
        }
        if (!hasSame) this.judegeWH.push(this.versionData["v1"][i].weihao);
      }
      console.log(this.judegeZD);
    },

    select() {
      let result = this.orderList.find(
        (item) => item.order_number == this.form.region[0]
      );
      this.options = result;
      if (this.form.region[0] != "" && this.form.region[1] != "") {
        let obj = {
          version: Number(this.form.region[1]),
          orderNumber: this.form.region[0],
        };
        Promise.resolve(this.getVersionDetail(obj)).then((_) => {
          this.selectChange();
        });
      }
    },
    selectChange() {
      for (let i = 13; i < this.clearRow; i++) {
        for (let j = 0; j < 20; j++)
          this.luckysheet.setCellValue(i, j, {
            v: "",
            m: "",
          });
      }

      for (let i = 0; i < this.detail.length; i++) {
        this.detail[i].forEach((item, index) => {
          this.luckysheet.setCellValue(13 + i, index, {
            v: item,
            m: item,
          });
          this.luckysheet.setCellValue(13 + i, index, {
            fc: "#000000",
            bl: 0,
            fs: 10,
            ht: 0,
            vt: 0,
            tb: 2,
          });
        });
      }

      this.clearRow = this.detail.length;
    },
    onChange() {
      this.$router.push({
        path: "send",
      });
    },
  },
  computed: {
    ...mapState("check", ["orderList", "detail"]),
    ...mapState("baojia", ["initdemo"]),
    getFormInit() {
      let arr = [
        {
          r: 0,
          c: 0,
          v: {
            v: "重庆川仪自动化股份有限公司流量仪表分公司传真件",
            m: "重庆川仪自动化股份有限公司流量仪表分公司传真件",
            bl: 1,
            fs: 20,
            ht: 0,
            vt: 0,
          },
        },
        {
          r: 2,
          c: 0,
          v: {
            v: "地址:",
            m: "地址:",
            fs: 13,
            ht: 0,
            vt: 0,
          },
        },
        {
          r: 3,
          c: 0,
          v: {
            v: "电话:",
            m: "电话:",
            fs: 13,
            ht: 0,
            vt: 0,
          },
        },
        {
          r: 3,
          c: 1,
          v: {
            v: "023-68230961",
            m: "023-68230961",
            fs: 13,
            ht: 0,
            vt: 0,
          },
        },
        {
          r: 4,
          c: 0,
          v: {
            v: "单位:",
            m: "单位:",
            fs: 13,
            ht: 0,
            vt: 0,
          },
        },
        {
          r: 5,
          c: 0,
          v: {
            v: "收件人:",
            m: "收件人:",
            fs: 13,
            ht: 0,
            vt: 0,
          },
        },
        {
          r: 6,
          c: 0,
          v: {
            v: "传真:",
            m: "传真:",
            fs: 13,
            ht: 0,
            vt: 0,
          },
        },
        {
          r: 7,
          c: 0,
          v: {
            v: "总页数:",
            m: "总页数:",
            fs: 13,
            ht: 0,
            vt: 0,
          },
        },
        {
          r: 8,
          c: 0,
          v: {
            v: "紧急",
            m: "紧急",
            fs: 13,
            ht: 0,
            vt: 0,
          },
        },
        {
          r: 7,
          c: 1,
          v: {
            v: "1",
            m: "1",
            fs: 13,
            ht: 0,
            vt: 0,
          },
        },
        {
          r: 2,
          c: 1,
          v: {
            v: "重庆市北碚新区黄山大道中段川仪工业园区",
            m: "重庆市北碚新区黄山大道中段川仪工业园区",
            fs: 13,
            ht: 0,
            vt: 0,
          },
        },
        {
          r: 8,
          c: 5,
          v: {
            v: "请审阅",
            m: "请审阅",
            fs: 13,
            ht: 0,
            vt: 0,
          },
        },
        {
          r: 2,
          c: 7,
          v: {
            v: "邮编:",
            m: "邮编:",
            fs: 13,
            ht: 0,
            vt: 0,
          },
        },
        {
          r: 2,
          c: 8,
          v: {
            v: "401121",
            m: "401121",
            fs: 13,
            ht: 0,
            vt: 0,
          },
        },
        {
          r: 3,
          c: 7,
          v: {
            v: "传真:",
            m: "传真:",
            fs: 13,
            ht: 0,
            vt: 0,
          },
        },
        {
          r: 3,
          c: 8,
          v: {
            v: "023-67932676",
            m: "023-67932676",
            fs: 13,
            ht: 0,
            vt: 0,
          },
        },
        {
          r: 4,
          c: 7,
          v: {
            v: "报价员:",
            m: "报价员:",
            fs: 13,
            ht: 0,
            vt: 0,
          },
        },
        {
          r: 4,
          c: 8,
          v: {
            v: this.initdemo.name,
            m: this.initdemo.name,
            fs: 13,
            ht: 0,
            vt: 0,
          },
        },
        {
          r: 5,
          c: 7,
          v: {
            v: "商务技术:",
            m: "商务技术:",
            fs: 13,
            ht: 0,
            vt: 0,
          },
        },
        {
          r: 6,
          c: 7,
          v: {
            v: "日期:",
            m: "日期:",
            fs: 13,
            ht: 0,
            vt: 0,
          },
        },
        {
          r: 6,
          c: 8,
          v: {
            v: this.initdemo.date,
            m: this.initdemo.date,
            fs: 13,
            ht: 0,
            vt: 0,
          },
        },
        {
          r: 7,
          c: 7,
          v: {
            v: "编号:",
            m: "编号:",
            fs: 13,
            ht: 0,
            vt: 0,
          },
        },
        {
          r: 7,
          c: 8,
          v: {
            v: this.initdemo.serial_code,
            m: this.initdemo.serial_code,
            fs: 13,
            ht: 0,
            vt: 0,
          },
        },
        {
          r: 8,
          c: 9,
          v: {
            v: "复函请告",
            m: "复函请告",
            fc: "#ff0000",
            fs: 13,
            ht: 0,
            vt: 0,
          },
        },
        {
          r: 10,
          c: 0,
          v: {
            v: "川仪流量仪表公司节流装置报价书",
            m: "川仪流量仪表公司节流装置报价书",
            fs: 13,
            ht: 0,
            vt: 0,
          },
        },
        {
          r: 11,
          c: 0,
          v: {
            v: "序号",
            m: "序号",
            fs: 13,
            ht: 0,
            vt: 0,
          },
        },
        {
          r: 11,
          c: 1,
          v: {
            v: "位号",
            m: "位号",
            fs: 13,
            ht: 0,
            vt: 0,
          },
        },
        {
          r: 11,
          c: 2,
          v: {
            v: "名称、型号",
            m: "名称、型号",
            fs: 13,
            ht: 0,
            vt: 0,
          },
        },
        {
          r: 11,
          c: 3,
          v: {
            v: "公称通径",
            m: "公称通径",
            fs: 13,
            ht: 0,
            vt: 0,
          },
        },
        {
          r: 11,
          c: 4,
          v: {
            v: "公称压力",
            m: "公称压力",
            fs: 13,
            ht: 0,
            vt: 0,
          },
        },
        {
          r: 11,
          c: 5,
          v: {
            v: "过程连接",
            m: "过程连接",
            fs: 13,
            ht: 0,
            vt: 0,
          },
        },
        {
          r: 11,
          c: 6,
          v: {
            v: "材质",
            m: "材质",
            fs: 13,
            ht: 0,
            vt: 0,
          },
        },
        {
          r: 12,
          c: 6,
          v: {
            v: "节流件",
            m: "节流件",
            fs: 13,
            ht: 0,
            vt: 0,
          },
        },
        {
          r: 12,
          c: 7,
          v: {
            v: "环室/壳体",
            m: "环室/壳体",
            fs: 13,
            ht: 0,
            vt: 0,
          },
        },
        {
          r: 12,
          c: 8,
          v: {
            v: "法兰",
            m: "法兰",
            fs: 13,
            ht: 0,
            vt: 0,
          },
        },
        {
          r: 12,
          c: 9,
          v: {
            v: "直管段",
            m: "直管段",
            fs: 13,
            ht: 0,
            vt: 0,
          },
        },
        {
          r: 11,
          c: 10,
          v: {
            v: "差压",
            m: "差压",
            fs: 13,
            ht: 0,
            vt: 0,
          },
        },
        {
          r: 12,
          c: 10,
          v: {
            v: "kpa",
            m: "kpa",
            fs: 13,
            ht: 0,
            vt: 0,
          },
        },
        {
          r: 11,
          c: 11,
          v: {
            v: "数量",
            m: "数量",
            fs: 13,
            ht: 0,
            vt: 0,
          },
        },
        {
          r: 12,
          c: 11,
          v: {
            v: "(套)",
            m: "(套)",
            fs: 13,
            ht: 0,
            vt: 0,
          },
        },
        {
          r: 11,
          c: 13,
          v: {
            v: "单价(目录价)",
            m: "单价(目录价)",
            fc: "#ff0000",
            bg: "#ffff00",
            fs: 13,
            ht: 0,
            vt: 0,
          },
        },
        {
          r: 12,
          c: 13,
          v: {
            v: "元(RMB)",
            m: "元(RMB)",
            fs: 13,
            ht: 0,
            vt: 0,
          },
        },
        {
          r: 11,
          c: 12,
          v: {
            v: "配件",
            m: "配件",
            fs: 13,
            ht: 0,
            vt: 0,
          },
        },
        {
          r: 11,
          c: 14,
          v: {
            v: "合计(目录价)",
            m: "合计(目录价)",
            fc: "#ff0000",
            bg: "#ffff00",
            fs: 13,
            ht: 0,
            vt: 0,
          },
        },
        {
          r: 12,
          c: 14,
          v: {
            v: "元(RMB)",
            m: "元(RMB)",
            fs: 13,
            ht: 0,
            vt: 0,
          },
        },
      ];

      return arr; //初始化使用的单元格数据,r代表行，c代表列，v代表该单元格的值，最后展示的是value1，value2
    },
    getDataList() {
      let arr = [];
      for (let i = 0; i < 1; i++) {
        arr.push({
          name: "V" + (i + 1),
          color: "#eee333", //工作表(工作表名称底部边框线)颜色
          index: i + 1, //工作表索引(新增一个工作表时该值是一个随机字符串)
          status: 1, //激活状态
          order: 0, //工作表的下标
          hide: 0, //是否隐藏
          row: 36, //行数
          column: 18, //列数
          defaultRowHeight: 28, //自定义行高,单位px
          defaultColWidth: 100, //自定义列宽,单位px
          celldata: this.getFormInit,
          config: {
            merge: {
              "0_0": {
                rs: 2,
                cs: 18,
                r: 0,
                c: 0,
              },
              "2_1": {
                rs: 1,
                cs: 4,
                r: 2,
                c: 1,
              },
              "3_1": {
                rs: 1,
                cs: 2,
                r: 3,
                c: 1,
              },
              "3_8": {
                rs: 1,
                cs: 2,
                r: 3,
                c: 8,
              },
              "4_1": {
                rs: 1,
                cs: 4,
                r: 4,
                c: 1,
              },
              "5_1": {
                rs: 1,
                cs: 4,
                r: 5,
                c: 1,
              },
              "10_0": {
                rs: 1,
                cs: 18,
                r: 10,
                c: 0,
              },
              "11_0": {
                rs: 2,
                cs: 1,
                r: 11,
                c: 0,
              },
              "11_1": {
                rs: 2,
                cs: 1,
                r: 11,
                c: 1,
              },
              "11_2": {
                rs: 2,
                cs: 1,
                r: 11,
                c: 2,
              },

              "11_3": {
                rs: 2,
                cs: 1,
                r: 11,
                c: 3,
              },
              "11_4": {
                rs: 2,
                cs: 1,
                r: 11,
                c: 4,
              },
              "11_5": {
                rs: 2,
                cs: 1,
                r: 11,
                c: 5,
              },
              "11_12": {
                rs: 2,
                cs: 1,
                r: 11,
                c: 12,
              }, //
              "11_6": {
                rs: 1,
                cs: 4,
                r: 11,
                c: 6,
              },
            }, //合并单元格
            rowlen: {}, //表格行高
            columnlen: {}, //表格列宽
            rowhidden: {}, //隐藏行
            colhidden: {}, //隐藏列
            borderInfo: {}, //边框
            authority: {}, //工作表保护
          },

          scrollLeft: 0, //左右滚动条位置
          scrollTop: 0, //上下滚动条位置
          luckysheet_select_save: [], //选中的区域
          calcChain: [], //公式链
          isPivotTable: false, //是否数据透视表
          pivotTable: {}, //数据透视表设置
          filter_select: {}, //筛选范围
          filter: null, //筛选配置
          luckysheet_alternateformat_save: [], //交替颜色
          luckysheet_alternateformat_save_modelCustom: [], //自定义交替颜色
          luckysheet_conditionformat_save: {}, //条件格式
          frozen: {}, //冻结行列配置
          chart: [], //图表配置
          zoomRatio: 1, // 缩放比例
          image: [], //图片
          showGridLines: 1, //是否显示网格线
          dataVerification: {}, //数据验证配置
        });
      }
      return arr;
    },
    getSheetInit() {
      return {
        container: "luckysheet", // 设定DOM容器的id
        title: "Luckysheet Demo", // 设定表格名称
        lang: "zh", // 设定表格语言
        plugins: ["chart"],
        data: "",
        showtoolbar: true,
        showtoolbarConfig: {
          undoRedo: true, //撤销重做，注意撤消重做是两个按钮，由这一个配置决定显示还是隐藏
          paintFormat: true, //格式刷
          currencyFormat: true, //货币格式
          percentageFormat: false, //百分比格式
          numberDecrease: false, // '减少小数位数'
          numberIncrease: false, // '增加小数位数
          moreFormats: false, // '更多格式'
          font: true, // '字体'
          fontSize: true, // '字号大小'
          bold: true, // '粗体 (Ctrl+B)'
          italic: false, // '斜体 (Ctrl+I)'
          strikethrough: false, // '删除线 (Alt+Shift+5)'
          underline: false, // '下划线 (Alt+Shift+6)'
          textColor: false, // '文本颜色'
          fillColor: false, // '单元格颜色'
          border: false, // '边框'
          mergeCell: true, // '合并单元格'
          horizontalAlignMode: true, // '水平对齐方式'
          verticalAlignMode: true, // '垂直对齐方式'
          textWrapMode: false, // '换行方式'
          textRotateMode: false, // '文本旋转方式'
          image: true, // '插入图片'
          link: true, // '插入链接'
          chart: true, // '图表'（图标隐藏，但是如果配置了chart插件，右击仍然可以新建图表）
          postil: true, //'批注'
          pivotTable: false, //'数据透视表'
          function: true, // '公式'
          frozenMode: true, // '冻结方式'
          sortAndFilter: true, // '排序和筛选'
          conditionalFormat: false, // '条件格式'
          dataVerification: false, // '数据验证'
          splitColumn: true, // '分列'
          screenshot: true, // '截图'
          findAndReplace: true, // '查找替换'
          protection: true, // '工作表保护'
          print: false, // '打印'
        },
        showsheetbar: true, //是否显示底部sheet页按钮
        showsheetbarConfig: {
          add: true, //新增sheet
          menu: true, //sheet管理菜单
          sheet: true, //sheet页显示
        },
        showinfobar: false, //是否显示顶部信息栏
        showstatisticBar: true, //是否显示底部计数栏
        showstatisticBarConfig: {
          count: true, // 计数栏
          view: true, // 打印视图
          zoom: true, // 缩放
        },
        sheetFormulaBar: true, //是否显示公式栏
        allowCopy: true, //是否允许拷贝
        enableAddRow: true, //允许添加行
        hook: "",
      };
    },
    getHooks() {
      return {
        cellUpdated: function (r, c, obj, objtemp, t) {},
        sheetActivate: function (index) {
          console.log(index);
        },
        sheetCreatekBefore() {
          console.log("refer");
        },
      };
    },
  },
};
</script>
<style lang="less" scoped>
.check-container {
  margin-top: 20px;
  height: calc(100vh - 80px);
  width: 100%;
  display: flex;
  flex-direction: column;
  .check-header {
    height: 40px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    .check-left,
    .check-right {
      height: 100%;
      min-width: 600px;
    }
    .check-left {
      .el-form {
        display: flex;
        flex-wrap: wrap;
      }
    }
  }

  .check-footer {
    flex: 1;
    width: 100%;

    .luckysheet-content {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
