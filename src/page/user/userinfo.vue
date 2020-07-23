<template>
  <div>
    <el-row>
      <el-col :span="8" :offset="8">
        <el-card>
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="上传头像" prop="imageUrl">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="所在部门" prop="region">
              <el-select v-model="ruleForm.region" placeholder="请选择部门">
                <el-option label="市场部" value="shanghai"></el-option>
                <el-option label="技术部" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="兴趣爱好" prop="type">
              <el-checkbox-group v-model="ruleForm.type">
                <el-checkbox label="音乐" name="type"></el-checkbox>
                <el-checkbox label="看书" name="type"></el-checkbox>
                <el-checkbox label="逛街" name="type"></el-checkbox>
                <el-checkbox label="游戏" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="性别" prop="resource">
              <el-radio-group v-model="ruleForm.resource">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="2">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="个人签名" prop="desc">
              <el-input type="textarea" v-model="ruleForm.desc"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
              <el-button @click="resetForm('ruleForm')">取消</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imageUrl:require('../../assets/img/avator.png'),
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入个人姓名', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择所在部门', trigger: 'change' }
        ],
        // imageUrl:[ { required: true, message: '请选择个人头像', trigger: 'blur' }],
        date1: [
          {
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }
        ],
        date2: [
          {
            type: 'date',
            required: true,
            message: '请选择时间',
            trigger: 'change'
          }
        ],
        type: [
          {
            type: 'array',
            required: true,
            message: '请至少选择一个兴趣爱好',
            trigger: 'change'
          }
        ],
        resource: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        desc: [{ required: true, message: '请填写个人签名', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!')
      // }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },

  }
}
</script>
<style scoped>
.avatar-uploader{
  display: flex;
  justify-content: flex-start;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 150px;
    height: 150px;
    display: block;
  }
  .el-select{
    width: 100%;
  }
  .el-switch{
        width: 100%;
  }
  .el-checkbox-group{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }
  .el-radio-group{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    box-sizing: border-box;
    padding-top: 12px;
  }

</style>