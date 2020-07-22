import Vue from 'vue'
import Router from 'vue-router'
import Login from '../page/Login.vue';
import Home from '../page/Home.vue';
import Welcome from '../page/Welcome.vue';
import Users from '../page/user/Users.vue';
import Roles from '../page/role/Roles.vue';

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      redirect:'/welcome',
      children:[
        {
          path:'/welcome',
          component:Welcome
        },
        {
          path:'/users',
          component:Users
        },
        {
          path:'/roles',
          component:Roles
        }
      ]
    }
  ]
})
// 挂载路由守卫
router.beforeEach((to, from, next) => {
  //to将要访问的页面
  //form从哪个页面过来
  //next是一个函数 表示放行 next('/login) 强制跳转
  if (to.path == '/login') return next();
  const token = window.sessionStorage.getItem('token');
  if (!token) return next('/login')
  next();
})

export default router;