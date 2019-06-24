<template>
  <div class="home">
    <heads :title="title"></heads>
    <div class="home-top"></div>
    <div class="wrap">
      <div class="prize" v-for="(item,index) in list" :key="index" @click="clcikUrl(item.goodsId)">
        <div class="img">
          <img :src="item.cover"/>
          <div class="title">
            <h2>{{item.name}}</h2>
          </div>
        </div>
        <div class="info">
          <div class="info-dis">
            <div class="li">
              <i></i>价格：<span>{{item.amt/100}}</span> 元
            </div>
            <div class="li">
              <i></i>需要开团人数：<span>{{item.person}}</span>人
            </div>
            <div class="li">
              <i></i>参团截止日期<span>{{item.lotteryTime}}</span>
              <!-- <i></i><span>2019</span>年<span>05</span>月<span>25</span>日<span>00:00</span>自动开奖 -->
            </div>
          </div>
          <div class="count" v-if="(item.status!=2)">
            <div class="imgs tada"><img src="../assets/page1_14.png"></div>
            <div class="date">
              <span>{{item.soday.day}}</span>天<span>{{item.soday.hou}}</span>小时<span>{{item.soday.min}}</span>分
            </div>
          </div>
          <div class="isimgs" v-if="(item.status==2)">
            <img src="../assets/page1_177.png"/>
          </div>
        </div>
      </div>
      <!--prize-->
        <div class="model flex-cen" v-if="istrue">
      <div class="model-box two" v-if="one">
        <div class="close" @click="close()"></div>
        <h3>恭喜您获得</h3>
        <h4>{{ils.goods.name}}</h4>
        <p>赶紧去填写信息领取奖品吧！</p>
        <div class="btn" @click="countdown1()">填写信息</div>
      </div>
      <div class="model-box four" v-if="two">
        <div class="close" @click="close()"></div>
        <dl>
          <dd><input type="text" placeholder="输入姓名" v-model="newName"/></dd>
          <dd><input type="text" placeholder="输入手机号" v-model="newPhone" maxlength="11" /></dd>
          <dd><textarea placeholder="输入地址" v-model="newtext" v-on:change="checkPrice()" :class="ison?'':'on'"></textarea></dd>
        </dl>
        <div class="btn" @click="formbtn()">提交</div>
      </div>
    </div>

    </div>
    <tabbar :selected="selected" :tabs='tabs'></tabbar>
  </div>
</template>

