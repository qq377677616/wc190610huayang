const wxb = require('/utils/wxb.js')
const app = getApp();
var shei = 0
Page({
  data: {
    scrollTop:0,
    num:0,
    list:[],
    on:false,
    on1:false,
    p:0,
    playerStatus:false
  },
  onLoad(options) {
    my.clearStorage()
    my.clearStorageSync()
    console.log(app.userId)
    if(app.userId){
      my.getAuthCode({
        scopes: 'auth_base',
        success: (res) => {
          console.log(res.authCode)
          var timestamp = Date.parse(new Date())
          var _qs = "code="+res.authCode+"&timestamp="+timestamp+"&snowbeer"
          wxb.Post("/auth3",{sign:_qs,code:res.authCode,timestamp:timestamp},(res)=>{
            if(res.data.code == "0000"){
              console.log(res.data.result.totalDanceValue)
              if(res.data.result.totalDanceValue <= 40){
                console.log("sss")
                wxb.setStorages("uid",res.data.result.userId)
                this.setData({
                  on:true
                })
              }else{
                wxb.setStorages("uid",res.data.result.userId)
                this.setData({
                  on1:true
                })
              }
              
            }
            
          })
        },
      });
    }


    var timestamp = Date.parse(new Date());
    var _qs = "timestamp="+timestamp+"&snowbeer"
    var obj = {
      userId:123,
      timestamp:timestamp
    }
    my.showLoading({
        content: '加载中...',
       
      });
    wxb.Post('/getPlayerList',{sign:_qs,timestamp:timestamp},(res)=>{
      my.hideLoading();
      if(res.data.code == "0000"){
        let datas = res.data.result
        console.log(JSON.parse(datas).params)
        this.setData({
          list:JSON.parse(datas).params
        })
      }

    })
  },
 onLaunch(options){
    console.log(options.query.userId)
  },
  scroll:function(e){
    shei = e.detail.scrollHeight - e.detail.scrollWidth;
    this.setData({
      scrollHeight:e.detail.scrollHeight - e.detail.scrollWidth
    })
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
  //请求优惠卷
    success1:function(){
      this.setData({
          on1:false
        })
         my.navigateTo({
          url: '/pages/add-todo/add-todo'
        })

    // this.setData({
    //   success:false
    // })
  },
  onGetAuthorize1:function(e){
    console.log(e.currentTarget.dataset.id)
        my.getPhoneNumber({
        success: (res) => {
          console.log(res.response)
            var encryptedDatass = res;
            var timestamp = Date.parse(new Date());
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
                 url: '../item/item?id='+e.currentTarget.dataset.id+"&status="+e.currentTarget.dataset.status
                })
                
              }else if(ress.data.code == "9993"){
                //type <>1 ,c
                console.log("没有却道手机号")
              }
            
            })
        },
        fail: (res) => {
            console.log(res)
            console.log('getPhoneNumber_fail')
        },
    });
    
  },
  tiao:function(){
    my.call('startApp', {
    appId: '10000007',
    param:{selectedTab:'ar',showOthers:'YES'},
    success: (res) => {
    my.alert({
    content: JSON.stringify(res)
    });
    },
    fail: (error) => {
    my.alert({
    content: '失败了' + JSON.stringify(error)
    });
    }
    });
    // my.call('startApp', {
    //   appId: '20000067',
    //   url:'alipays://platformapi/startapp?appId=20000067&selectedTab=ar&showOthers=YES&clientVersion=10.0.8',
    //   success: (res) => {
    //     my.alert({
    //       content: JSON.stringify(res)
    //     });
    //   },
    //   fail: (error) => {
    //     my.alert({
    //       content: '失败了' + JSON.stringify(error)
    //     });
    //   }
    // });
    // my.ap.navigateToAlipayPage({
    //     path:'alipays://platformapi/startapp?appId=10000007&selectedTab=ar&showOthers=YES&clientVersion=10.0.8',
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
    console.log("ssss")
    // my.navigateTo({
    //           url: '/pages/list/list'
    //         })
    my.getPhoneNumber({
    success: (res) => {
      console.log(res)
        //var encryptedDatass = ​eval('(' + res.response + ')');
        var encryptedDatass = res;
        var timestamp = Date.parse(new Date());
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
      on:false,
      on1:false
    })
  },
});
