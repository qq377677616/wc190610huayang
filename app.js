const wxb = require('/utils/wxb.js')
App({
  todos: [
    { text: 'Learning Javascript', completed: true },
    { text: 'Learning ES2016', completed: true },
    { text: 'Learning 支付宝小程序', completed: false },
  ],

  userId: false,
  getUserig(){
    
    my.getAuthCode({
      scopes: 'auth_base',
      success: (res) => {
        console.log(res)
        my.getAuthUserInfo({
          success: (userInfo) => {
            console.log(userInfo)
          }
        });
      },
    });
  },
  onShow(options){
    if(options.query.userId){
       this.userId = options.query.userId
    }else{
      this.userId =false
    }
   
  },
  // getUserInfo() {
  //   return new Promise((resolve, reject) => {
  //     // if (this.userInfo) resolve(this.userInfo);
  //     // my.getAuthCode({
  //     //   scopes: ['auth_user'],
  //     //   success: authcode => {
  //     //     var timestamp = Date.parse(new Date());
  //     //     console.log(authcode)
  //     //     var _qs = "code="+authcode.authCode+"&timestamp="+timestamp+"&snowbeer";
  //     //     // wxb.Post('/auth',{sign:_qs,code:authcode.authCode,timestamp:timestamp},(res)=>{
  //     //     //   console.log(res)
  //     //     //   if(res.data.message = "success"){
  //     //     //     wxb.setStorages("user",res.data.result)
  //     //     //     console.log(res.data.result)
  //     //     //   }
  //     //     // })
  //     //     my.getAuthUserInfo({
  //     //       success: res => {
  //     //         this.userInfo = res;
  //     //         resolve(this.userInfo);
  //     //       },
  //     //       fail: () => {
  //     //         reject("用户授权失败");
  //     //       },
  //     //     });
  //     //   },
  //     //   fail: () => {
  //     //     reject("用户授权失败");
  //     //   },
  //     // });
  //   });
 // }
});
