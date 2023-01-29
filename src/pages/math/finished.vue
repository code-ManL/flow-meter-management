<template>
  <div class="solve-container">
    <el-table
      :data="
        finishnum
          .filter(
            (data) =>
              !search || data.name.toLowerCase().includes(search.toLowerCase())
          )
          .slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
      style="width: 100%"
      :default-sort="{ prop: 'date', order: 'descending' }"
    >
      <el-table-column fixed prop="date" label="日期" width="200" sortable>
      </el-table-column>
      <el-table-column prop="quoOrderNumber" label="订单编号" width="200">
      </el-table-column>
      <el-table-column prop="name" label="报价员" width="200">
      </el-table-column>
      <el-table-column label="版本号" width="200">
        <template v-slot:default="scope">
          <span v-if="scope.row.show">{{ scope.row.newestVersion }}</span>
          <el-select
            v-model="scope.row.newestVersion"
            placeholder="请选择"
            v-else
          >
            <el-option
              v-for="item in scope.row.options"
              :key="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            size="mini"
            v-model="search"
            placeholder="输入报价员名字搜索"
          />
        </template>
        <template slot-scope="scope">
          <el-button @click="look(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button @click="version(scope.row)" type="text" size="small"
            >选择版本</el-button
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
        :total="finishnum.length"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 10, // 每页的数据条数
      // tableData: [
      //   {
      //     date: "2016-05-02",
      //     quoSerialNumber: "20233",
      //     name: "张三",
      //     version: "v1",
      //     arr:['1','2','3']
      //     options: [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }],
      //     show: true,
      //   },
      // ],
      search: "",
    };
  },
  methods: {
    //每页条数改变时触发 选择一页显示多少行
    ...mapActions("math", ["finish"]),
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    version(row) {
      row.show = !row.show;
    },
    async look(scope) {
      var data = {
        orderNumber: scope.quoOrderNumber,
        calVersion: scope.newestVersion,
      }; //传递订单编号和最新的版本号
      await this.$store.dispatch("math/finishtagnum", data);
      this.$bus.$emit("show", true);
      this.$bus.$emit("orderNumber", scope.quoOrderNumber);
      this.$bus.$emit("calVersion", scope.newestVersion);
    },
  },
  watch: {
    finishnum: {
      immediate: true,
      deep: true,
      handler() {},
    },
  },
  computed: {
    ...mapState("math", ["finishnum"]), //获取已完成订单编号
  },
  mounted() {
    this.finish();
  },
};
</script>
<style lang="less" scoped>
.solve-container {
  height: 100%;
  width: 100%;
}
</style>
