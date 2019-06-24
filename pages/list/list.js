const wxb = require('/utils/wxb.js')
const md51 = require('/utils/md5l.js')
var arr=[]

Page({
  data: {
    currentDate: "12",
    success:false,             //弹窗状态值
    success1:false,
    share:false,               
    dayList: '',              //
    currentDayList: '',       //整个数组
    currentObj: '',     
    currentDay: '',           //当天日期
    currentClickKey: "12",
    result:[],                 //临时数组
    fp:"签到",                //签到状态
    num:0                     //连续签到天数
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
  onLoad: function (options) {
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
    
    var currentObj = this.getCurrentDayString()
    //setInterval
    this.setSchedule(currentObj)
    this.datapost(currentObj.getMonth()+1,currentObj.getFullYear())
    this.setData({
      currentDate: currentObj.getFullYear() + '年' + (currentObj.getMonth() + 1) + '月',
      currentDay: currentObj.getDate(),
      currentObj: currentObj,
    })
    // console.log(this.data.currentDay)
  },
  doDay: function (e) {
    var that = this;
    var currentObj = that.data.currentObj
    var Y = currentObj.getFullYear();
    var m = currentObj.getMonth() + 1;
    var d = currentObj.getDate();
    var sY = 0;
    var sM = 0;
    var str = ''
    if (e.currentTarget.dataset.key == 'left') {
      m -= 1
      if (m <= 0) {
        str = (Y - 1) + '/' + 12 + '/' + d
        sY = Y - 1
      } else {
        sY = Y
        str = Y + '/' + m + '/' + d
      }
      // that.onClickItem(m,sY)
    } else {
      m += 1
      if (m <= 12) {
        str = Y + '/' + m + '/' + d
        sY = Y
      } else {
        sY = Y + 1
        str = (Y + 1) + '/' + 1 + '/' + d
      }
    }
    that.datapost(m,sY)
    currentObj = new Date(str)
    this.setData({
      currentDate: currentObj.getFullYear() + '年' + (currentObj.getMonth() + 1) + '月',
      currentObj: currentObj
    })
    this.setSchedule(currentObj);
  },
  getCurrentDayString: function () {
    var objDate = this.data.currentObj
    if (objDate != '') {
      return objDate
    } else {
      var c_obj = new Date()
      var a = c_obj.getFullYear() + '/' + (c_obj.getMonth() + 1) + '/' + c_obj.getDate()
      return new Date(a)
    }
  },
  setSchedule: function (currentObj) {
    var that = this;
    var m = currentObj.getMonth() + 1;
    var Y = currentObj.getFullYear();
    var d = currentObj.getDate();
    var dayString = Y + '/' + m + '/' + currentObj.getDate();
    var currentDayNum = new Date(Y, m, 0).getDate();
    var currentDayWeek = currentObj.getUTCDay() + 1;
    var result = currentDayWeek - (d % 7 - 2);
    //console.log(result)
    var firstKey = result <= 0 ? 7 + result : result;
    var currentDayList = [];
    var f = 0;
    for (var i = 0; i < 42; i++) {
      let data = []
      if (i < firstKey - 1) {
        currentDayList[i] = ''
      } else {
        if (f < currentDayNum) {
          currentDayList[i] = {day:f + 1,style:""}
          f = currentDayList[i].day
        } else if (f >= currentDayNum) {
          currentDayList[i] = ''
        }
      }
    }
    console.log(currentDayList)
    that.setData({
      currentDayList: currentDayList
    })
  },
  //测试
  btn:function(){
    var userId = wxb.getStorages("token").data;
    //console.log(userId)
    var timestamp = Date.parse(new Date())
    var _qs = "addType=3&timestamp="+timestamp+"&userId="+userId+"&snowbeer"
    console.log(_qs)
    wxb.Post('/addDanceValue',{sign:_qs,userId:userId,addType:3,timestamp:timestamp},(res)=>{
      console.log(res)
      if(res.data.code == "0000"){
        //console.log("成功")
        if(res.data.result.totalDay == "7"){
          this.setData({
            success1:true
          })
        }else{
        this.setData({
          fp:"已签到",
          num:this.data.num+1,
          success:true
        })
        }
        console.log(this.data.num)
        
      }else if(res.data.code == "9995"){
        my.showToast({
          type: 'none',
          content: res.data.message,
          duration: 2000,
        });
      }
      
    })
  },
  // 设置点击事件
  onClickItem: function (e) {
    console.log(this.data.currentDayList)
    var currentDayList = this.data.currentDayList;
    for(var i=0; i<currentDayList.length; i++){
      if(currentDayList[i].day == JSON.stringify((e.currentTarget.id))){
        currentDayList[i].style = "on"
        console.log(currentDayList)
      }
    }
    console.log(JSON.stringify((e.currentTarget.id)));
  },
  datapost:function(Month,Year){
    var userId = wxb.getStorages("token").data;
    console.log(userId)
    var timestamp = Date.parse(new Date())
    var _qs = "month="+Month+"&timestamp="+timestamp+"&userId="+userId+"&year="+Year+"&snowbeer"
    
    wxb.Post("/getSignList",{sign:_qs,userId:userId,year:Year,month:Month,timestamp:timestamp},(res)=>{
      // console.log(this.getCurrentDayString().getDate())
      if(res.data.result.length>0){
        if(this.getCurrentDayString().getDate() == res.data.result[0].day){
          this.setData({
            fp:"已签到",
            num:res.data.result[0].totalDay
          })
        }else{
          this.setData({
            fp:"签到",
            num:0
          })
        }
        arr = this.data.currentDayList
        for(var i=0; i<res.data.result.length; i++){
          for(var j=0; j<arr.length; j++){
            if(res.data.result[i].day == arr[j].day){
              arr[j].style = "on";
            }
          }
        }
        
        //console.log(this.getCurrentDayString.getDate())
        this.setData({
          currentDayList:arr
        })
      }


    })
  },
  success:function(){
    this.setData({
      success:false
    })
  },
  success1:function(){
     var userId = wxb.getStorages("token").data
      if(!userId){
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
          success1:false
        })
        //pages\add-todo\add-todo.js
      }
    })
    // this.setData({
    //   success:false
    // })
  },
  share:function(){
    my.removeStorageSync({
  key: 'share',
});
    this.setData({
      share:false
    })
  },
  onShow(){
    console.log(this.onShareAppMessage)
  }
})
function objKeySort(obj) {//排序的函数
    var newkey = Object.keys(obj).sort();
　　//先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
    var newObj = {};//创建一个新的对象，用于存放排好序的键值对
    for (var i = 0; i < newkey.length; i++) {//遍历newkey数组
        newObj[newkey[i]] = obj[newkey[i]];//向新创建的对象中按照排好的顺序依次增加键值对
    }
    return newObj;//返回排好序的新对象
}
