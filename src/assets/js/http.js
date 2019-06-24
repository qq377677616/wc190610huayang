import axios from 'axios';
import {hex_MD5} from './md5l';
import qs from 'qs';

axios.defaults.timeout = 5000;
// axios.defaults.baseURL ='https://dev.flyh6.cn/young/v1/ygames/gl/glapi';
// axios.defaults.baseURL ="https://appapi.chinaso.com/young/v1/ygames/gl/group-lottery/";
axios.defaults.baseURL ="https://appapi.chinaso.com/young/v1/ygames/gl/glapi/";
///young/v1/ygames/gl/glapi
// axios.defaults.baseURL ='http://local.mynow.net/group-lottery/';
//http request 拦截器

axios.interceptors.request.use(
  config => {
    // const token = getCookie('名称');
    config.data =config.data //JSON.stringify(config.data);
    config.headers = {
      'Content-Type':'application/x-www-form-urlencoded'
    }
    
    // if(token){
    //   config.params = {'token':token}
    // }
    return config;
  },
  error => {
    return Promise.reject(err);
  }
);


// // Add a request interceptor
// axios.interceptors.request.use(function (config) {
//   // Do something before request is sent
//   return config;
// }, function (error) {
//   // Do something with request error
//   return Promise.reject(error);
// });

// // Add a response interceptor
// axios.interceptors.response.use(function (response) {
//   // Do something with response data
//   return response;
// }, function (error) {
//   // Do something with response error
//   return Promise.reject(error);
// });


//http response 拦截器
axios.interceptors.response.use(
  response => {
    if(response.data.errCode ==2){
      router.push({
        path:"/login",
        querry:{redirect:router.currentRoute.fullPath}//从哪个页面跳转
      })
    }
    return response;
  },
  error => {
    return Promise.reject(error)
  }
)


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url,params={}){
  return new Promise((resolve,reject) => {
    axios.get(url,{
      params:params
    })
    .then(response => {
      resolve(response.data);
    })
    .catch(err => {
      reject(err)
    })
  })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

 export function post(url,data = {}){
   console.log(data)
   data = qs.stringify(buildParams(data));
   return new Promise((resolve,reject) => {
     axios.post(url,data)
          .then(response => {
            resolve(response.data);
          },err => {
            reject(err)
          })
   })
 }

 //sort排序字母从大到小
export function sorts(arys) { 
  //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
  var newkey = Object.keys(arys).sort();　　 
  //console.log('newkey='+newkey);
  var newObj = {}; //创建一个新的对象，用于存放排好序的键值对
  for(var i = 0; i < newkey.length; i++) {
      //遍历newkey数组
      newObj[newkey[i]] = arys[newkey[i]]; 
      //向新创建的对象中按照排好的顺序依次增加键值对
  }
  return newObj; //返回排好序的新对象
}

 //签名字符串
 export function buildParams(a) { 
   a["timestamp"] = Date.parse(new Date());
    let aa = sorts(a)
    let str="";
    for(var key in aa){
       if(key==="sign"){
         continue
       }
       str +=key + "=" + aa[key]+"&"
    }
    a["sign"] = hex_MD5(str += "1af0f0feaab853b8abe8e24dbffb04a1");
    return a;
}