<script>
// @ is an alias to /src
import heads from '../components/head.vue'
import tabbar from '../components/tabbar.vue'
import {getUrlParameter} from '../assets/js/util'
import { Indicator } from 'mint-ui';
export default {
  name: 'home',
  data(){
    return{
      istrue:false,       //弹窗
      one:false,
      two:false,
      title:"home",
      selected:"home",
      tabs:[require("../assets/home.png"),require("../assets/mine.png")],
      list:[],
      dateobj:{
        day:0,
        hou:0,
        min:0
      }
    }
  },
  components: {
    heads,
    tabbar
  },
  mounted(){
    // console.log("时间",24*60*60*7)
    // console.log("时间",24*60*60*6)
    var sevenday = 24*60*60*7
    var sixday = 24*60*60*6
    var _this = this
    
    console.log("url",window.location.href)

    // this.getBaseUrl()
    Indicator.open()
        this.$post("/goods/getPage",{page:1,limit:200})
    .then(res=>{
      console.log("res2--->", res)
      Indicator.close();
      if(res.code == "0000"){
        this.list=res.result.list
        
          for(let i=0; i<this.list.length; i++){
            this.list[i].soday = {}
            this.list[i].soday = this.countdown(this.list[i].expireTime)
          }
          console.log(this.list)
       
      }else{
        this.$toast(res.message)
      }
    })
    setInterval(()=>{
    this.$post("/goods/getPage",{page:1,limit:200})
    .then(res=>{
      console.log("res2--->", res)
      Indicator.close();
      if(res.code == "0000"){
        this.list=res.result.list
        
          for(let i=0; i<this.list.length; i++){
            this.list[i].soday = {}
            this.list[i].soday = this.countdown(this.list[i].expireTime)
          }
          console.log(this.list)
       
      }else{
        this.$toast(res.message)
      }
    })
     },60000)
  },
  methods:{
    close(){
      this.istrue = false;
      this.one = false;
      this.two = false;
    },
    clcikUrl(ids){
      this.$router.push({name:'details',params:{id:ids}});
    },
    checkPrice(val){
      console.log("s")
    },
    //弹框填写资料
    countdown1(){
      this.one = false
      this.two = true
    },
    //留资
    formbtn(){
      if(!this.orderId){
        this.$toast("orderId不能为空")
        return;
      }
      if(!this.newPhone){
        this.$toast("手机号不能为空")
        return;
      }
      if(!this.newName){
        this.$toast("姓名不能为空")
        return;
      }
      if(!this.newtext){
        this.$toast("地址不能为空")
        return;
      }
      this.$post('/goods/deliveryAddress',{orderId:this.orderId,ttt:localStorage.getItem("ttt"),name:this.newName,phone:this.newPhone,address:this.newtext})
      .then(res=>{
        if(res.code == "0000"){
          this.clickUrl("home")
        }else{
          this.$toast(res.message)
        }
        console.log(res)
      })
    },
    //倒计时
    countdown (time) {
      //sec =sec- 60

      var dateobj = {}
      if(time>0){
      let day = parseInt(time / (60 * 60 * 24));
      let hou = parseInt(time % (60 * 60 * 24) / 3600);
      let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
      dateobj={day:day,hou:hou,min:min}
      }else{
        dateobj={day:0,hou:0,min:0}
      }
      
      return dateobj;
    },
    getBaseUrl () {
    //protocol 属性是一个可读可写的字符串，可设置或返回当前 URL 的协议,所有主要浏览器都支持 protocol 属性
        var ishttps = 'https:' == document.location.protocol ? true: false;
        var url = window.location.host;
          if(ishttps){
            url = 'https://' + url;
       }else{
            url = 'http://' + url;
       }
      return url;
    }
  }
}
</script>
<style scoped>
.mint-tabbar{
  background: #fff
}
.home-top{
  width: 100%;
  height: 4.4rem;
  background: url("../assets/page1_2.png") no-repeat;
  background-size: 100% 100%;
  margin-bottom: 0.2rem;
  margin-top: 1rem;
}
</style>
<style>
.prize{
  min-height: 4rem;
  padding: 0.22rem 0.2rem;
  background: url("../assets/page2_2.png") no-repeat;
  background-size: 100% 100%;
  margin-bottom: 0.5rem;
}
.prize .img{
  height: 3.5rem;
  background: #fff;
  border-radius:0.15rem;
  position: relative;
}
.prize .img img{
  width: 100%;
  height: 100%;
  border-radius:0.15rem;
  display: block;
}
.prize .img .title{
  position: absolute;
  bottom: -0.56rem;
  width: 5.08rem;
  left: -0.3rem;
  height: 0.85rem;
  background: url("../assets/page2_4.png") no-repeat;
  background-size: cover;
}
.prize .img .title h2{
  font-size: 0.3rem;
  color: #fff;
  line-height: 0.6rem;
  padding-left: 0.4rem;
}
.prize .info{
  display: flex;
  padding-top: 0.4rem;
  padding: 0.4rem 0.1rem 0 0.1rem;
}
.prize .info .info-dis{
  flex: 1;
}
.info-dis .li{
  padding: 0.07rem 0 0.07rem 0.32rem;
  line-height: 0.28rem;
  height: 0.28rem;
  position: relative;
}
.info-dis .li i{
  left: 0;
  position: absolute;
  display: inline;
  width: 0.28rem;
  height: 0.28rem;
  font-size: 0.2rem;
}
.info-dis .li span{
  color: #fc6f37;
}
.info-dis .li:nth-child(1) i{
  background: url("../assets/page1_11.png") no-repeat;
  background-size: 100%;
}
.info-dis .li:nth-child(2) i{
  background: url("../assets/page1_13.png") no-repeat;
  background-size: 100%;
}
.info-dis .li:nth-child(3) i{
  background: url("../assets/page1_12.png") no-repeat;
  background-size: 100%;
}
.count{
  padding-top: 0.06rem;
  text-align: center;
}
.count .imgs{
  width: 1.82rem;
  height: 0.5rem;
}
.count .imgs img{
  width: 1.82rem;
  height: 0.5rem;
}
.count .date{
  padding-top: 0.12rem;
  font-size:0.2rem;
  color: #646464;
}
.count .date span{
  font-size: 0.36rem;
  color: #fc6f37;
  font-weight: bold;
}
.so-price{
  position: absolute;
  bottom: -0.45rem;
  right: -0.02rem;
}
.tada {

  animation: tada 2S infinite;
}
.isimgs{
  width: 2rem;
  height: 0.72rem;
  padding-top: 0.25rem
}
.isimgs img{
  display: block;
  width: 2rem;
  height: 0.72rem;
}
.flex-cen{display: flex;justify-content: center;align-items: center; z-index: 1000;}
.model{position: fixed;width: 100%;height: 100%;background: rgba(0,0,0,.6);left:0;top:0;}
.model .model-box{width:6rem;height:6.06rem;background: url(../assets/model_01.png) no-repeat center;background-size: cover;position: relative;color:#A94D40;text-align: center;}
.model .model-box h3{font-size:.46rem;line-height: 1.5;padding-top: 2.6rem;font-weight: bold;color:#A94D40;}
.model .model-box .btn{width:3.24rem;height:.8rem;line-height: .8rem;font-size: .4rem;color:#fff;font-weight: bold;margin:.8rem auto 0;background: url(../assets/btn_01.png) no-repeat center;background-size: cover;}
.model .model-box .close{width:.66rem;height:.66rem;line-height: .66rem;background: url(../assets/icon_close.png) no-repeat center;background-size: cover;position: absolute;right:.5rem;top:1rem;}
.model .model-box h4{font-size: .3rem;margin: .4rem 0 .8rem;font-weight: bold;}
.model .model-box p{font-size: .32rem;font-weight: bold;}
.model .model-box.two{height:7.16rem;background-image: url(../assets/model_02.png);}
.model .model-box.two h3{padding-top: 2.4rem;}
.model .model-box.two .btn{margin-top: .6rem;}
.model .model-box.three{height:8.35rem;background-image: url(../assets/model_03.png);}
.model .model-box .btns{background-image: url(../assets/btn_02.png);}
.model .model-box.three h3{font-size:.28rem;line-height: 1.2;font-weight: normal;padding-top: 3.88rem;}
.model .model-box.three h4{font-size: .3rem;color:#fff;margin-top: 0.64rem;font-weight: normal;}
.model .model-box.three h4{margin-bottom: .4rem;}
.model .model-box.three .btn{margin-top: 0;}
.model .model-box.three .btns{margin-top: 0.2rem;}
.model .model-box.four{height:9.13rem;background-image: url(../assets/model_04.png);}
.model .model-box dl{width:80%;margin:3rem auto 0;}
.model .model-box dd{border:.03rem solid #A94D40;background: #FFEDA3;position: relative;margin-bottom: .24rem;;}
.model .model-box dd input{width: 100%;height: .77rem;font-size: .32rem;text-align: center;}
.model .model-box dd input,.model .model-box dd input::-webkit-input-placeholder,.model .model-box dd textarea::-webkit-input-placeholder{color:#A94D40;}
.model .model-box dd textarea{height:1.92rem;font-size: .32rem;width: 100%;text-align: center;} 
.model .model-box dd textarea.on{line-height: 1.92rem;} 
.model .model-box.four .btn{margin-top: .4rem;}
@keyframes tada {
  from {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }

  10%,
  20% {
    -webkit-transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
    transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
  }

  30%,
  50%,
  70%,
  90% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
  }

  40%,
  60%,
  80% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
  }

  to {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}
</style>


