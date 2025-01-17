const axios = require('axios');
// axios.defaults.withCredentials=true;
import store from '../store';

let baseURL = store.state.baseURL;
let $http = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});
$http.all = axios.all;
let  JSESSIONID = store.state. JSESSIONID;
$http.interceptors.request.use(function (config) {
  config.headers = {
    JSESSIONID:  JSESSIONID,
    'Content-Type': 'application/x-www-form-urlencoded'
  };
  return config;
}, function (error) {
  return Promise.reject(error);
});

$http.interceptors.response.use((res)=>{
  return res.data;
}, err => {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        console.log('错误请求');
        break;
      case 401:
        console.log('未授权，请重新登录');
        window.vue.$alert('您的登录认证已经失效，请重新登录','用户登录错误', {
          type:'warning',
          confirmButtonText: '确定',
          callback:function(){
            window.location.href='./';
          }
        });
        break;
      case 402:
        console.log('未授权，请重新登录');
        window.vue.$alert('您的登录认证已经失效，请重新登录','用户登录错误', {
          type:'warning',
          confirmButtonText: '确定',
          callback:function(){
            window.location.href='./';
          }
        });
        break;
      case 403:
        console.log('拒绝访问');
        break;
      case 404:
        console.log('请求错误,未找到该资源');
        break;
      case 405:
        console.log('请求方法未允许');
        break;
      case 408:
        console.log('请求超时');
        break;
      case 500:
        console.log('服务器端出错');
        break;
      case 501:
        console.log('网络未实现');
        break;
      case 502:
        console.log('网络错误');
        break;
      case 503:
        console.log('服务不可用');
        break;
      case 504:
        console.log('网络超时');
        break;
      case 505:
        console.log('http版本不支持该请求');
        break;
      default:
        console.log(`连接错误${err.response.status}`);
    }
  } else {
    console.log('连接到服务器失败');
    window.vue.$message.error('连接到服务器失败');
  }
  return Promise.resolve(err.response);
});

export default $http
