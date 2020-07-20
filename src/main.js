// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';
import axios from 'axios';
import less from 'less'
import './assets/css/global.css';
Vue.use(less)


Vue.use(ElementUI)

// 指定请求地址
axios.defaults.baseURL = 'https://api.ybrshop.com';
// 拦截器,保证拥有获取数据的权限
axios.interceptors.request.use(config=>{
  config.headers.Authorization = window.sessionStorage.getItem('token');
  return config
})
// 封装全局axios
Vue.prototype.$http = axios;

Vue.config.produLKKxctionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
