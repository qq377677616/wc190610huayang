const wxb = require('/utils/wxb.js')
Page({
  data: {
    fail:false,
    share:false,
    success:false,
    num:"",
    id:"",
    item:{},
    voteStatus:0,
    Toast:""
  },
  onLoad(options) {
        my.setStorageSync({
              key: "share",
              data: false
            });
        let item=setInterval(()=>{
      var li = my.getStorageSync({ key: 'share' })
      this.setData({
        share:li.data
      })
      if(li.data){
        clearInterval(item)
      }
    },300)
    this.setData({
      id:options.id,
      voteStatus:options.status
    })
    var timestamp = Date.parse(new Date());
    var userId = wxb.getStorages("token").data;
    var _qs = "playerId="+options.id+"&timestamp="+timestamp+"&userId="+userId+"&snowbeer"
   
    wxb.Post('/getPlayerInfo',{sign:_qs,playerId:options.id,timestamp:timestamp,userId:userId},(res)=>{
      if(res.data.code == "0000"){
        this.setData({
          item:JSON.parse(res.data.result)
        })
        console.log(JSON.parse(res.data.result))
      }
      
    })
  },
  //分享设置
  onShareAppMessage() {
    return {
      title: '这就是街舞',
      desc: '这就是街舞',
      path: 'pages/index/index',
      success(soso){
        console.log(soso)
        console.log("成功")
        var timestamp = Date.parse(new Date());
        var userId = wxb.getStorages("token").data;
        console.log(userId)
        var _qs = "addType=2&timestamp="+timestamp+"&userId="+userId+"&snowbeer";
        wxb.Post('/addDanceValue',{sign:_qs,addType:2,userId:userId,timestamp:timestamp},(res)=>{
          console.log(res)
          if(res.data.code=="0000"){
            my.setStorageSync({
              key: 'share',
              data: true
            });
          }else{
            console.log(res.data.message)
            // my.showToast({
            //   type: 'none',
            //   content: res.data.message,
            //   duration: 2000,
            // });
          }
        })
      },
      fail(){
        console.log("分享失败")
      },
    };
  },
  //舞力值
  bindKeyInput:function(e){
    console.log(e.detail.value)
    this.setData({
      num:e.detail.value
    })
  },
  success1:function(){
    var userId = wxb.getStorages("token").data
    if(userId){
      userId = ""
    }
    var timestamp = Date.parse(new Date())
    var _qs = "timestamp="+timestamp+"&userId="+userId+"&snowbeer"
    wxb.Post("/getCouponList",{sign:_qs,userId:userId,timestamp:timestamp},(res)=>{
      if(res.data.code == "0000"){
        my.navigateTo({
          url: '/pages/add-todo/add-todo?url='+res.data.result.url
        })
        this.setData({
          success:false
        })
        //pages\add-todo\add-todo.js
      }
    })
    // this.setData({
    //   success:false
    // })
  },
  //btn请求
  btn:function(){
    console.log(this.data.voteStatus)
    // if(this.data.voteStatus == 2){
    //   my.showToast({
    //     type: 'none',
    //     content: '操作成功',
    //     duration: 3000,
    //   });
    // }
    console.log(this.data.item)
    var timestamp = Date.parse(new Date());
    var userId = wxb.getStorages("token").data;
    var _qs = "danceIntegral="+this.data.num+"&playerId="+this.data.id+"&timestamp="+timestamp+"&userId="+userId+"&snowbeer"
   
    console.log(this.data.num)
    wxb.Post('/vote',{sign:_qs,danceIntegral:this.data.num,playerId:this.data.id,timestamp:timestamp,userId:userId},(res)=>{
      console.log(this.data.voteStatus)
      if(res.data.code == "9999"){
        if(this.item.playerStatus == 2){
          my.showToast({
            type: 'none',
            content: '选手不可被投票',
            duration: 1500,
          });
        }else{
          this.setData({
          fail:true,
          Toast:res.data.message
        })
        }

      }else if(res.data.code == "0000"){
        let abj = this.data.item
        abj.userDanceIntegral = res.data.result.totleDanceIntegral
        abj.playerDanceIntegral=abj.playerDanceIntegral+res.data.result.voteDanceIntegral
        abj.voteDanceIntegral = res.data.result.voteDanceIntegral
        this.setData({
          success:true,
          num:"",
          item:abj
        })
      }
      console.log(res)
    })
  },
  fail:function(){
    this.setData({
      fail:false
    })
  },
  success:function(){
    this.setData({
      success:false
    })
  },
  onGetAuthorize(){
    console.log("sss")
  },
  onShare(){
    console.log("ss")
  },
  share:function(){
    this.setData({
      share:false
    })
  }
});
