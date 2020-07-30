import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: ()=>import('../page/Login.vue'),
      name:'login',
    },
    {
      path: '/home',
      component: ()=>import('../page/Home.vue'),
      name:'home',
      redirect:'/welcome',
      children:[
        {
          path:'/welcome',
          component:()=>import('../page/Welcome.vue'),
          name:'welcome'
        },
        {
          path:'/users',
          component:()=>import('../page/user/Users.vue'),
          name:'users',
        },{
          path:'/userinfo',
          component:()=>import('../page/user/userinfo.vue'),
          name:'userinfo'
        },{
          path:'/roles',
          component:()=>import('../page/role/Roles.vue'),
          name:'roles',
        },{
          path:'/authority',
          component:()=>import('../page/role/Authority.vue'),
          name:'authority'
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