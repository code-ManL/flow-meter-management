<template>
  <div class="init-container">
    <div class="init-header">
      <!-- <el-button >警告</el-button> -->
      <el-button
        @click="inportExcel"
        icon="el-icon-upload el-icon--right"
        size="mini"
        :plain="true"
        >导入文件
        <!-- <input  style="width: 150px" type="file" /> -->
      </el-button>
      <el-button
        type="primary"
        icon="el-icon-download"
        @click="exportExcel"
        size="mini"
        style="margin-right: 10px"
        >导出文件</el-button
      >

      <el-select
        v-model="counterName"
        size="mini"
        placeholder="请选择计算书人员"
      >
        <el-option
          v-for="item in counterList"
          :key="item"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
    </div>
    <div class="sheet-cotainer">
      <div id="luckysheet" class="luckysheet-content"></div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from "vuex";
import { reqSheetList } from "@/api";
export default {
  props: ["orderNumber"],

  data() {
    return {
      counterName: "",
      test: true,
      clearRow: 13,
      beginRow: 13,
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
        ],
      },
      luckysheet: {},
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
    };
  },

  mounted() {
    const _this = this;
    Promise.resolve(this.getInitDemo()).then((_) => {
      $(function () {
        let options = _this.getSheetInit;
        options.data = _this.getDataList;
        options.hook = _this.getHooks;
        luckysheet.create(options);
        _this.luckysheet = luckysheet;
      });
    });
  },
  methods: {
    ...mapActions("baojia", ["getInitDemo"]),
    ...mapMutations("baojia", ["CHANGEBIANHAO"]),

    exportExcel() {
      this.$excelExport(this.luckysheet.getLuckysheetfile());
    },

    inportExcel() {
      if (this.counterName == "") {
        this.$message({
          message: "请选择计算书人员",
          type: "warning",
        });
        return;
      }
      let arr = this.luckysheet.getAllSheets()[0].data;

      let dataArray = {
        header: [],
        body: [],
        title: "",
        counter: "",
      };
      //获取表头数据  http://127.0.0.1:8081
      for (let i = 2; i < 8; i++) {
        dataArray.header.push([
          {
            title: arr[i][0] ? arr[i][0].v : "",
            content: arr[i][1] ? arr[i][1].v : "",
          },
          {
            title: arr[i][7] ? arr[i][7].v : "",
            content: arr[i][8] ? arr[i][8].v : "",
          },
        ]);
      }
      //获取表内容数据
      for (let i = 13; i < arr.length; i++) {
        let flag = true;
        let arrTemp = arr[i].map((item, index) => {
          // console.log(item);
          if ((item == null || !item.v) && index < 12) {
            flag = false;
          }
          // console.log(item.v);
          return item ? item.v : "";
        });
        if (flag) dataArray.body.push(arrTemp);
      }
      // 合并编号
      dataArray.title = this.orderNumber;
      dataArray.counter = this.counterName;

      console.log(dataArray);

      reqSheetList(dataArray, this.token);

      this.clearList();
      this.$emit("clearInit");
      this.$emit("clearOut");
      this.luckysheet.setCellValue(7, 8, {
        v: "",
        m: "",
      });
    },

    clearList() {
      let i = 13;
      while (i < this.clearRow) {
        for (let j = 0; j < 18; j++) {
          this.luckysheet.setCellValue(i, j, {
            v: "",
            m: "",
          });
          this.luckysheet.setCellValue(i, j, {
            fc: "#000000",
            bl: 0,
            fs: 10,
            ht: 0,
            vt: 0,
            tb: 2,
          });
        }
        i++;
      }
    },
    selectChange(arr) {
      let chearTemp = 13;
      let i = 0;
      console.log(arr, "------");
      while (i < arr.length) {
        let item = Object.values(arr[i]);
        for (let x = 0; x < 2; x++) {
          item.unshift(item.pop());
        }

        for (let j = 0; j < item.length; j++) {
          this.luckysheet.setCellValue(chearTemp, j, {
            v: item[j],
            m: item[j],
          });
          this.luckysheet.setCellValue(chearTemp, j, {
            fc: "#000000",
            bl: 0,
            fs: 10,
            ht: 0,
            vt: 0,
            tb: 2,
          });
        }
        i++;
        chearTemp++;
      }
      this.clearRow = chearTemp;
    },
    importExcel(event) {
      let file = event.target.files[0];
      /* 实例FileReader对象 */
      let reader = new FileReader();
      let _this = this;
      reader.onload = function (e) {
        let bstr = e.target.result;
        let wb = XLSX.read(bstr, { type: "binary" });
        let wsname = wb.SheetNames[0];
        let ws = wb.Sheets[wsname];
        /* 将工作表对象转换为JSON对象数组*/
        // let dataArr = XLSX.utils.sheet_to_json(ws, { header: 1 });
        /* 生成HTML输出 */
        let data = XLSX.utils.sheet_to_html(ws);
        /* 调用数据转换方法将数据格式转换成Luckysheet格式*/
        _this.readFile(data);
      };
      /*将文件内容读取为原始二进制字符串*/
      reader.readAsBinaryString(file);
    },
    readFile(txtdata) {
      $("#luckysheet-copy-content").html(txtdata);

      let data = new Array(
        $("#luckysheet-copy-content").find("table tr").length
      );
      let colLen = 0;
      $("#luckysheet-copy-content")
        .find("table tr")
        .eq(0)
        .find("td")
        .each(function () {
          let colspan = parseInt($(this).attr("colspan"));
          if (isNaN(colspan)) {
            colspan = 1;
          }
          colLen += colspan;
        });

      for (let i = 0; i < data.length; i++) {
        data[i] = new Array(colLen);
      }

      let r = 0;
      let borderInfo = {};
      let luckysheet_select_save = luckysheet.getluckysheet_select_save();

      $("#luckysheet-copy-content")
        .find("table tr")
        .each(function () {
          let $tr = $(this);
          let c = 0;
          $tr.find("td").each(function () {
            let $td = $(this);
            let cell = {};
            let txt = $td.text();

            if ($.trim(txt).length == 0) {
              cell.v = null;
              cell.m = "";
            } else {
              let mask = luckysheet.mask.genarate($td.text());
              cell.v = mask[2];
              cell.ct = mask[1];
              cell.m = mask[0];
            }

            let bg = $td.css("background-color");
            if (bg == "rgba(0, 0, 0, 0)") {
              bg = "rgba(255,255,255)";
            }

            cell.bg = bg;

            let bl = $td.css("font-weight");
            if (bl == 400 || bl == "normal") {
              cell.bl = 0;
            } else {
              cell.bl = 1;
            }

            let it = $td.css("font-style");
            if (it == "normal") {
              cell.it = 0;
            } else {
              cell.it = 1;
            }

            let ff = $td.css("font-family");
            let ffs = ff.split(",");
            for (let i = 0; i < ffs.length; i++) {
              let fa = $.trim(ffs[i].toLowerCase());
              fa = luckysheet.menuButton.fontjson[fa];
              if (fa == null) {
                cell.ff = 0;
              } else {
                cell.ff = fa;
                break;
              }
            }

            let fs =
              Math.floor(
                (parseInt($td.css("font-size")) * 72) / luckysheet.dpi_y
              ) + 1;
            cell.fs = fs;

            let fc = $td.css("color");

            cell.fc = fc;

            let ht = $td.css("text-align");
            if (ht == "center") {
              cell.ht = 0;
            } else if (ht == "right") {
              cell.ht = 2;
            } else {
              cell.ht = 1;
            }

            let vt = $td.css("vertical-align");
            if (vt == "middle") {
              cell.vt = 0;
            } else if (vt == "top" || vt == "text-top") {
              cell.vt = 1;
            } else {
              cell.vt = 2;
            }

            while (c < colLen && data[r][c] != null) {
              c++;
            }

            if (c == colLen) {
              return true;
            }

            if (data[r][c] == null) {
              data[r][c] = cell;
              let rowspan = parseInt($td.attr("rowspan"));
              let colspan = parseInt($td.attr("colspan"));

              if (isNaN(rowspan)) {
                rowspan = 1;
              }

              if (isNaN(colspan)) {
                colspan = 1;
              }

              let r_ab = luckysheet_select_save[0]["row"][0] + r;
              let c_ab = luckysheet_select_save[0]["column"][0] + c;
              for (let rp = 0; rp < rowspan; rp++) {
                for (let cp = 0; cp < colspan; cp++) {
                  if (rp == 0) {
                    let bt = $td.css("border-top");
                    if (
                      bt != null &&
                      bt.length > 0 &&
                      bt.substr(0, 3).toLowerCase() != "0px"
                    ) {
                      let width = $td.css("border-top-width");
                      let type = $td.css("border-top-style");
                      let color = $td.css("border-top-color");
                      let borderconfig = luckysheet.menuButton.getQKBorder(
                        width,
                        type,
                        color
                      );

                      if (borderInfo[r + rp + "_" + (c + cp)] == null) {
                        borderInfo[r + rp + "_" + (c + cp)] = {};
                      }

                      borderInfo[r + rp + "_" + (c + cp)].t = {
                        style: borderconfig[0],
                        color: borderconfig[1],
                      };
                    }
                  }

                  if (rp == rowspan - 1) {
                    let bb = $td.css("border-bottom");
                    if (
                      bb != null &&
                      bb.length > 0 &&
                      bb.substr(0, 3).toLowerCase() != "0px"
                    ) {
                      let width = $td.css("border-bottom-width");
                      let type = $td.css("border-bottom-style");
                      let color = $td.css("border-bottom-color");
                      let borderconfig = luckysheet.menuButton.getQKBorder(
                        width,
                        type,
                        color
                      );

                      if (borderInfo[r + rp + "_" + (c + cp)] == null) {
                        borderInfo[r + rp + "_" + (c + cp)] = {};
                      }

                      borderInfo[r + rp + "_" + (c + cp)].b = {
                        style: borderconfig[0],
                        color: borderconfig[1],
                      };
                    }
                  }

                  if (cp == 0) {
                    let bl = $td.css("border-left");
                    if (
                      bl != null &&
                      bl.length > 0 &&
                      bl.substr(0, 3).toLowerCase() != "0px"
                    ) {
                      let width = $td.css("border-left-width");
                      let type = $td.css("border-left-style");
                      let color = $td.css("border-left-color");
                      let borderconfig = luckysheet.menuButton.getQKBorder(
                        width,
                        type,
                        color
                      );

                      if (borderInfo[r + rp + "_" + (c + cp)] == null) {
                        borderInfo[r + rp + "_" + (c + cp)] = {};
                      }

                      borderInfo[r + rp + "_" + (c + cp)].l = {
                        style: borderconfig[0],
                        color: borderconfig[1],
                      };
                    }
                  }

                  if (cp == colspan - 1) {
                    let br = $td.css("border-right");
                    if (
                      br != null &&
                      br.length > 0 &&
                      br.substr(0, 3).toLowerCase() != "0px"
                    ) {
                      let width = $td.css("border-right-width");
                      let type = $td.css("border-right-style");
                      let color = $td.css("border-right-color");
                      let borderconfig = luckysheet.menuButton.getQKBorder(
                        width,
                        type,
                        color
                      );

                      if (borderInfo[r + rp + "_" + (c + cp)] == null) {
                        borderInfo[r + rp + "_" + (c + cp)] = {};
                      }

                      borderInfo[r + rp + "_" + (c + cp)].r = {
                        style: borderconfig[0],
                        color: borderconfig[1],
                      };
                    }
                  }

                  if (rp == 0 && cp == 0) {
                    continue;
                  }
                  data[r + rp][c + cp] = { mc: { r: r_ab, c: c_ab } };
                }
              }

              if (rowspan > 1 || colspan > 1) {
                let first = { rs: rowspan, cs: colspan, r: r_ab, c: c_ab };
                data[r][c].mc = first;
              }
            }

            c++;

            if (c == colLen) {
              return true;
            }
          });

          r++;
        });

      let index = luckysheet.sheetmanage.getSheetIndex(
        luckysheet.currentSheetIndex
      );
      let file = luckysheet.getluckysheetfile()[index];
      let luckysheet_selection_range = file["luckysheet_selection_range"];

      luckysheet_selection_range = [];
      luckysheet.selection.pasteHandler(data, borderInfo);
      $("#luckysheet-copy-content").empty();
    },
    serialCode(newValue) {
      this.luckysheet.setCellValue(7, 8, {
        v: newValue,
        m: newValue,
      });
      this.CHANGEBIANHAO();
    },
  },
  computed: {
    ...mapState("baojia", [
      "checkList",
      "initdemo",
      "counterList",
      "serialcode",
    ]),
    ...mapState("login", ["token"]),
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
            v: "",
            m: "",
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
      let i = 0;
      let chearTemp = 13;
      let j = 0;
      while (i < this.checkList.length) {
        let item = Object.values(this.checkList[i]);
        for (let x = 0; x < 2; x++) {
          item.unshift(item.pop());
        }
        for (const iterator of item) {
          let obj = {
            r: chearTemp,
            c: j++,
            v: {
              v: iterator,
              m: iterator,
              fc: "#000000",
              bl: 0,
              fs: 10,
              ht: 0,
              vt: 0,
              tb: 2,
            },
          };
          arr.push(obj);
        }
        chearTemp++;
        j = 0;
        i++;
      }
      return arr; //初始化使用的单元格数据,r代表行，c代表列，v代表该单元格的值，最后展示的是value1，value2
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
  },

  watch: {
    checkList: function (newValue) {
      this.selectChange(newValue);
    },
    serialcode: function (newValue) {
      this.serialCode(newValue);
    },
  },
};
</script>

<style lang="less" scoped>
.init-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  .init-header {
    background-color: rgba(226, 225, 222, 0.2);
  }

  .sheet-cotainer {
    width: 100%;
    flex: 1;
    .luckysheet-content {
      width: 100%;
      height: 100%;
      :deep(#luckysheet-sheet-list) {
        left: 30% !important;
      }
    }
  }
}
</style>
