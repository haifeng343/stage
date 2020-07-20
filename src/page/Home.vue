<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header class="header">
      <!-- <img :src="img" alt srcset /> -->
      <span>皮皮大侠客后台管理系统</span>
      <el-button type="info" @click="loginOut">推出</el-button>
    </el-header>
    <!-- 主体区域 -->
    <el-container>
      <!-- 左侧边栏 -->
      <el-aside :width="menuWidth">
          <div class="toggle-button" @click="toggleMenu">|||</div>
        <el-menu background-color="#333744" text-color="#fff" active-text-color="#409EFF" :unique-opened="true" :collapse="collapse" :collapse-transition="false" router :default-active="activePath">
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
            <el-menu-item :index="'/'+item1.path" v-for="item1 in item.children" :key="item1.id" @click="saveNavState('/'+item1.path)">
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
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      img: require('../assets/logo.png'),
      activePath:'',//被激活的链接
      menuList: [
        {
          id: 101,
          autoName: '用户管理',
          path: null,
          children: [
            { id: 201, autoName: '用户列表', path: 'users', children: [] }
          ]
        },
        {
          id: 102,
          autoName: '权限管理',
          path: null,
          children: [
            { id: 202, autoName: '角色列表', path: 'roles', children: [] },
            { id: 302, autoName: '权限列表', path: 'authority', children: [] },
          ]
        },
        {
          id: 104,
          autoName: '商品管理',
          path: null,
          children: [
            { id: 204, autoName: '商品列表', path: 'productLst', children: [] },
            { id: 304, autoName: '分类参数', path: 'sort', children: [] },
            { id: 404, autoName: '商品分类', path: 'productSort', children: [] },
          ]
        },
        {
          id: 105,
          autoName: '订单管理',
          path: null,
          children: [
            { id: 205, autoName: '订单列表', path: 'orderList', children: [] },
            { id: 305, autoName: '订单日志', path: 'orderLog', children: [] },
          ]
        },
        {
          id: 106,
          autoName: '数据统计',
          path: null,
          children: [
            { id: 206, autoName: '数据列表', path: null, children: [] }
          ]
        },
      ],
      icons:{

          '101':'el-icon-s-custom',
          '102':'el-icon-lock',
          '104':'el-icon-s-goods',
          '105':'el-icon-s-order',
          '106':'el-icon-s-platform',
      },
      collapse:false,//默认展开
      menuWidth:'200px',//菜单栏宽度
    }
  },
  created() {
    // this.getmenuList()
    this.activePath = window.sessionStorage.getItem('activePath');
  },
  methods: {
    loginOut() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 切换菜单折叠展开
    toggleMenu(){
        this.collapse = !this.collapse;
        if(this.collapse){
            this.menuWidth = '64px';
        }else{
            this.menuWidth = '200px';
        }
    },
    // 保存链接的激活状态
    saveNavState(activePath){
        window.sessionStorage.setItem('activePath',activePath);
        this.activePath = activePath;
    },
    // 获取所有的菜单
    // async getmenuList() {
    //   const { date: res } = await this.$http.get('/api/getmenulist')
    // }
  }
}
</script>
<style scoped>
.home-container {
  height: 100%;
}
.toggle-button{
    background: #4a5064;
    color: #fff;
    font-size: 10px;
    line-height: 24px;
cursor: pointer;
text-align: center;
letter-spacing: .2em;
}
.el-menu{
    border: none;
}
.el-submenu__title{
    margin-right: 30px;
}
.el-header {
  background: #373d41;
}
.el-aside {
  background: #333744;
}
.el-main {
  background: #efedf1;
}
</style>