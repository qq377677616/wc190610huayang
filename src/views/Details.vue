<template>
<div class="details">
  <heads :title="title"></heads>
  <div class="wrap">
    <div class="inve-date" v-if="(status==1)">
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
    <!--prize v-if="(status==2)"-->
    <div class="title-k" v-if="(status==1 && !isBuy)">
      <img class="title-class1" @click="delegation" src="../assets/page2_10.png"/>
    </div>
    <div class="title-k" v-if="(status==1 && isBuy)">
      <img class="title-class2" src="../assets/page2_11.png"/>
    </div>
    <div class="title-k" v-if="(status==2)">
      <img class="title-class3" src="../assets/page2_12.png"/>
      <div class="ding" @click="clickUrl('home')"></div>
    </div>
    <div class="title-k" v-if="(status==4 && isLottery==true)">
      <img class="title-class6" src="../assets/page8_22222.png"/>
    </div>
    <div class="title-k" v-if="(status==4 && isLottery==false)">
      <img class="title-class4" src="../assets/page4_31111.png"/>
    </div>
    <div class="title-k" v-if="(status==3)">
      <img class="title-class5" src="../assets/page4_3.png"/>
    </div>
    
    <!--title-k-->
    <div class="winning-prize" v-if="(status==4)">
      <img src="../assets/page3_4.png"/>
      <div class="img1">
          <img :src="ils.lotteryMember?ils.lotteryMember.avatar:null"/>
      </div>
    </div>
    <div class="list-p" v-if="(status==3)">此团已有{{ils.goods.currPerson}}人参加，还差{{ils.goods.person-ils.goods.currPerson}}人</div>
    <div class="dli-list">
      <div class="dli-list-li" v-for="(item,index) in goodsOrderList" :key="index">
        <img v-if="item.avatar" :src="item.avatar">
      </div>
      <div class="dli-list-li" @click="clickUrl('participate')"></div>
    </div>
    <div class="list-p" v-if="(status==1)">此团已有{{ils.goods.currPerson}}人参加，还差{{ils.goods.person-ils.goods.currPerson}}人，赶紧邀请小伙伴一起来参与吧！</div>
    <div class="share-btn" @click="shareshow()" v-if="(status != 3 && !(isLottery==true && status == 4))">
      <img src="../assets/page2_13.png"/>
    </div>
    <div class="rule-wrap">
      <img src="../assets/page3_6.png"/>
    </div>
    <div class="ral-s">
      <div class="title">
        <img src="../assets/art_x.png">
      </div>
      <div class="wrap details-wrap" v-html="details">
        {{details}}
      </div>
    </div>
  </div>
  <tabbar :selected="selected" :tabs='tabs'></tabbar>
    <div class="model flex-cen" v-if="istrue">
      <div class="model-box one" v-if="boxis.one">
        <div class="close" @click="close()"></div>
        <h3>本次参团<br/>将消耗您100金币！</h3>
        <div class="btn"  @click="onebtn()">确定</div>
      </div>
      <div class="model-box two" v-if="boxis.two">
        <div class="close" @click="close()"></div>
        <h3>恭喜您获得</h3>
        <h4>{{ils.goods.name}}</h4>
        <p>赶紧去填写信息领取奖品吧！</p>
        <div class="btn" @click="countdown1()">填写信息</div>
      </div>
      <div class="model-box three" v-if="boxis.three">
        <div class="close" @click="close()"></div>
        <h3>此团已有{{ils.goods.currPerson+1}}人参加，还差{{ils.goods.person-ils.goods.currPerson-1}}个，<br/>赶紧邀请小伙伴一起来参与吧！</h3>
        <h4>您当前参团次数还剩余{{lastCount}}次</h4>
        <div class="btn" @click="clickinit">确定</div>
        <div class="btn btns" @click="shareshow()"></div>
        <!--分享-->
      </div>
      <div class="model-box four" v-if="boxis.four">
        <div class="close" @click="clickUrl('about')"></div>
        <dl>
          <dd><input type="text" placeholder="输入姓名" v-model="newName"/></dd>
          <dd><input type="text" placeholder="输入手机号" v-model="newPhone" maxlength="11" /></dd>
          <dd><textarea placeholder="输入地址" v-model="newtext" v-on:change="checkPrice()" :class="ison?'':'on'"></textarea></dd>
        </dl>
        <div class="btn" @click="formbtn()">提交</div>
      </div>
      <div class="model-box five" v-if="boxis.five">
        <div class="close" @click="close()"></div>
        <h3>当前金币数不足，<br/>去赚金币！</h3>
        <div class="btn" @click="clickUrl1()">去赚金币</div>
      </div>
      <div class="model-box five" v-if="boxis.eigh">
        <div class="close" @click="close()"></div>
        <h3 v-html="msg">{{msg}}</h3>      
        <div class="btn" @click="close()">确定</div>
      </div>
      <div class="model-box five" v-if="boxis.six">
        <div class="close" @click="close()"></div>
        <h3>别气馁！<br/>试试参与其他团</h3>
        <div class="btn" @click="clickUrl('home')">确定</div>
      </div>
      <div class="model-box five" v-if="boxis.seven">
        <div class="close" @click="close()"></div>
        <h3>此次组团因为人数<br/>未达到上限，组团失败</h3>
        <div class="btn" @click="clickUrl('home')">确定</div>
      </div>
      <!-- <div class="model-box five" v-if="boxis.eight">
        <div class="close" @click="close()"></div>
        <h3>当前金币数不足，<br/>去赚金币吧！</h3>
        <div class="btn" @click="clickUrl1()">去赚金币</div>
      </div> -->
    </div>
    <!--弹窗-->
    <div class="model flex-cen" v-if="istrue2">
      <div class="share">
        <div class="list">
          <div class="li" @click="sharebtn('shareToWechat')">
            <img src="../assets/fen5.png">
            <p>微信</p>
          </div>
          <div class="li" @click="sharebtn('shareToWechatTimeline')">
            <img src="../assets/fen6.png">
            <p>微信朋友圈</p>
          </div>
          <div class="li" @click="sharebtn('shareToQQ')">
            <img src="../assets/fen4.png">
            <p>QQ好友</p>
          </div>
          <div class="li" @click="sharebtn('shareToMicroblog')">
            <img src="../assets/fen1.png">
            <p>微博</p>
          </div>
          <div class="li" @click="sharebtn('shareToQzone')">
            <img src="../assets/fen3.png">
            <p>QQ空间</p>
          </div>
          <!-- <div class="li" @click="sharebtn('shareToQQ')">
            <img src="../assets/fen2.png">
            <p>小纸条</p>
          </div> -->
        </div>
        <div class="btnsss" @click="close1()">取消</div>
      </div>
    </div>
