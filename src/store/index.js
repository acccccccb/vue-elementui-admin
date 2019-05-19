import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
//=> 获取cookies
let getCookie = function (name) {
  let arr;
  let reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg)){
    return decodeURI(arr[2]);
  }else{
    return null;
  }
};
export default new Vuex.Store({
  state: {
    // baseURL:'http://192.168.1.78:8383',
    tabs:[
      {
        name:'首页',
        icon:'fa fa-home',
        path:'index'
      }
    ],
    basePath:'/',// 如果侧栏菜单读取的是子集路由，这里需要补全路径
  },
  mutations: {
    addTab(state,tabData) {
      let tabs = [...state.tabs];
      tabs.push(tabData);
      state.tabs = tabs;
    },
    closeTab(state,path) {
      let tabs = [...state.tabs];
      for(var i=0;i<tabs.length;i++) {
        if(tabs[i].path == path) {
          tabs.splice(i,1);
          state.tabs = tabs;
        }
      }
    },
    setToken(state,token) {
      state.token = token;
    }
  },
  strict: process.env.NODE_ENV !== 'production'
})

