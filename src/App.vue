<template>
  <div id="app">
    <router-view/>
    <div class="model flex-cen" v-if="istrue">
      <div class="model-box two" v-if="one">
        <div class="close" @click="close()"></div>
        <h3>您有奖品待领取</h3>
        <!-- <h4>{{ils.goods.name}}</h4> -->
        <h4>赶紧点击领取吧！</h4>
        <div class="btn" @click="countdown1()">确认</div>
      </div>
    </div>
  </div>
</template>
<script>
import { Indicator } from 'mint-ui';
export default {
  data(){
    return{
      istrue:false,   //弹窗
      one:false,
      two:false,
      solist:{}
    }
  },
  beforeCreate(){
    var _this = this
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
        Indicator.open();
    _this.$post('/member/initMemberInfo',{ua:window['so_UA'],token:window['so_token']})
        .then(res=>{
          console.log("res1--->", res)
          Indicator.close();
          if(res.code == "0000"){
            localStorage.setItem("ttt",res.result.ttt);
            localStorage.setItem("avatar",res.result.avatar);
            localStorage.setItem("nickname",res.result.nickname);
            var arr = localStorage.getItem("userb") ? JSON.parse(localStorage.getItem("userb")) : [] 
            if(arr.length == 0 || arr.indexOf(res.result.lotteryOrder.id)==-1){
              arr.push(res.result.lotteryOrder.id)
              localStorage.setItem("userb",JSON.stringify(arr))
              _this.istrue = true
              _this.one = true
            }
          }else{
            _this.$toast(res.message)
          }
        })
      }
      }
      if(navigator.userAgent.match(/ios/ig)){
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
      _this.$post('/member/initMemberInfo',{ua:window['so_UA'],token:window['so_token']})
        .then(res=>{
          console.log("res1--->", res)
          if(res.code == "0000"){
            localStorage.setItem("ttt",res.result.ttt);
            localStorage.setItem("avatar",res.result.avatar);
            localStorage.setItem("nickname",res.result.nickname);
            var arr = localStorage.getItem("userb") ? JSON.parse(localStorage.getItem("userb")) : [] 
            if(arr.length == 0 || arr.indexOf(res.result.lotteryOrder.id)==-1){
              arr.push(res.result.lotteryOrder.id)
              localStorage.setItem("userb",JSON.stringify(arr))
              _this.istrue = true
              _this.one = true
            }
            // avatar nickname
            //res.result.ttt
          }else{
            _this.$toast(res.message)
          }
        })
        }
      }
  },
  mounted(){
    
  },
  methods:{
    close(){
      this.istrue = false;
      this.one = false;
    },
    checkPrice(val){
      console.log("s")
    },
    //弹框填写资料
    countdown1(){
      localStorage.setItem("child",2)
      this.istrue = false;
      this.one = false
      this.$router.push({name:'about',params:{id:1}});
    }
  }
}
</script>
<style scoped>

</style>

<style>
body{background: #faf4e8;margin: 0;}
h1{
      font-size: 0.45rem;
  font-weight: bold;
}
</style>

