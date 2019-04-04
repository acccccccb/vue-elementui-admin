<template>
  <div class="left-menu-main">
    <div class="left-menu-top-main-collapse">
      <img src="/static/images/logo.png" v-if="collapse==true">
    </div>
    <div class="left-menu-top-main" v-if="collapse==false">
      <div class="left-menu-top-logo">
        <img src="/static/images/logo.png">
      </div>
      <div class="left-menu-top-text">
        <div>MINAKEVIN</div>
        <div>Teaching System</div>
      </div>
      <div class="clearfix"></div>
    </div>
    <div>
      <el-menu
        ref="refLeftMenu"
        mode="vertical"
        :default-active="$route.path"
        :collapse="collapse"
        :router="true"
        :collapse-transition="true"
        @select="chooseTab"
        v-if="menu.length>0"
        class="left-menu">
        <el-menu-item class="left-menu-item" v-for="(item, index) in menu" :index="basePath+item.path" :index.path="basePath+item.path" :route="$router.path" :key="index">
          <i :class="item.icon"></i>
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="show-full-size change-left-menu-size " v-if="collapse == true" @click="setCollapse(1)">
      <el-button type="primary" icon="el-icon-arrow-right" circle></el-button>
    </div>
    <div class="show-mini-size change-left-menu-size" v-if="collapse == false" @click="setCollapse(0)">
      <el-button type="primary" icon="el-icon-arrow-left" circle></el-button>
    </div>
  </div>
</template>
<script>
  export default {
    name:'LeftMenu',
    data(){
      return {
        basePath:this.$store.state.basePath,
        collapse:false,
        menu:[],
      }
    },
    created(){
//      this.setCollapse(false);
      this.getCollapse();
      this.menu = this.$router.options.routes[0].children;
    },
    methods: {
      getCollapse:function(){
        this.collapse = window.localStorage.collapse==0;
      },
      setCollapse:function(collapse){
        window.localStorage.collapse = collapse;
        this.getCollapse();
      },
      chooseTab:function(path){
        let _this = this;
          let menuList = this.menu;
          for(var index=0;index<menuList.length;index++) {
            if(_this.basePath+menuList[index].path == path) {
              let path = menuList[index].path;
              let tabs = this.$store.state.tabs;
              let choosedTabs = tabs.filter((res)=>{
                if(res.path == path) {
                  return res;
                }
              });
              if(choosedTabs.length==0) {
                let tabData = {
                  name:menuList[index].name,
                  icon:menuList[index].icon,
                  path:menuList[index].path,
                };
                this.$store.commit('addTab',tabData);
              }
            }
          }
      }
    },

  }
</script>
<style scoped>
  .el-menu--collapse {
    width:60px;
  }
  .left-menu-main {
    position:relative;
    height:100%;
  }
  .change-left-menu-size {
    position: absolute;
    bottom:10px;
    right:10px;
    height:40px;
    width:40px;
  }
  .show-mini-size {
  }
  .show-full-size {
  }
  .left-menu {
    height:100%;
    overflow-y:hidden;
    border-right:none!important;
  }
  .left-menu-top-main {
    padding-top:14px;
    padding-bottom:10px;
    padding-right:20px;
    background:#F3FBFF;
    /*border-right:1px solid #dedede;*/
    /*border-bottom:1px solid #dedede;*/
    height:80px;
    overflow:hidden;
    box-sizing:border-box;
  }
  .left-menu-top-main-collapse img {
    width:40px;
    margin-left:6px;
    margin-top:10px;
  }
  .left-menu-top-logo {
    float:left;
    margin-left:10px;
  }
  .left-menu-top-logo img {
    width:70px;
  }
  .left-menu-top-text {
    float:left;
    padding-right:10px;
    padding-left:10px;
    padding-top:5px;
  }
  .left-menu-item:nth-child(1) {
    display:none!important;
  }
  .router-link {
    display:block;
  }
  .router-link-active {
    border-left:5px solid #10AEFF;
    margin-left:-20px!important;
    padding-left:15px;
    color:#10AEFF;
    background:#F9FDFF!important;
  }
  .is-active {
    background:#F9FDFF!important;
    border-left:6px solid #10AEFF;
    color:#10AEFF;
  }
  .el-menu-item {
    padding-right:0!important;
  }
  .router-link-active i {
    color:#10AEFF!important;
  }
  .el-menu-item i {
    margin-right:5px;
  }
</style>
