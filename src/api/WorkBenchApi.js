import $http from '../api/request.js'
export let WorkBenchApi = {
  // 获取课件组详情
  coursewareGroupInfo:function(courseGroupId){
    let params = new URLSearchParams();
    params.append('courseGroupId',courseGroupId);
    return $http.post('/teacher/courseGroup/get',params).then((res)=>{
      return res;
    });
  },
  // 获取课件包详情 /teacher/coursewareInfo/get
  coursewareInfo:function(packageId){
    let params = new URLSearchParams();
    params.append('packageId',packageId);
    return $http.post('/teacher/coursewareInfo/get',params).then((res)=>{
      return res;
    });
  }
};
