// 加载下拉框列表
import $http from './request.js'
export let getSelectedList = { // 权限设置
  // 年龄段列表
  age:function(){
    return $http.get('/teacher/ageSetting/getList').then((res)=>{
      return res;
    });
  },
  // 获取课程
  course:function(){
    return $http.get('/teacher/course/getCourseList').then((res)=>{
      return res;
    })
  }
};
