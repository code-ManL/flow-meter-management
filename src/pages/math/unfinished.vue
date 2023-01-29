<template>
  <div class="solve-container">
    <el-table
      :data="
        unfinishnum
          .filter(
            (data) =>
              !search || data.name.toLowerCase().includes(search.toLowerCase())
          )
          .slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
      :default-sort="{ prop: 'date', order: 'descending' }"
      style="width: 100%"
    >
      <el-table-column fixed prop="date" label="日期" width="200" sortable>
      </el-table-column>
      <el-table-column prop="serialNumber" label="编号" width="200">
      </el-table-column>
      <el-table-column prop="orderNumber" label="订单编号" width="200">
      </el-table-column>
      <el-table-column prop="name" label="报价员" width="200">
      </el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入报价员名字搜索"
          />
        </template>
        <template slot-scope="scope">
          <el-button @click="count(scope.row)" type="text" size="small"
            >编辑</el-button
          >
          <el-button @click="files(scope.row)" type="text" size="small"
            >查看附件</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="block" style="margin-top: 15px">
      <el-pagination
        align="center"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="unfinishnum.length"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          num: "20233",
          user: "张三",
          version: "1",
          options: [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }],
          show: true,
        },
        {
          date: "2016-05-02",
          num: "20233",
          user: "张三",
          version: "1",
          options: [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }],
          show: true,
        },
      ],
      currentPage: 1, // 当前页码
      total: "", // 总条数
      pageSize: 10, // 每页的数据条数
      search: "",
    };
  },
  methods: {
    ...mapActions("math", ["unfinish"]),
    //每页条数改变时触发 选择一页显示多少行
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    //传递版本和订单号获取位号信息
    async count(scope) {
      var data = {
        orderNumber: scope.orderNumber, //订单号
        version: scope.version, //报价员的版本号
      };
      this.$store.dispatch("math/numbering", scope.serialNumber);
      this.$store.dispatch("math/ordernumber", scope.orderNumber);
      this.$store.dispatch("math/orderversion", scope.version);
      await this.$store.dispatch("math/unfinishtagnum", data);
      // setTimeout(() => {
      //   this.$bus.$emit("order", data.orderNumber);
      //   this.$bus.$emit("version", data.version);
      // }, 1000);
      this.$router.push({
        path: "mathCount",
      });
    },
    //传递订单的编号和版本号，获取订单的位号
  },
  computed: {
    ...mapState("math", ["unfinishnum"]), //获取订单编号
  },
  mounted() {
    this.unfinish(); //调action方法
  },
};
</script>
<style lang="less" scoped>
* {
  padding: 0;
  margin: 0;
}
</style>