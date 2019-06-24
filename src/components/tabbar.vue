<template>
  <mt-tabbar v-model="message" fixed>
    <mt-tab-item id="home">
      <img slot="icon" :src="this.atabs[0]">
      主页
    </mt-tab-item>
    <mt-tab-item id="about">
      <img slot="icon" v-bind:src="this.atabs[1]">
      我的
    </mt-tab-item>
  </mt-tabbar>
</template>
 
 
<script>
export default {
    data(){
        return{
        //选中的tabbar值message为外面页面传入的值selected
        message:this.selected,
        //这里使用的icon图标为图片，所以需要加图片改变的传入，若使用阿里图标，则不用加
        atabs:this.tabs,
      }
    },
    props:{
      selected: String,
      tabs:Array,
    },
    watch: {
      message: function (val, oldVal) {
        console.log(oldVal)
      // 这里就可以通过 val 的值变更来确定去向
      switch(val){
        case 'home':
          console.log(val)
          this.$router.push('/');
        break;
        case 'about':
          console.log(val)
          this.$router.push('/about');
        break;
      }
    }
  },
}
</script>
