import Vue from 'vue'
import Router from 'vue-router'

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
      name: 'Home',
      component: Home,
      children:[
        {
          name:'首页',
          icon:'fa fa-home',
          path:'index',
          component:Index,
        },
        {
          name:'图片裁剪',
          icon:'fa fa-image',
          path:'croptool',
          component:CropTool,
        },
      ]
    },
  ]
})
