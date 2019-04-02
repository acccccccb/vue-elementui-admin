import $http from './request.js'
const qs = require('qs')
export let getVideoAuth = (vid)=>{ //=> 获取视频鉴权信息
  return $http.post('/teacher/coursewarePackage/getVideoPlayAuth', qs.stringify({vid: vid}));
};

