<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <!-- <child :name="name" :page="pageIndex" :onShowDialog="add" :func="getData" ref="childRef"></child> -->
      <!-- 搜索添加区域 -->
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input
            placeholder="请输入内容"
            v-model="keyword"
            clearable
            @clear="getData"
            class="input-with-select"
          >
            <el-button slot="append" type="primary" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="add">添加用户</el-button>
        </el-col>
      </el-row>

      <!-- 数据表格 -->
      <el-table
        :data="tableData"
        height="600"
        border
        stripe
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <el-table-column type="index" width="50" fixed label="#"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="mobile" label="手机号" width="180"></el-table-column>
        <el-table-column prop="type" label="角色" width="180">
          <template slot-scope="scope">
            <span v-if="scope.row.type==1">超级管理员</span>
            <span v-if="scope.row.type==2">管理员</span>
            <span v-if="scope.row.type==3">操作员</span>
            <span v-if="scope.row.type==4">入库员</span>
            <span v-if="scope.row.type==5">配送员</span>
          </template>
        </el-table-column>
        <el-table-column prop="email" label="邮箱地址" width="200"></el-table-column>
        <el-table-column label="状态" width="180">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_status"
              active-text="是"
              inactive-color="#BFBFBF"
              inactive-text="否"
              :active-value="true"
              :inactive-value="false"
              @change="swichChange(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="创建时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="edit(scope.row)"></el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleted(scope.row)"></el-button>
            <el-tooltip
              class="item"
              effect="dark"
              :enterable="false"
              content="设置权限"
              placement="top"
            >
              <el-button type="warning" size="mini" icon="el-icon-setting"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      ></el-pagination>

      <!-- 添加用户 -->
      <el-dialog title="新增用户" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
        <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="addForm.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pwd">
            <el-input type="password" v-model="addForm.pwd"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="addForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="mobile">
            <el-input type="number" v-model="addForm.mobile"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogClosed">取 消</el-button>
          <el-button type="primary" @click="addSubmitForm('addForm')">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 修改用户 -->
      <el-dialog
        title="修改用户"
        :visible.sync="editDialogVisible"
        width="50%"
        @close="editDialogClosed"
      >
        <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="editForm.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pwd">
            <el-input type="password" v-model="editForm.pwd"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="editForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="mobile">
            <el-input type="number" v-model="editForm.mobile"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogClosed">取 消</el-button>
          <el-button type="primary" @click="editSubmitForm('editForm')">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import child from '../../components/children.vue'
export default {
  components: { child },
  data() {
    // 校验邮箱
    var checkEmail = (rule, value, cb) => {
      const regEmail = ''
      if (regEmail.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法的邮箱'))
    }
    // 校验手机号
    var checkMobile = (rule, value, cb) => {
      const regMbole = ''
      if (regMbole.test(value)) {
        return cb()
      }
      cb(new Error('请输入正确的手机号'))
    }
    return {
      loading:true,
      name: '2',
      keyword: '',
      addForm: {
        name: '',
        email: '',
        mobile: '',
        pwd: '',
      },
      addFormRules: {
        name: [
          { required: true, trigger: 'blur', message: '请输入用户名' },
          { min: 3, max: 10, message: '用户名长度在3到10个字符之间' },
        ],
        pwd: [{ required: true, trigger: 'blur', message: '请输入密码' }],
        email: [
          { required: true, trigger: 'blur', message: '请输入邮箱' },
          { validator: checkEmail, trigger: 'blur' },
        ],
        mobile: [
          { required: true, trigger: 'blur', message: '请输入手机号' },
          { validator: checkMobile, trigger: 'blur' },
        ],
      },
      addDialogVisible: false, //添加对话框的显示隐藏

      editForm: {
        name: '',
        email: '',
        mobile: '',
        pwd: '',
      },
      editFormRules: {
        name: [
          { required: true, trigger: 'blur', message: '请输入用户名' },
          { min: 2, max: 10, message: '用户名长度在2到10个字符之间' },
        ],
        pwd: [{ required: true, trigger: 'blur', message: '请输入密码' }],
        email: [
          { required: true, trigger: 'blur', message: '请输入邮箱' },
          { validator: checkEmail, trigger: 'blur' },
        ],
        mobile: [
          { required: true, trigger: 'blur', message: '请输入手机号' },
          { validator: checkMobile, trigger: 'blur' },
        ],
      },
      editDialogVisible: false, //添加对话框的显示隐藏
      pageIndex: 1,
      pageSize: 10,
      tableData: [
        {
          id: 1,
          date: '2016-05-03',
          name: '王小虎',
          mobile: '13500000000',
          address: '上海市普陀区金沙江路 1518 弄',
          type: 1,
          email: '82738273@qq.com',
          mg_status: true,
        },
        {
          id: 2,
          date: '2018-05-03',
          name: '张亮',
          mobile: '13700000000',
          address: '上海市普陀区金沙江路 1518 弄',
          type: 2,
          email: '653432325@qq.com',
          mg_status: true,
        },
        {
          id: 3,
          date: '2020-01-12',
          mobile: '13800000000',
          name: '陈晓',
          address: '上海市普陀区金沙江路 1518 弄',
          type: 3,
          email: '3245657657@qq.com',
          mg_status: false,
        },
        {
          id: 4,
          date: '2019-07-25',
          name: '赵兵',
          mobile: '15900000000',
          address: '上海市普陀区金沙江路 1518 弄',
          type: 4,
          email: '432123432@qq.com',
          mg_status: true,
        },
        {
          id: 5,
          date: '2019-10-12',
          name: '杨梁',
          mobile: '17600000000',
          address: '上海市普陀区金沙江路 1518 弄',
          type: 5,
          email: '4321231343@qq.com',
          mg_status: false,
        },
      ],
    }
  },
  created(){
    this.getData();
  },
  methods: {
    // 监听 pagesize 改变事件
    handleSizeChange(val) {
      this.pageSize = val
    },
    // 监听页码值改变的事件
    handleCurrentChange(val) {
      this.pageIndex = val
    },
    // 添加
    add() {
      this.addDialogVisible = true
      // console.log(this.$refs.childRef.getData)//调用子组件的属性和方法
    },
    // 编辑
    edit(item) {
      console.log(item)
      this.editForm = {
        name: item.name,
        pwd: item.id,
        email: item.email,
        mobile: item.mobile,
      }
      this.editDialogVisible = true
    },
    // 删除
    deleted(item) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!',
          })
          this.getData()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    // 当前状态改变的时候
    swichChange(item) {},
    // 获取数据
    getData() {
      console.log('getData已执行');
      setTimeout(() => {
          this.loading = false;
        }, 2000);
    },
    // 提交校验
    addSubmitForm(formName) {
      this.$refs.addFormRef.validate((valid) => {
        if (valid) {
          this.addDialogVisible = false
          this.getData()
        }
      })
    },
    // 关闭弹窗
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
      this.addDialogVisible = false
    },

    // 提交校验
    editSubmitForm(formName) {
      this.$refs.editFormRef.validate((valid) => {
        if (valid) {
          this.editDialogVisible = false
          this.getData()
        }
      })
    },
    // 关闭弹窗
    editDialogClosed() {
      this.editForm = {
        name: '',
        email: '',
        mobile: '',
        pwd: '',
      }
      this.$refs.editFormRef.resetFields()
      this.editDialogVisible = false
    },
  },
}
</script>
<style scoped>
</style>