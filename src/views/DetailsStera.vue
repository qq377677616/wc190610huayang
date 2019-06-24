<template>
<div class="details">
  <!-- <heads></heads> -->
  <div class="wrap">
    <div class="inve-date">
      <div class="img">
        <img src="../assets/page2_9.png">
      </div>
      <div class="inve-date-l">
        <div class="inve-date-li">{{dateobj.day}}</div>
        <p> 天 </p>
        <div class="inve-date-li">{{dateobj.hou}}</div>
        <p> 时 </p>
        <div class="inve-date-li">{{dateobj.min}}</div>
        <p> 分 </p>
      </div>
    </div>
    <!--inve-date-->
    <div class="prize">
      <div class="img">
        <img :src="ils.goods.cover"/>
        <div class="title">
          <h2>{{ils.goods.name}}</h2>
        </div>
        <div class="so-price">
          <div class="info-dis">
            <div class="li">
                <i></i>价格:<span>{{ils.goods.amt/100}}</span>元
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="rule-wrap">
      <img src="../assets/page3_6.png"/>
    </div>
    <div class="ral-s">
      <div class="title">
        <img src="../assets/art_x.png">
      </div>
      <div class="wrap" v-html="details">
        {{details}}
      </div>
    </div>
    <div id="apptoolbar" class="apptoolbar">
      <div class="apptoolbar-content">
        <p class="apptoolbar-icon"></p>
        <p class="apptoolbar-text"><span>花漾搜索</span><span>为青少年而生</span></p>
        <p class="apptoolbar-btn" @click="clicknav"><a :href="href">打开</a></p>
      </div>
      <div class="wechat-tips" v-if="isno" ><img src="../assets/page5_18112.png" alt=""></div>
    </div>
  </div>
</div>
</template>
<script>
//setInterval
import heads from '../components/head.vue'
import tabbar from '../components/tabbar.vue'
import {minutesAndSeconds,getUrlParameter} from '../assets/js/util'
export default {
  data(){
    return{
      ils:{goods:{cover:''}},                              //接收详情页数据
      dateobj:{day:0,hou:0,min:0},         //倒计时
      isno:false,
      details:"",
      usid:"",
      href:"javascrit:;"
    }
  },
  components: {
    heads,
    tabbar
  },
  mounted(){
    // console.log(window.webkit.messageHandlers.webViewApp)
    // console.log("url",window.location.href)  Chrome
    if(getvl("id")){
      this.usid = getvl("id")
    }
    console.log(getvl("id"))
    this.init()
    var ua = navigator.userAgent
    var isQQ = ua.indexOf("MQQBrowser") < 0 && ua.indexOf("QQ") > -1;
    if(ua.match(/MicroMessenger/i)!="MicroMessenger" && ua.match(/WeiBo/i)!="WeiBo" && !isQQ){
      this.href = "chinasoyoung://domain.com/partner?"+encodeURIComponent("https://young.chinaso.com/young/v1/ygames/gl/glhtml/#/details?id="+this.usid);
      console.log(this.href)
    }
  },
  methods:{
    //数据初始化
    init(){
      this.$post("/goods/getDetails2",{goodsId:this.usid})
      .then(res=>{
        if(res.code == "0000"){
          this.ils = res.result
          this.details = res.result.goods.details
          if(res.result.goods.expireTime>0){
            this.countdown(res.result.goods.expireTime)
          }
          console.log(res.result)
        }else{
          this.$toast(res.message)
        }
        
      })
    },
    //clickinit
    clickinit(){
      this.init()
    },
    clicknav(){
        console.log(navigator.userAgent)
      var ua = navigator.userAgent
      var isQQ = ua.indexOf("MQQBrowser") < 0 && ua.indexOf("QQ") > -1;
      if(ua.match(/MicroMessenger/i)!="MicroMessenger" && ua.match(/weibo/i)!="Weibo" && !isQQ){

        this.isno = false
        console.log(this.isno)
        //window.location.href = "http://t.cn/E6OOfyY"
        console.log(encodeURIComponent("https://young.chinaso.com/young/v1/ygames/gl/glhtml/#/details?id="+this.usid))
        setTimeout(()=>{
          window.location.href = "http://t.cn/E6OOfyY"
        },2200)
        
      }else{
        this.isno = true
        console.log(this.isno)
        // console.log(encodeURIComponent("https://dev.flyh6.cn/young/v1/ygames/gl/glhtml/#/details?id=1"))
        // window.location.href = "chinasoyoung://domain.com/partner?url="+encodeURIComponent("https://dev.flyh6.cn/young/v1/ygames/gl/glhtml/#/details?id=1");
      }
    },
    //倒计时
    countdown (time) {
      //sec =sec- 60
      var that = this
      let day = parseInt(time / (60 * 60 * 24));
      let hou = parseInt(time % (60 * 60 * 24) / 3600);
      let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
      that.dateobj.day = day
      that.dateobj.hou = hou
      that.dateobj.min = min
      let sets=setInterval(function(){
        if(time>0){
          time = time - 60
          day = parseInt(time / (60 * 60 * 24));
          hou = parseInt(time % (60 * 60 * 24) / 3600);
          min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
          that.dateobj.day = day
          that.dateobj.hou = hou
          that.dateobj.min = min
        }else{
          clearInterval(sets);
        }
      },60000)
    },
  }
  
}
function getvl(name) {

　　var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i");

　　if (reg.test(location.href))

　　return unescape(RegExp.$2.replace(/\+/g, " "));

　　return "";

};
</script>

