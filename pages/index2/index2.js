const wxb = require('/utils/wxb.js')
const app = getApp();
var shei = 0
Page({
  data: {
    scrollTop:0,
    num:0,
    list:[],
    on:false
  },
  onLoad(options) {
    console.log(options)
    
    console.log(this.route)
    //  my.alert({
    //   title: wxb.getUrlParam("userId"),
    // });
    if(options.userId){
                var timestamp = Date.parse(new Date())
      var _qs = "timestamp="+timestamp+"&userId="+options.userId+"&snowbeer"
      wxb.Post("/auth2",{sign:_qs,userId:options.userId,timestamp:timestamp},(res)=>{
        if(res.data.code == "0000"){
          wxb.setStorages("uid",res.data.result.userId)
          this.setData({
            on:true
          })
          console.log(res.data.result.userId)
        }
        
      })
    }
    //wxb.Post('')
    // app.getUserInfo().then(

    //   user => {
    //     console.log(user)
    //     this.setData({
    //       user,
    //       scrollHeight:0
    //     });
    //   },
    //   fiuser => {
    //     console.log(fiuser)
    //     // 获取用户信息失败
    //   }
    // );

    var timestamp = Date.parse(new Date());
    var _qs = "timestamp="+timestamp+"&snowbeer"
    var obj = {
      userId:123,
      timestamp:timestamp
    }
       console.log(_qs)
    wxb.Post('/getPlayerList',{sign:_qs,timestamp:timestamp},(res)=>{
      let datas = res.data.result
      console.log(JSON.parse(datas))
      this.setData({
        list:JSON.parse(datas).params
      })
    })
  },

  // onGetAuthorize(res) {
  //     my.getOpenUserInfo({
  //       success: (userinfo) => {
  //        console.log(userinfo)
  //       }
  //     });
  //   },
  scroll:function(e){
    shei = e.detail.scrollHeight - e.detail.scrollWidth;
    this.setData({
      scrollHeight:e.detail.scrollHeight - e.detail.scrollWidth
    })
  },
  onShow(options){
    // my.alert({
    //   title: options.userId,
    // });
  },
  top:function(e){
    if(this.data.scrollTop){
    var scrollTop = this.data.scrollTop - 100
      this.setData({
        scrollTop:scrollTop
      })
    }
    
    // if(this.data.num)
    console.log(this.data.scrollTop)
    console.log(this.data.scrollHeight)
  },
  bottom:function(e){
    console.log(shei)
    if(shei==0 || this.data.scrollTop<shei){
      var scrollTop = this.data.scrollTop + 300
      this.setData({
        scrollTop:scrollTop
      })
    }    
  },
  Jump:function(e){
    console.log(e.currentTarget.dataset.id)
    if(wxb.getStorages("token").data){
      my.navigateTo({
        url: '../item/item?id='+e.currentTarget.dataset.id+"&status="+e.currentTarget.dataset.status
      })
    }else{
      app.getUserInfo()
    }
  },
  tiao:function(){
    my.navigateTo({
      url: '/pages/add-todo/add-todo'
    })
    //https://taoquan.taobao.com/coupon/unify_apply.htm?sellerId=2056438400&activityId=1498da8698824dd88ca54e025e54c80d"
    // my.ap.navigateToAlipayPage({
    //     path:'https://taoquan.taobao.com/coupon/unify_apply.htm?sellerId=2056438400&activityId=1498da8698824dd88ca54e025e54c80d',
    //     success:(res) => {
    //         my.alert({content:'系统信息' + JSON.stringify(res)});
    //     },
    //     fail:(error) => {
    //         my.alert({content:'系统信息' + JSON.stringify(error)});        
    //     }
    // })
  },
  qiandao:function(){
    console.log(wxb.getStorages("token").data)
    if(wxb.getStorages("token").data){
      my.navigateTo({
        url: '/pages/list/list'
      })
    }else{
      this.onGetAuthorize()
    }
  },
  introduce:function(){
    my.navigateTo({
      url: '/pages/todos/todos'
    })
  },
  onGetAuthorize:function(){
    // my.navigateTo({
    //           url: '/pages/list/list'
    //         })
    my.getPhoneNumber({
    success: (res) => {
      console.log(res.response)
        //var encryptedDatass = ​eval('(' + res.response + ')');
        var encryptedDatass = res;
        var timestamp = Date.parse(new Date());
          console.log(JSON.parse(encryptedDatass.response))
        let soso = JSON.parse(encryptedDatass.response)
        let uid = wxb.getStorages("uid").data;
        if(!uid){
          uid=""
        }
        let response= soso.response
        var _qs = "avatar=ssss"+"&content="+response+"&nickname=你好"+"&timestamp="+timestamp+"&uId="+uid+"&snowbeer";
        wxb.Post("/decryptPhone",{sign:_qs,avatar:"ssss",content:response,uId:uid,nickname:"你好",timestamp:timestamp},ress=>{
          if(ress.data.code=="0000"){
             console.log(ress)
            wxb.setStorages("phone",ress.data.result.phone)
            wxb.setStorages("token",ress.data.result.token)
            my.navigateTo({
              url: '/pages/list/list'
            })
            
          }
         
        })
    },
    fail: (res) => {
        console.log(res)
        console.log('getPhoneNumber_fail')
    },
});
  },
  fail:function(){
    this.setData({
      on:false
    })
  },
});
