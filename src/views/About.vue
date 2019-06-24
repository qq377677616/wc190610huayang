<template>
  <div class="about">
    <heads :title="title"></heads>
    <div class="top">
      <div class="top-portrait">
        <img v-if="avatar" :src="avatar"/>
      </div>
      <p>{{nickname}}</p>
    </div>
    <div class="nav">

      <div class="li" v-for="(item,index) in nav" :class="[currentView1==index?'on':'']" :key="index" @click="tabChange(index)">{{item.title}}</div>
    </div>
    <div class="wrap">
      <div is="child1" v-show="currentView1 == 0"></div>
      <div is="child2" v-show="currentView1 == 1"></div>
      <div is="child3" v-show="currentView1 == 2"></div>
      <!--prize-ja-->
    </div>
    <tabbar :selected="selected" :tabs='tabs'></tabbar>
  </div>
</template>

<script>
// @ is an alias to /src  
import heads from '../components/head.vue'
import tabbar from '../components/tabbar'
import child1 from '../components/mine/child1';
import child2 from '../components/mine/child2';
import child3 from '../components/mine/child3';
import { Indicator } from 'mint-ui';
export default {
  name: 'home',
  data(){
    return{
      currentView1:0,
      selected:"about",
      nickname:"",
      avatar:"",
      title:"about",
      tabs:[require("../assets/home.png"),require("../assets/mine.png")],
      nav:[
        {url:"child1",title:"全部参团",class:"on"},
        {url:"child2",title:"参团中",class:""},
        {url:"child3",title:"我的奖品",class:""}
      ]
    }
  },
  components: {
    heads,
    tabbar,
    child1,
    child2,
    child3
  },
  mounted(){
    Indicator.open(); 
      var time = setInterval(()=>{
        if(localStorage.getItem("ttt")){
          //console.log("测试")    
           Indicator.close(); 
           this.avatar = localStorage.getItem("avatar")
          this.nickname = localStorage.getItem("nickname")
           clearInterval(time); 
           
        }
    },100)

    // this.$nextTick(()=>{
      if(localStorage.getItem("child")){
      //let _index = localStorage.getItem("child");
      //this.tabChange(this.nav[_index].src, _index)
      this.currentView1 = localStorage.getItem("child")
      }
    // })
    
  },
  methods:{
    tabChange(index){
      this.currentView1 = index
      localStorage.setItem("child",index)
    }
  }
}
</script>
<style scoped>
.top{
  height: 2.48rem;
  background: #9161e8;
  text-align: center;
  padding-top: 1rem;
}
.top-portrait{
  display: inline-block;
  width: 1.68rem;
  height: 1.68rem;
  background: #ffff;
  border-radius: 50%;
}
.top-portrait img{
  border-radius: 50%;
  width: 1.68rem;
  height: 1.68rem;
}
.top p{
  font-size: 0.28rem;
  color: #fff;
  line-height: 200%;
}
.wrap{
  padding-bottom: 1.5rem;
}
.nav{
  display: flex;
}
.nav .li{
  flex: 1;
  height: 0.58rem;
  line-height: 0.58rem;
  background: #ffeda3;
  color: #a94d40;
  font-size: 0.28rem;
  text-align: center
}
.nav .li.on{
  background: #fcd73e;
  color: #fc6f37
}


</style>
<style>
.line{
  padding-top: 0.31rem;
}
.line img{
  width: 100%;
}
.prize-ja{
  margin-top: 0.3rem;
  padding: 0.24rem;
  height: 2.28rem;
  background: url('../assets/page5_16.png') no-repeat;
  background-size:100% 100%; 
  display: flex;
  position: relative;
}
.prize-ja .img{
  flex: 0 2.28rem;
  height: 2.28rem;
  background: #fff;
  border-radius: 0.15rem;
}
.prize-ja .img img{
  width: 2.28rem;
  height: 2.28rem;
  border-radius: 0.15rem;
}
.prize-ja .info{
  flex: 1;
  padding-left: 0.3rem;
  padding-top: 0.52rem;
}
.prize-ja .title{
  position: absolute;
  right: -0.1rem;
  top: 0.15rem;
  width: 4.14rem;
  height: 0.75rem;
  background: url('../assets/page5_18.png') no-repeat;
  background-size: 100% 100%;
}
.prize-ja .title h2{
  line-height: 0.51rem;
  font-size: 0.26rem;
  color: #fff;
  padding-left: 0.4rem
}
.da-date{
  padding-top: 0.1rem;
  display: flex;
}
.da-date img{
  flex: 0 1.9rem;
  height: 0.42rem;
}
.da-date .da-date-info{
  flex: 1;
  text-align: right;
  padding-right: 0.1rem;
}
.da-date .da-date-info span{
  font-size: 0.4rem;
  color: #fc6f37;
  line-height: 0.42rem
}
.fil{
  padding-top: 0.4rem;
  text-align: center;
}
.img.soso_imghui{
  -webkit-filter:grayscale(1);
  -moz-filter: grayscale(1);    /* 其他内核现在并不支持，为了将来兼容性书写 */
  -ms-filter: grayscale(1);
  -o-filter: grayscale(1);
  filter: grayscale(1);
}
.fil img{
  display: inline-block;
  height: 0.27rem;
}
.fil .class1{
  width: 2.47rem;
}
.fil .class2{
  width: 3.34rem;
}
.fil .class3{
  width: 2.4rem;
}
.prize-ja.on{
  background: url('../assets/page5_17.png') no-repeat;
  background-size:100% 100%; 
}
.da-dbtn{
  padding-top: 0.6rem;
  text-align: right;
}
.da-dbtn img{
  width: 2.47rem;
  height: 0.62rem;
}
.info-dis1{
  padding-bottom: 0.1rem
}

.info-dis1 .li{
  padding: 0.08rem 0 0.1rem 0.32rem;
  line-height: 0.28rem;
  height: 0.28rem;
  position: relative;
}
.info-dis1 .li i{
  left: 0;
  position: absolute;
  display: inline;
  width: 0.28rem;
  height: 0.28rem;
  font-size: 0.2rem;
}
.info-dis1 .li span{
  color: #fc6f37;
}
.info-dis1 .li:nth-child(1) i{
  background: url("../assets/page1_11.png") no-repeat;
  background-size: 100%;
}
.info-dis1 .li:nth-child(2) i{
  background: url("../assets/page1_13.png") no-repeat;
  background-size: 100%;
}
.info-dis1.on .li:nth-child(1) i{
  background: url("../assets/page1_111.png") no-repeat;
  background-size: 100%;
}
.info-dis1.on .li:nth-child(2) i{
  background: url("../assets/page1_133.png") no-repeat;
  background-size: 100%;
}
.info-dis1.on .li span{
  color: #333;
}
.prize-ja.on .title{
      position: absolute;
    right: -0.1rem;
    top: 0.15rem;
    width: 4.14rem;
    height: 0.75rem;
  background: url('../assets/page5_1811.png') no-repeat;
  background-size: 100% 100%;
}
/* .info-dis1 .li:nth-child(2){
    line-height: 0.28rem;
  height: 0.28rem;
}
.info-dis1 .li:nth-child(2) i{
  background: url("../assets/page1_12.png") no-repeat;
  background-size: 100%;
} */
</style>

