<template>
  <div>
    子组件：{{name}}{{page}}lll
    <p v-if="name==1">我显示了</p>
    <p v-else @click="showDialog">隐藏啦</p>
    <button @click="father">显示父组件的属性和方法</button>
    <button @click="setPageIndex">调用父组件的getData 并且传递 pageindex</button>
  </div>
</template>
<script>
export default {
  props: {
    name: String,
    required: true,
    page:Number,
    onShowDialog: {
      type: Function,
      default: null,
    },
    func:{
        type:Function,
        default:null
    }
  },
  data() {
    return {}
  },
  created() {
      this.kkl();
  },
  methods: {
    kkl() {
      console.log(this.name);
      console.log(this.page)
    },
    showDialog() {
      // this.$emit('add','')
      this.onShowDialog(name)
    },
    getData() {
      console.log(111)
    },
    setPageIndex(){
        this.$emit('func',this.page);
    },
    father() {
      console.log(this.$parent.$parent)//获取父组件的方法和属性
    },
  },
}
</script>