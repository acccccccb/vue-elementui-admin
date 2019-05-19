import Vue from 'vue'
import Router from 'vue-router'

// 登录
import Login from '@/components/Login'
// 主页
import Home from '@/components/Home/Home'
import Index from '@/components/Home/Index/Index'
// crop toll
import CropTool from '@/components/Home/CropTool/CropTool'


Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'PHPCRM',
      component: Home,
      children:[
        {
          name:'首页',
          icon:'mkfont mk-resume_icon_home_1',
          path:'index',
          component:Index,
        },
        {
          name:'CropTool',
          icon:'mkfont mk-resume_icon_home_1',
          path:'croptool',
          component:CropTool,
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
