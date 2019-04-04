import Vue from 'vue'
import Router from 'vue-router'

// 登录
import Login from '@/components/Login'
// 主页
import Home from '@/components/Home/Home'
import Index from '@/components/Home/Index/Index'
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
      path: '/',
      name: '教师教学端',
      component: Home,
      children:[
        {
          name:'首页',
          icon:'mkfont mk-resume_icon_home_1',
          path:'index',
          component:Index,
        },
        {
          path: 'workBench',
          name: '教学端',
          icon: 'mkfont mk-tab_icon_workbench_n2',
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
          icon: 'mkfont mk-resume_icon_train1',
          component: PrepareLessons
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
