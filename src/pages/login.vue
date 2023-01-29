<template>
  <div class="login-container">
    <div class="login-body">
      <div class="login-header">
        <div class="login-title">登录</div>
        <div class="login-check">
          <span>没有账号? </span>
          <span> 点击注册</span>
        </div>
      </div>
      <div class="login-content">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="" label-width="120" prop="name">
            <el-input
              placeholder="账号 / 邮箱 / 电话"
              v-model="ruleForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item label="" label-width="120" prop="password">
            <el-input
              :type="passw"
              placeholder="密码"
              v-model="ruleForm.password"
            >
              <i
                slot="suffix"
                class="el-input__icon el-icon-view"
                @click="showPass"
              ></i>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="login-remember">
        <el-checkbox v-model="checked">记住我</el-checkbox>
        <span>短信验证登录</span>
      </div>
      <el-button type="primary" @click="onSubmit">登录</el-button>
      <div class="login-forget">已有帐号，忘记密码 ?</div>
      <div class="login-detail">重庆川仪流量计后台管理系统登录平台</div>
    </div>
  </div>
</template>

<script>
import myTop from "@/components/header/top.vue";
import { mapActions, mapState } from "vuex";
import { reqFilterList } from "@/api/index.js";

export default {
  components: {
    myTop,
  },
  data() {
    return {
      checked: true,
      passw: "password",
      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        name: [
          { required: true, message: "用户名为必填项", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "密码为必填项", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "长度在 1 到 12 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    ...mapState("login", ["userInfo"]),
  },
  methods: {
    ...mapActions("login", ["pushUserInfo"]),
    async onSubmit() {
      try {
        //  登录成功
        const { username, password } = this.ruleForm;
        //
        username && password && (await this.pushUserInfo(this.ruleForm));

        if (this.userInfo == "管理员") {
          this.$router.push({
            path: "/manager",
          });
        } else if (this.userInfo == "报价员") {
          this.$router.push({
            path: "/baojia",
          });
        } else if (this.userInfo == "计算书") {
          this.$router.push({
            path: "/math",
          });
        }
      } catch (error) {
        alert(error.message);
      }
    },
    showPass() {
      //点击图标是密码隐藏或显示
      if (this.passw == "text") {
        this.passw = "password";
        //更换图标
        this.icon = "el-input__icon el-icon-view";
      } else {
        this.passw = "text";
        this.icon = "el-input__icon el-icon-loading";
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  mounted() {
    // reqFilterList().then((res) => {
    //   console.log(res);
    // });
  },
};
</script>

<style lang="less" scoped>
.login-container {
  height: 100vh;
  width: calc(100vw - var(--scrollbar));
  display: flex;
  align-items: center;
  justify-content: center;
  // background-color: rgb(230, 227, 222);
  .login-body {
    padding: 4% 5%;
    height: 600px;
    width: 400px;
    background-color: rgb(218, 218, 218);
    .login-header {
      width: 100%;
      height: 10%;
      margin-bottom: 30px;
      // background-color: red;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      .login-title {
        font-size: 28px;
        font-weight: 700;
      }
      .login-check {
        font-size: 16px;
        span {
          &:last-child {
            color: #005980;
          }
        }
      }
    }
    .login-remember {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 30px;
      span {
        font-size: 16px;
        color: #77a6bb;
      }
    }

    .el-button {
      width: 100%;
      font-size: 20px;
      background-color: #fe7300;
      border: none;
    }
    .login-forget {
      margin-top: 50px;
      width: 100%;
      text-align: center;
      color: #557e91;
      font-size: 16px;
    }
    .login-detail {
      margin-top: 30px;
      width: 100%;
      font-size: 20px;
      text-align: center;
    }
  }
}
</style>
