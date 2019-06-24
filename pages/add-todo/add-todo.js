const app = getApp();
const wxb = require('/utils/wxb.js')
Page({
  data: {
    url:""
  },
  onLoad(options){
    console.log(options)
        var userId = wxb.getStorages("token").data
         if(!userId){
      userId = ""
    }
    var timestamp = Date.parse(new Date())
    var _qs = "timestamp="+timestamp+"&userId="+userId+"&snowbeer"
    wxb.Post("/getCouponList",{sign:_qs,userId:userId,timestamp:timestamp},(res)=>{
      if(res.data.code == "0000"){
        console.log(res.data.result.url)
           this.setData({
      url:res.data.result.url
    })
        //pages\add-todo\add-todo.js
      }
    })

    
  }
});
