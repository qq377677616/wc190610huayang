const md51 = require('/utils/md5l.js')
//获取本地存储
function getStorages(a) {
  var info = my.getStorageSync({ key: a })
  var userinfo = info ? info : null;
  return userinfo;
}


//获取日期
function getDateStr(AddDayCount, type) {
  var dd = new Date();
  dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期 
  var y = dd.getFullYear();
  var m = dd.getMonth() + 1;//获取当前月份的日期 
  var d = dd.getDate();

  if (m < 10) {
    m = "0" + m;
  }
  if (d < 10) {
    d = "0" + d;
  }
  if (type == 1) {
    return m + "月" + d + "日";
  }
  return y + "-" + m + "-" + d;
}

//全部用POST
function Post(api, params, callback) {
  var apiurl = 'https://dev.flyh6.cn' + api;
  // params = 
  if(params.sign){
    
    params.sign = md51.hex_MD5(params.sign)
  }
  my.request({
    url: apiurl,
    data: params,
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: function (data) {
      callback(data);
    },
    fail: function (data) {
      my.hideLoading();
      my.showToast({
        title: '请求接口超时',
      })
    }
  })
}
function getUrlParam(name){
         // 获取参数
        var url = window.location.search;
          // 正则筛选地址栏
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
          // 匹配目标参数
        var result = url.substr(1).match(reg);
         //返回参数值
     return result ? decodeURIComponent(result[2]) : null;
 }

function getDay() {
  if (my.getStorageSync('wxb_day') == '') {
    return '';
  }
  var date = JSON.parse(my.getStorageSync('wxb_day'));
  return date;
}

//sort排序字母从大到小
function sorts(arr){
  arr.sort(function(a,b){
    if(a.toString().toLowerCase()>b.toString().toLowerCase())
      return 1;
    return -1;
  })
}

//上传图片 
// param img 图片；
function fileupload(mdl = '', callback) {
  var datas = [];
  my.chooseImage({
    count: 1, // 默认9
    sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: function (res) {
      var tempFilePaths = res.tempFilePaths;
      my.showLoading({
        title: '图片上传中..',
      })
      console.log("url:" + module.exports.globalData.apiurl);
      my.uploadFile({
        url: module.exports.globalData.apiurl + '/api/upload/upload', //仅为示例，非真实的接口地址
        filePath: tempFilePaths[0],
        name: 'file',
        formData: {
          'mdl': mdl
        },

        success: function (res) {
          my.hideLoading();
          my.showToast({
            title: '图片上传成功',
          });
          var data = JSON.parse(res.data);//你大爷的强制返回字符串；强制转json
          callback(data.data);
        },
        fail: function (res) {
          my.showToast({
            image: '/img/kulian.png',
            title: '图片上传失败',
          });
        }
      });
    }
  });

}

//本地存储
function setStorages(keys,datas) {
  if (keys && datas){
    my.setStorage({
      key: keys,
      data: datas,
      success: function (res) {
        console.log('异步保存成功')
      }
    })
  }else{
    console.log("没有key或没属性")
  }
  
}

module.exports = {
  fileupload: fileupload,
  setStorages, setStorages,
  getStorages: getStorages,
  Post: Post,
  globalData: [],
  that: null,
  lock: 0,//用于其他的锁定
  getDay: getDay,
  orderType: 'hotel',
  getUrlParam:getUrlParam
}