</div>
</template>
<script>
//setInterval
import heads from '../components/head.vue'
import tabbar from '../components/tabbar.vue'
import { Indicator } from 'mint-ui';
import {minutesAndSeconds,getUrlParameter} from '../assets/js/util'
export default {
  data(){
    return{
      newPhone:"",
      isLottery:false,
      newName:"",
      newtext:"",
      title:"dateils",    //头部信息
      istrue:false,       //弹窗
      istrue1:false,      //防止连续点击
      istrue2:false,      //分享
      selected:"home",    //底部导航home
      ison:true,
      tabs:[require("../assets/home.png"),require("../assets/mine.png")],
      ils:{
        goods:{},
        isBuy:"",
        isDeliveryAddress:"",
        isLottery:"",
        lotteryMember:""
      },                  //接收详情页数据
      arr_title:[
        {class:"title-class1"},
        {class:"title-class2"},
        {class:"title-class3"},
        {class:"title-class4"},
        {class:"title-class5"}
      ],
      boxis:{
        one:false,
        two:false,
        three:false,
        four:false,
        five:false,
        six:false,
        seven:false,
        eigh:false
      },                //弹窗状态
      status:0,         //参团状态
      isBuy:false,      //是否参团状态
      goodsOrderList:[
        {avatar:false},
        {avatar:false},
        {avatar:false},
        {avatar:false},
        {avatar:false},
        {avatar:false},
        {avatar:false},
        {avatar:false},
        {avatar:false},
        {avatar:false},
      ],               //详情参团头像
      msg:"",            //弹窗提示信息
      lastCount:0,        //剩余参团次数
      datearr:[],          //实时刷新的时间
      dateobj:{day:0,hou:0,min:0},         //倒计时
      isDeliveryAddress:false,
      orderId:0,                     //orderId
      details:"",
      isDeliveryAddress:false
    }
  },
  components: {
    heads,
    tabbar,
  },
  mounted(){
    window.scrollTo(0,0);
    console.log(this.$route.query)
    if(this.$route.query.id){
      localStorage.setItem("sid", this.$route.query.id);
    }else if(this.$route.params.id){


      localStorage.setItem("sid", this.$route.params.id);
    }
    Indicator.open(); 
    var time = setInterval(()=>{
        if(localStorage.getItem("sid") && localStorage.getItem("ttt")){
          //console.log("测试")    
           Indicator.close(); 
           clearInterval(time); 
          this.init()
        }
    },100)


  },
  methods:{
    //路由跳转
    clickUrl(nameurl){
      this.$router.push({name:nameurl,params:{id:localStorage.getItem("sid")}});
    },
    clickUrl1(){
      if (navigator.userAgent.match(/ios/ig)) {
        var message = {'method': 'thirdPartnerToTaskList', 'parameters': ''};
        window.webkit.messageHandlers.webViewApp.postMessage(message);
      }else if(navigator.userAgent.match(/Android/ig)){
        window.webViewApp.thirdPartnerToTaskList(1)
      }
      
      //window.webkit.messageHandlers.webViewApp.thirdPartnerToTaskList(1)
    },
    delegation(){
      this.istrue=true
      this.boxis.one=true
    },
    close(){
      this.istrue=false
      for(let key in this.boxis){
        this.boxis[key] = false
      }
    },
    onebtn(){
      if (navigator.userAgent.match(/Android/ig)) {
        var obj = {'callback':'gettoken'};
          window.webViewApp.getUserToken(JSON.stringify(obj));
        //获得token方法
        window.gettoken = function(info){
          window['so_token'] = JSON.parse(info).token;
          var obj = {'callback':'getUA'};
          window.webViewApp.getUserAgent(JSON.stringify(obj));
        }
        //接收ua
        window.getUA = function(info){
          window['so_UA'] = info;
          window['timestamp']=new Date().getTime();
          var obj = {'dateTime':window['timestamp'],'callback':'getencryotion'};
          window.webViewApp.aesForThirdH5(JSON.stringify(obj));
        }
        //app端加密后拿到数据
        window.getencryotion = function(info){
        window['so_encryption'] = JSON.parse(info).result;
        }
      }else if(navigator.userAgent.match(/ios/ig)){
        var data_t = {'callback': 'gettoken'}
        var message = {'method': 'getUserToken', 'parameters': data_t};
        window.webkit.messageHandlers.webViewApp.postMessage(message);
        window.gettoken = function(info){
          window['so_token'] = JSON.parse(info).token;
          var data_t = {'callback': 'getUA'}
          var message = {'method': 'getUserAgent', 'parameters': data_t};
          window.webkit.messageHandlers.webViewApp.postMessage(message);
        }
        //接收ua
        window.getUA = function(info){
          window['so_UA'] = info;

          window['timestamp'] = new Date().getTime();
          var data_t = {'dateTime':window['timestamp'],'callback': 'getencryotion'}
          var message = {'method': 'aesForThirdH5', 'parameters': data_t};
          window.webkit.messageHandlers.webViewApp.postMessage(message);
        }
        //app端加密后拿到数据
        window.getencryotion = function(info){
          window['so_encryption'] = info;
        }
      }
      if(this.istrue1) return;
      this.istrue1 = true;
      var timestamp= new Date().getTime();
      this.$post("/goods/buyGoods",{goodsId:localStorage.getItem("sid"),ttt:localStorage.getItem("ttt"),auth:window['so_encryption'],timestamp1:window['timestamp'],token:window['so_token'],ua:window['so_UA']})
      .then(res=>{
        this.istrue1 = false;
        if(res.code == "0000"){
          this.boxis.one = false
          this.lastCount=res.result.lastCount
          this.boxis.three = true
        }else if(res.code == "8995"){
          this.boxis.one = false
          this.msg = res.message
          this.boxis.five = true
        }else{
          this.boxis.one = false
          this.msg = res.message
          this.boxis.eigh = true
        }
        console.log(res)
      })
    },
    //数据初始化
    init(){
      this.$post("/goods/getDetails",{goodsId:localStorage.getItem("sid"),ttt:localStorage.getItem("ttt")})
      .then(res=>{
        if(res.code == "0000"){
          this.ils = res.result
          this.isLottery = res.result.isLottery
          this.status = res.result.goods.status
          this.isBuy = res.result.isBuy
          this.expireTime = res.result.goods.expireTime
          this.details = res.result.goods.details
          this.isDeliveryAddress = res.result.isDeliveryAddress
          if(res.result.lotteryMember){
            this.orderId = res.result.lotteryMember.orderId
          }
          for(let i=0; i<res.result.goodsOrderList.length; i++){
            this.goodsOrderList[i] = res.result.goodsOrderList[i]
          }
          this.dt_fail(res.result.isBuy,res.result.isLottery,res.result.goods.status,res.result.isDeliveryAddress)
          // this.goodsOrderList = res.result.goodsOrderList
          if(res.result.goods.expireTime>0){
            this.countdown(res.result.goods.expireTime)
          }
          
          console.log(this.goodsOrderList)
        }else{
          this.$toast(res.message)
        }
        
      })
    },
    //clickinit
    clickinit(){
      this.init()
      this.close()
    },
    //fail没参团成功
    dt_fail(isBuy,isLottery,status,isDeliveryAddress){
      if(isBuy && !isLottery && status==4){
        //没有参团成功
        console.log(isLottery)
        this.istrue=true
        this.boxis.six = true
      }else if(status == 3 && isBuy){
        //因人数组团失败
        this.istrue=true
        this.boxis.seven = true
      }else if(isBuy && isLottery && status==4 && !isDeliveryAddress){
        //参团成功并获奖
        this.istrue=true
        this.boxis.four = true
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
    //弹框填写资料
    countdown1(){
      this.boxis.two = false
      this.boxis.four = true
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
            if(!(/^1[3456789]\d{9}$/.test(this.newPhone))){ 
        this.$toast("手机号码有误，请重填") 
        return false; 
      } 
      if(!this.newName){
        this.$toast("姓名不能为空")
        return;
      }
        if(!isNaN(this.newName)){
         this.$toast("请输入正确姓名")
         return false;
		   }
      if(!this.newtext){
        this.$toast("地址不能为空")
        return;
      }
      // if(this.newtext.replace(/[^\x00-\xff]/g,"***").length<30){
      //    this.$toast("")
      // }


      this.$post('/goods/deliveryAddress',{orderId:this.orderId,ttt:localStorage.getItem("ttt"),name:this.newName,phone:this.newPhone,address:this.newtext})
      .then(res=>{
        if(res.code == "0000"){
          this.clickUrl("about")
        }else{
          this.$toast(res.message)
        }
        console.log(res)
      })
    },
    checkPrice(val){

      console.log("s")
    },
    //分享share
    sharebtn(val){
      //shareToWechat
        let data = {'url': 'https://young.chinaso.com/young/v1/ygames/gl/glhtml/#/detailsstera?id='+localStorage.getItem("sid"), 'title': '爱“拼”才会赢', 'desc': '就差你了，快和我一起参团，抽取大奖~', 'image': 'https://young.chinaso.com/young/v1/ygames/gl/glhtml/img/stare.jpg'};
      	if (navigator.userAgent.match(/ios/ig)) {
				  var message = {'method': val, 'parameters': data};
          window.webkit.messageHandlers.webViewApp.postMessage(message);
          
          this.istrue2=false;
				} else if(navigator.userAgent.match(/Android/ig)){
          window.webViewApp[val](JSON.stringify(data));
          this.istrue2=false;
				}
    },
    close1(){
      this.istrue2=false
    },shareshow(){
      this.istrue2=true
    },
    //获取url get的值
    urls(name) {
      var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
      var URL =  decodeURI(window.location.href);
      var r = URL.substr(1).match(reg);
      console.log(r)
      if(r!=null){
          //decodeURI() 函数可对 encodeURI() 函数编码过的 URI 进行解码
          return  decodeURI(r[2]);
      };
      return null;
    }
  }
  
}
</script>

<style scoped>
.wrap{
  padding-top: 1.1rem;
}
.details-wrap p{
  font-size: 0.18rem !important;
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
  position: relative;
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
.title-k .title-class6{
 width: 2rem;
 height: 0.4rem;
}
.title-k .ding{
  position: absolute;
  right: 50%;
  bottom: 0.4rem;
  margin-right: -1.4rem;
  width: 1.2rem;
  height: 0.3rem;
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
  .ovhi{opacity: 0}
</style>

