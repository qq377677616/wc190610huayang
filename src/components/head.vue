<template>
    <mt-header title="百人团抽奖">
        <mt-button v-if="(buis)" icon="back" slot="left" @click="back()" class="sssss"></mt-button>
        <!-- <mt-button icon="more" slot="right"></mt-button> -->
    </mt-header>
</template> 
<script>
export default {
  props: ['iso',"id","title"],
  data(){
    return{
      buis:true
    }
  },
  mounted(){
    
  },
  methods:{
    back(){
      
      if(this.title == "home"){
        if (navigator.userAgent.match(/ios/ig)) {
          var message = {'method': 'destroyPage', 'parameters': ''};
          window.webkit.messageHandlers.webViewApp.postMessage(message);
				} else if(navigator.userAgent.match(/Android/ig)){
          window.webViewApp.destroyPage(1);
				}
      }else if(this.iso){
        this.$router.go(-1)
        // this.$router.push({name:'details',params:{id:this.id}});
      }else if(this.title == "dateils"){
        if(this.$route.query.id){
        this.$router.push({name:'home'});
        }else{
          this.$router.go(-1);
        }
        // this.$router.push({name:'details',params:{id:this.id}});
      }else if(this.title == "about"){
        this.$router.push({name:'home'});
      }else{
        this.$router.go(-1);//返回上一层
      }
      
    },
  }
}
</script>

<style scoped>
.mint-header{
  background: #9161e8;
  width: 100%;
  position: fixed;
  height: 1rem;
  line-height: 1rem;
  top: 0;
  z-index: 10000000;
}

.mintui-back:before, .mint-header-title{
    font-size: 0.45rem;
  font-weight: bold;
}
</style>
<style>
.mint-button-icon .mintui{
  font-size: 0.4rem
}
.mintui-back:before, .mint-header-title{
    font-size: 0.45rem;
  font-weight: bold;
}
.mint-header>.mint-header-title{
  font-size: 0.3rem;
  font-weight: bold;
}
</style>

