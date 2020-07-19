import Vue from 'vue'
import {Button,Message,Form,FormItem,Input} from 'element-ui'

Vue.use(Button,Message,Form,FormItem,Input);
Vue.prototype.$message = Message;//message需要挂载到Vue的实例上