<template>
  <el-container>
    <el-aside class="border-right el-aside">
      <LeftMenu></LeftMenu>
    </el-aside>
    <el-container class="el-container">
      <el-header class="pd0 el-header">
        <Header></Header>
      </el-header>
      <el-main class="el-main">
        <Breadcrumb></Breadcrumb>
        <keep-alive :max="10">
          <router-view></router-view>
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
  import Header from '../../base/Header.vue'
  import LeftMenu from '../../base/LeftMenu.vue'
  import Breadcrumb from '../../base/Breadcrumb.vue'
  export default {
    name: 'Home',
    components:{
      LeftMenu,
      Header,
      Breadcrumb
    },
    data() {
      return {

      }
    },
    created:function(){

    },
    updated:function(){
    },
    watch:{
      '$route':function(to,from) {
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-aside {
    width:auto!important;
  }
  .pd0 {
    padding:0;
  }
  .el-header {
    height:80px!important;
  }
  .border-right {
    border-right:1px solid #dedede;
  }
  .el-main {
    background:#F3FBFF;
  }
  .el-container {
    height:100%;
  }
</style>
