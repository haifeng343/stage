<template>
  <div>
    roles
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [
        { key: 1, color: '#ffebcc' },
        { key: 2, color: '#ffb86c' },
        { key: 3, color: '#f01b2d' }
      ],
      dragging: null
    }
  },
  methods: {
   
  }
}
</script>
<style scoped>
.container{
    width: 80px;
    height: 300px;
    position: absolute;
    left: 0;
    display:flex;
    flex-direction: column;
    padding: 0;
  }
  .item {
   margin-top: 10px;
   transition: all linear .3s
  }
</style>