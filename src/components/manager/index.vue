<template>
  <div class="manager-body-container">
    <div class="menue-header">
      <el-button
        size="small"
        icon="el-icon-menu"
        style="margin-right: 20px"
      ></el-button>

      <el-breadcrumb separator="/">
        <el-breadcrumb-item>人员管理</el-breadcrumb-item>
        <el-breadcrumb-item
          ><span style="color: white">报价人员</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 新建列表 -->
      <el-dialog
        title="账号注册"
        width="450px"
        :visible.sync="dialogTableVisible"
      >
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="手机号码">
            <el-col :span="18">
              <el-input v-model="form.employeePhone"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="用户姓名">
            <el-col :span="18">
              <el-input v-model="form.employeeName"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="用户职位">
            <el-col :span="18">
              <el-input v-model="form.rootName"></el-input
            ></el-col>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button @click="dialogTableVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 新建列表  -->
    </div>
    <div class="menue-body">
      <div class="body-header">
        <el-button type="primary" @click="dialogTableVisible = true"
          >新建人员</el-button
        >
      </div>
      <el-table
        stripe
        ref="singleTable"
        :data="userList"
        highlight-current-row
        @current-change="handleCurrentChange"
        style="width: 100%"
        height="600px"
      >
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column property="employeePhone" label="手机号" width="120">
        </el-table-column>
        <el-table-column property="employeeName" label="姓名" width="120">
        </el-table-column>
        <el-table-column property="rootName" label="职位" width="120">
        </el-table-column>
        <el-table-column property="username" label="账号" width="120">
        </el-table-column>
        <el-table-column property="password" label="密码"> </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      dialogTableVisible: false,
      form: {
        employeePhone: "",
        employeeName: "",
        rootName: "",
      },
    };
  },
  computed: {
    ...mapState("manager", ["userList"]),
  },
  methods: {
    handleCurrentChange(key) {
      console.log(key);
    },
    onSubmit() {
      this.$store.dispatch("manager/createUserInfo", this.form);
      this.dialogTableVisible = false;
    },
  },
};
</script>

<style lang="less" scoped>
.manager-body-container {
  .menue-header {
    padding: 0 20px;
    height: 50px;
    width: 100%;
    display: flex;
    box-sizing: border-box;
    background-color: #333333;
    align-items: center;
  }

  .menue-body {
    .body-header {
      width: 100%;
      height: 80px;
      display: flex;
      align-items: center;
      // background-color: red;
    }
    margin-top: 80px;
    padding: 0 40px;
    box-sizing: border-box;
    width: 100%;
    height: 200px;
  }
}
</style>