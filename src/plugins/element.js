import Vue from 'vue'
import {Button,Message,Form,FormItem,Input,Container,Header,Aside,Main,Menu,MenuItem,Submenu,MenuItemGroup,Breadcrumb,BreadcrumbItem,Card,Switch,Pagination} from 'element-ui'

Vue.use(Button,Message,Form,FormItem,Input,Container,Header,Aside,Main,Menu,MenuItem,Submenu,MenuItemGroup,Breadcrumb,BreadcrumbItem,Card,Switch,Pagination);
Vue.prototype.$message = Message;//message需要挂载到Vue的实例上