<style scoped>
.wrap{
  padding-top: 0.2rem
}
.inve-date{
  padding: 0.2rem 0;
  text-align: center;
}
.inve-date .img{
  width: 2.1rem;
  height: 0.5rem;
  display: inline-block;
  padding-bottom: 0.1rem;
}
.inve-date .img img{
  width: 2.1rem;
  height: 0.5rem;
}
.inve-date-l{
  display: flex;
  justify-content:center;
}
.inve-date-l .inve-date-li{
  width: 0.7rem;
  height: 0.7rem;
  line-height: 0.7rem;
  text-align: center;
  background: #fcd73e;
  font-size: 0.5rem;
  font-weight: bold;
  color: #fc6f37;
  border:0.03rem solid #fc6f37;
  border-radius: 0.15rem;
}
.inve-date-l p{
  color: #646464;
  font-size: 0.22rem;
  padding: 0.4rem 0.1rem 0 0.1rem;
}
.title-k{
  text-align: center;
  padding-bottom: 0.4rem;
}
.title-k .title-class1{
 width: 3.99rem;
 height: 0.8rem;
}
.title-k .title-class2{
 width: 2rem;
 height: 0.4rem;
}
.title-k .title-class3{
 width: 2.65rem;
 height: 0.73rem;
}
.title-k .title-class4{
 width: 4.13rem;
 height: 0.86rem;
}
.title-k .title-class5{
 width: 5.21rem;
 height: 0.88rem;
}
.dli-list{
  display: flex;
}
.dli-list .dli-list-li{
  width: 0.5rem;
  height: 0.5rem;
  background: #fcd73e;
  margin: 0.06rem;
}
.dli-list .dli-list-li:last-child{
background: url("../assets/page2_17.png") no-repeat;
  background-size: 100%;
}
.dli-list .dli-list-li img{
  width: 0.5rem;
  height: 0.5rem;
  display: block;
}
.list-p{
  text-align: center;
  line-height: 0.48rem;
  font-size: 0.22rem;
  color: #a94d40;
}
.share-btn{
  padding: 0.1rem;
  text-align: center;
}
.share-btn img{
  width: 3.99rem;
  height: 0.8rem;
}
.rule-wrap img{
  width: 100%;
}
.winning-prize{
    text-align: center;
    padding: 0.1rem;
}
.winning-prize>img{
    display: inline-block;
    width: 1.66rem;
    height: 0.24rem;
}
.img1{
    margin: auto;
    width: 1.65rem;
    height: 1.65rem;
    background: #fcd73e;
    border-radius: 50%;
}
.img1>img{
    width: 1.65rem;
    height: 1.65rem;
    display: block;
    border-radius: 50%;
}
.ral-s{
  padding-top: 0.3rem;
}
.ral-s>>>img{
  width: 100% !important;
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
  .share{
    position: absolute;
    bottom: 0.25rem;
    left: 0.25rem;
    right: 0.25rem;
    background: #fff;
    min-height: 1rem;
    border-radius: 0.2rem
  }
  .list{
    padding: 0.1rem;
    display: flex;
    flex-wrap: wrap
  }
   .list .li{
     flex: 0 25%;
     text-align: center;
     padding: 0.3rem 0;
   }
   .list .li img{
     width: 1rem;
     height: 1rem;
   }
  .share .btnsss{
    margin: auto;
    margin-bottom: 0.4rem;
    width: 6rem;
    height: 0.8rem;
    border-radius: 0.2rem;
    background: #eee;
    font-size: 0.3rem;
    color: #000;
    text-align: center;
    line-height: 0.8rem
  }
  .apptoolbar{
      position: fixed;
      top: auto;
      bottom: 20px;
      left: 0;
      width: 100%;
      z-index: 9999999;
  }
  .apptoolbar-content{
      height: 48px;
      margin: 0 .3rem;
      display: flex;
      display: -webkit-flex;
      padding: .266667rem;
      background-color: #ececee;
      border-radius: .266667rem;
      position: relative;
  }
  .apptoolbar-content .apptoolbar-icon{
    width: 48px;
    height: 48px;
    background: url("../assets/logo.png") no-repeat 50%;
    background-size: cover;
    margin-right: .266667rem;
  }
  .apptoolbar-content .apptoolbar-text {
    flex: 1;
    float: left;
  }
  .apptoolbar-content .apptoolbar-text span {
    font-size: 16px;
    display: block;
  }
   .apptoolbar-content .apptoolbar-text span:first-child {
    margin-top: 3px;
  }
  .apptoolbar-content .apptoolbar-text span:last-child {
    font-size: 12px;
    margin-top: 3px;
    color: #666;
  }
  .apptoolbar-content .apptoolbar-btn {
    width: 1.4rem;
    height: 100%;
    position: relative;
    margin-left: .266667rem;
  }
  .apptoolbar-content .apptoolbar-btn a {
    font-size: 14px;
    position: absolute;
    top: 50%;
    left: 0;
    margin-top: -.333333rem;
    display: inline-block;
    width: 100%;
    height: .666667rem;
    line-height: .666667rem;
    border-radius: .333333rem;
    text-align: center;
    background: #72727f;
    color: #fff;
  }
  .wechat-tips {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-align: right;
    background: rgba(0,0,0,.7);
    z-index: 999999999;
    display: block;
  }
  .wechat-tips img {
    width: 7.533333rem;
    height: 4.2rem;
  }
</style>

