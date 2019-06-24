<template>
<div class="participate">
  <heads :iso="is" :id="id"></heads>
  <div class="top">
    已有{{numlength}}位参与者
  </div>
  <div class="wrap">
    <div class="list">
      <div class="li" v-for="(item,index) in list" :key="index">
          <img :src="item.avatar">
      </div>
    </div>
    <div class="more-btn" @click="clpost(i)" v-if="(list.length>=80)">
      <img v-if="sosois" src="../assets/page8_2.png" />
    </div>
  </div>
  <tabbar :selected="selected" :tabs='tabs'></tabbar>
</div>
</template>
<script>
import heads from '../components/head.vue'
import tabbar from '../components/tabbar.vue'
import {minutesAndSeconds,getUrlParameter} from '../assets/js/util'
export default {
  data(){
    return{
      is:true,
      selected:"home",
      id:0,
      tabs:[require("../assets/home.png"),require("../assets/mine.png")],
      list:[
      ],
      numlength:0,
      i:0,
      sosois:true
    }
  },
  mounted(){
    console.log(this.$route.params.id)
    this.id = this.$route.params.id
    this.clpost(this.i)
  },
  methods:{
    clickUrl(){
      this.$router.push({name:'details',params:{id:this.$route.params.id}});
    },
    clpost(i){
      console.log(i)
      i=i+1
      this.i = i
      this.$post('/goods/getGoodsOrderList',{page:i,limit:80,ttt:localStorage.getItem("ttt"),goodsId:this.$route.params.id})
      .then(res=>{
          if(res.code == "0000"){
            // this.list = res.result.list
            if(res.result.list.length>0){
              for(var i=0; i<res.result.list.length; i++){
                this.list.push(res.result.list[i])
              }
            }else{
              this.sosois =false
            }
            this.numlength = res.result.total
            console.log(res.result.total)
          }
      })
    }
  },
  components: {
    heads,
    tabbar
  }, 
}
</script>
<style scoped>
.wrap{
  padding: 0 0.33rem;
  padding-top: .1rem;
  text-align:center;
}
.top{
  height: 0.58rem;
  background: #ffeda3;
  color: #a94d40;
  text-align: center;
  line-height: 0.58rem;
  font-size: 0.28rem;
  padding-top: 1rem;
}
.list{
  padding: 0.25rem 0;
  display: flex;
  flex-flow:row wrap;
}
.list .li{
  width: 0.72rem;
  height: 0.72rem;
  background: #fcd73e;
  margin: 0.06rem;
}
.list .li img{
  width: 0.72rem;
  height: 0.72rem;
  display: block;
}
.more-btn{
    padding: 0.35rem 0 1.2rem 0;
    text-align: center;
}
.more-btn img{
    display: inline-block;
    width: 3.99rem;
    height: 0.8rem;
}
</style>
