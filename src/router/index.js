import Vue from 'vue'
import Router from 'vue-router'

// 登录
import Login from '@/components/Login'
// 主页
import Home from '@/components/Home/Home'
// 教师工作台
import WorkBenchGroup from '@/components/Home/WorkBench/WorkBenchGroup'
import WorkBenchGroupList from '@/components/Home/WorkBench/WorkBenchGroupList'
import ViewCourseware from '@/components/Home/WorkBench/ViewCourseware'
// 备课
import PrepareLessons from '@/components/Home/PrepareLessons/PrepareLessons'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/home',
      name: '首页',
      component: Home,
      children:[
        {
          path: 'login',
          name: '登录',
          component: Login
        },
        {
          path: 'workBench',
          name: '教学端',
          component: WorkBenchGroup,
          children:[
            {
              path:'workBenchGroupList',
              name:'课件组列表',
              component:WorkBenchGroupList,
              children:[
                {
                  path:'viewCourseware',
                  name:'课件详情',
                  component:ViewCourseware,
                }
              ]
            }
          ]
        },
        {
          path: 'prepareLessons',
          name: '备课',
          component: PrepareLessons
        }
      ]
    },
    {
      path: '/index',
      name: '首页 ',
      component: Home
    },
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
  ]
})
