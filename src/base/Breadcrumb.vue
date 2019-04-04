<template>
  <div class="breadcrumb-main" v-if="this.$route.path != '/index'">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="item in breadcrumb" :key="item.name">{{item.name}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
  export default {
    name:'Breadcrumb',
    data(){
      return {
        breadcrumb:[]
      }
    },
    created:function(){

    },
    watch:{
      $route(to,from){
        this.breadcrumb = to.matched;
      }
    }
  }
</script>
<style scoped>
  .breadcrumb-main {
    padding:20px 0 40px 0;
  }
</style>
