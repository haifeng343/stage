<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header class="header">
      <!-- <img :src="img" alt srcset /> -->
      <span class="title">后台管理系统</span>
      <div class="header-right">
        <el-menu
          :collapse-transition="true"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#fff"
          mode="horizontal"
        >
          <el-submenu index="1">
            <template slot="title" style="background:#333744">
              <img class="avator" src="../assets/img/avator.png" alt />
            </template>
            <el-menu-item @click="editUserInfo" index="1-1">修改个人资料</el-menu-item>
            <el-menu-item @click="showPwd" index="1-2">修改密码</el-menu-item>
            <el-menu-item @click="loginOut" index="1-3">退出</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
      <!-- 修改密码弹出框 -->
      <el-dialog
        title="修改密码"
        :visible.sync="editPtdDialogVisible"
        width="50%"
        :before-close="closed"
      >
        <el-form :model="pwdForm" :rules="pwdRules" ref="pwdForm" label-width="100px">
          <el-form-item label="修改密码" prop="pwd">
            <el-input v-model="pwdForm.pwd"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="closed">取 消</el-button>
          <el-button type="primary" @click="editPwd">确 定</el-button>
        </span>
      </el-dialog>
      <!-- <el-button type="info" @click="loginOut">推出</el-button> -->
    </el-header>
    <!-- 主体区域 -->
    <el-container>
      <!-- 左侧边栏 -->
      <el-aside :width="menuWidth">
        <div class="toggle-button" @click="toggleMenu">
          <i class="el-icon-s-fold ft22" v-if="menuWidth=='200px'"></i>
          <i class="el-icon-s-unfold ft22" v-else></i>
        </div>
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          :unique-opened="true"
          :collapse="collapse"
          :collapse-transition="false"
          router
          :default-active="activePath"
        >
          <!-- 一级菜单 -->
          <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="icons[item.id]"></i>
              <!-- 文本 -->
              <span>{{item.autoName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/'+item1.path"
              v-for="item1 in item.children"
              :key="item1.id"
              @click="saveNavState('/'+item1.path)"
            >
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{item1.autoName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧主体 -->
      <el-main>
        <transition name="el-zoom-in-center">
          <router-view></router-view>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      activePath: '', //被激活的链接
      editPtdDialogVisible: false, //修改密码弹出框
      pwdForm: {
        //密码修改
        pwd: '',
      },
      pwdRules: {
        pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 8, message: '长度在 6 到 8 个字符', trigger: 'blur' },
        ],
      },
      menuList: [
        {
          id: 101,
          autoName: '用户管理',
          path: null,
          children: [
            { id: 201, autoName: '用户列表', path: 'users', children: [] },
          ],
        },
        {
          id: 102,
          autoName: '权限管理',
          path: null,
          children: [
            { id: 202, autoName: '角色列表', path: 'roles', children: [] },
            { id: 302, autoName: '权限列表', path: 'authority', children: [] },
          ],
        },
        {
          id: 104,
          autoName: '商品管理',
          path: null,
          children: [
            { id: 204, autoName: '商品列表', path: 'productLst', children: [] },
            { id: 304, autoName: '分类参数', path: 'sort', children: [] },
            {
              id: 404,
              autoName: '商品分类',
              path: 'productSort',
              children: [],
            },
          ],
        },
        {
          id: 105,
          autoName: '订单管理',
          path: null,
          children: [
            { id: 205, autoName: '订单列表', path: 'orderList', children: [] },
            { id: 305, autoName: '订单日志', path: 'orderLog', children: [] },
          ],
        },
        {
          id: 106,
          autoName: '数据统计',
          path: null,
          children: [
            { id: 206, autoName: '数据列表', path: null, children: [] },
          ],
        },
      ],
      icons: {
        '101': 'el-icon-s-custom',
        '102': 'el-icon-lock',
        '104': 'el-icon-s-goods',
        '105': 'el-icon-s-order',
        '106': 'el-icon-s-platform',
      },
      collapse: false, //默认展开
      menuWidth: '200px', //菜单栏宽度
    }
  },
  created() {
    // this.getmenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    // 退出登录
    loginOut() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 切换菜单折叠展开
    toggleMenu() {
      this.collapse = !this.collapse
      if (this.collapse) {
        this.menuWidth = '64px'
      } else {
        this.menuWidth = '200px'
      }
    },
    // 保存链接的激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    },
    // 获取所有的菜单
    // async getmenuList() {
    //   const { date: res } = await this.$http.get('/api/getmenulist')
    // },
    // 显示密码弹窗框
    showPwd() {
      this.editPtdDialogVisible = true
    },
    // 关闭密码修改弹出框
    closed() {
      this.editPtdDialogVisible = false
      this.$refs.pwdForm.resetFields()
    },
    // 修改密码
    editPwd() {
      this.editPtdDialogVisible = false
      this.$refs.pwdForm.resetFields()
    },
    editUserInfo() {
      this.$router.push('/userinfo')
    },
  },
}
</script>
<style scoped>
.home-container {
  height: 100%;
}
.toggle-button {
  background: #4a5064;
  color: #fff;
  padding: 10px 0;
  cursor: pointer;
  text-align: center;
  letter-spacing: 0.2em;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ft22 {
  font-size: 20px;
}
.el-menu {
  border: none;
}
.el-submenu__title {
  margin-right: 30px;
}
.el-header {
  background: #373d41;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header-right {
  margin-right: 0px;
}
.el-submenu {
  background: #373d41;
}
.header-right .el-submenu .el-submenu .el-menu-item {
  text-align: center;
}
.avator {
  width: 40px;
  height: 40px;
  border-radius: 100%;
}
.title {
  font-size: 22px;
  color: #fff;
  /* -webkit-line-clamp: 2;    
      background-image: -webkit-linear-gradient(bottom, #ffb6ad, #50403a);
     -webkit-background-clip: text;
     -webkit-text-fill-color: transparent; */
}
.el-aside {
  background: #333744;
}
.el-main {
  background: #efedf1;
}
</style>