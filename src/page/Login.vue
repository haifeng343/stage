<template>
  <div>
    <el-form ref="ruleForm" :rules="ruleForm" :model="form" label-width="80px">
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="form.name"></el-input>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="form.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-button type="primary" @click="onSubmit('ruleForm')">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'login',
  data() {
    return {
      form: {
        name: 'admin',
        pass: '000000'
      },
      ruleForm: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        pass: [{ required: true, message: '请输入密码', trigger: 'change' }]
      }
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http
            .post('/api/xkspc/login', {
              user: this.form.name,
              pwd: this.form.pass
            })
            .then(res => {
              if (res.data.success == true) {
                this.$message.success(res.data.message)
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
    }
  }
}
</script>
<style scoped>
</style>