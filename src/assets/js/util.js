/*从地址栏获取传参*/
export function getUrlParameter(name) {
  var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)")
  var URL =  decodeURI(window.location.search)
  var r = URL.substr(1).match(reg)
  if(r!=null){
    //decodeURI() 函数可对 encodeURI() 函数编码过的 URI 进行解码
    return  decodeURI(r[2])
  };
  return null
}
/*从地址栏获取传参2*/
export function GetQueryString (name) {
  var after = window.location.hash.split("?")[1];
  if (after) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = after.match(reg);
    if(r != null)  {
      return  decodeURIComponent(r[2]);
    } else {
      return null;
    }
  }
}
//时间转换--把标准时间转为秒
export function distanceFromCurrent(time) {
  time = time.replace(/-/g, '/')
  let curTime = new Date().getTime()  
  let _time = new Date(time).getTime()
  if (_time - curTime > 0) {
    return (_time - curTime) / 1000
  } else {
    return -1
  }
}
//时间转换--把秒转为时分秒
export function minutesAndSeconds(time, symbol) {
  let _d,_h, _m, _s,arr=[]
  _d = parseInt(time / 3600/24)
  _h = parseInt(time / 3600%24)
  _m = parseInt(time / 60%60)
  _s = parseInt(time%60)
  // _d > 0 ? _d = _d+ (symbol || '-') : _d = ''
  // _h > 0 ? _h = _h + (symbol || '-') : _h = ''
  // _m > 0 ? _m = _m + (symbol || '') : (_h > 0 ? _m = 0  + (symbol || '') : _m = '')
  //_s >= 0 ? _s = _s + (symbol ? '' : '秒') : _s = -1
  arr.push(bzero(_d),bzero(_h),bzero(_m))
  return arr //+ _s
}
//自动补0
export function bzero(num){
  return num<10? '0'+num : num+"";
}
//音效播放
export function musicPlay(ele, pauseTime) {
  let _audio = document.getElementById(ele)
  _audio.currentTime = 0
  _audio.play()
  if (pauseTime) {
    setTimeout(() => {
      _audio.pause()
    }, pauseTime)
  }
}
//js浮点数精度--两数相乘 
export function accMul(num1,num2) {  
  let m = 0,s1 = num1.toString(), s2 = num2.toString()   
  try{ m += s1.split(".")[1].length}catch(e){} 
  try{ m += s2.split(".")[1].length}catch(e){}
  return Number(s1.replace(".","")) * Number(s2.replace(".","")) / Math.pow(10,m)
} 
//回到页面顶部
export function backPageTop() {
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0  
}
//排列组合
//自定义组合函数(就是数学排列组合里的C)
export function combination(m, n) {
  return factorial(m,n)/factorial(n,n)//就是Cmn(上面是n，下面是m) = Amn(上面是n，下面是m)/Ann(上下都是n)
}
//自定义排列函数(就是数学排列组合里的A)
export function array(m, n) {
  return factorial(m,n)//就是数学里的Amn,上面是n，下面是m
}
//自定义一个阶乘函数，就是有n个数相乘，从m开始，每个数减1，如factorial(5,4)就是5*(5-1)*(5-2)*(5-3),相乘的数有4个
function factorial(m, n) {
  let num = 1
  let count = 0
  for(let i = m; i > 0; i--){
    if (count == n) {//当循环次数等于指定的相乘个数时，即跳出for循环
      break
    }
    num = num * i
    count++
  }
  return num
}
//字符串数组转数字数组
export function stringToNumber(arr) {
  let _arr = []
  if (arr.length == 0) return _arr
  for (let i = 0; i < arr.length; i++) {
    _arr.push(parseFloat(arr[i]))
  }
  return _arr
}
//保留n位小数
export function retainedDecimal(x, n, math) {
  n = n || 2 
  math = math || 'round'
  let f_x = parseFloat(x)
  if (isNaN(f_x)) {
    return 0
  }
  let _n = '1'
  for (let i = 0; i < n; i++) {
    _n += '0'
  }
  _n = Number(_n)
  if (math == 'none') {
    f_x = parseInt(x * _n) / _n
  } else if (math == 'round'){
    f_x = Math.round(x * _n) / _n
  } else if (math == 'floor'){
    f_x = Math.floor(x * _n) / _n
  }
  let s_x = f_x.toString()
  let pos_decimal = s_x.indexOf('.')
  if (pos_decimal < 0) {
    pos_decimal = s_x.length
    s_x += '.'
  }
  while (s_x.length <= pos_decimal + n) {
    s_x += '0'
  }
  return s_x
}
//微信上传照片转base64
export function base64Switch(base64) {
  var _index = base64.indexOf("/9j")
  base64 = "data:image/jpg;base64," + base64.slice(_index)
  return base64
}
//创建script标签
export function createScript(src, isAsync) {
  let script = document.createElement("script")
  script.type = "text/javascript"
  script.src = src
  if (isAsync) script.async = "isAsync"
  document.body.appendChild(script)
}
//创建script标签并加载
export function loadScript(src, callback) {
  var s = document.createElement("script")
  s.async = false
  s.src = src
  var evtName = null
  var evtListener = null
  function logic() {
    s.parentNode.removeChild(s)
    s.removeEventListener(evtName, evtListener, false)
    callback && callback()
  }
  if (!-[1,]) {
    evtName = "readystatechange"
    evtListener = function () {
      (this.readyState == "loaded" || this.readyState == "complete") && logic()
    }
  } else {
    evtName = "load"
    evtListener = logic
  }
  s.addEventListener(evtName, evtListener, false)
  document.body.appendChild(s)
}
//判断当前手机系统（Android/ios）
export function isSystem() {
  var u = navigator.userAgent
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 //android终端
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端   
  return { isAndroid: isAndroid, isiOS: isiOS }
}
