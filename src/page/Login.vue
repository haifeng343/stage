<template>
  <div class="poster">
    <el-form
      class="login-container"
      ref="ruleForm"
      :rules="loginRule"
      :model="ruleForm"
      label-position="left"
      label-width="0px"
    >
      <h3 class="login_title">系统登录</h3>
      <el-form-item prop="username">
        <el-input
          type="text"
          class="input1"
          v-model="ruleForm.username"
          auto-complete="off"
          placeholder="账号"
        ></el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          type="password"
          class="input1"
          v-model="ruleForm.password"
          auto-complete="off"
          placeholder="密码"
          :show-password="true"
        ></el-input>
      </el-form-item>

      <el-form-item style="width: 100%">
        <el-button type="primary" class="loginBtn" @click="onSubmit('ruleForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'login',
  data() {
    return {
      ruleForm: {
        username: '',
        password: '',
      },
      loginRule: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'change' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'change' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' },
        ],
      },
    }
  },
  created() {
    // 按下回车执行登录按钮点击事件
    let that = this
    document.onkeydown = function(e) {
      var key = window.event.keyCode
      if (key == 13) {
        that.onSubmit('ruleForm');
      }
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
          if (valid) {
          this.$http
            .post('/api/xkspc/login', {
              user: this.ruleForm.username,
              pwd: this.ruleForm.password,
            })
            .then((res) => {
              if (res.data.success == true) {
                this.$message.success('登录成功')
                window.sessionStorage.setItem('token', res.data)
                this.$router.push('/home')
              } else {
                this.$message.error(res.data.message)
              }
            })
        } else {
          console.log('false')
        }
      })
    },
  },
}
</script>
<style scoped>
.poster {
  /* background: url('../assets/img/login-bg.jpeg') no-repeat; */
  background:linear-gradient(to right, #bb313e25, #bb313e25, #d7222925, #dd4a1625, #e4761525, #f5c50025, #f0e92725, #b1ce2425, #48a93525, #03944525, #157c4f25, #176a5825, #1b556325, #1d386f25, #1d386f25, #20277825, #52266325, #8a244b25);
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
  overflow: hidden;
}
body {
  margin: 0px;
  padding: 0;
}
.loginBtn {
  width: 100%;
  background: #eaeaea;
  color: #000;
  border: 1px solid #eaeaea;
}
.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: auto;
  width: 350px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  z-index: 9999;
}
.login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
</style>

<style>

.input1 .el-input__inner {
    background: transparent;
    color: #505458;
}
.input1 input:-internal-autofill-previewed,
.input1 input:-internal-autofill-selected {
    -webkit-text-fill-color: #505458;
    transition: background-color 5000s ease-out 0.5s;
}
</style>