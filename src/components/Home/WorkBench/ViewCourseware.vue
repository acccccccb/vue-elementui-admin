<template>
  <el-row>
    <el-col :span="24">
      <router-view></router-view>
    </el-col>
    <el-col :span="24">
      <el-card class="box-card" shadow="never">
        <div slot="header" class="clearfix">
          <span>查看课件包</span>
          <el-button @click="$router.go(-1)" style="float: right;margin-top:-4px;" size="mini" type="primary">返回</el-button>
        </div>
        <div>
          <!--课件预览-->
          <coursewareViewer v-bind:coursewareViewerParmas="coursewareViewerParmas" v-on:visible="coursewareViewerClose" ></coursewareViewer>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
  import {WorkBenchApi} from '../../../api/WorkBenchApi.js'
  import coursewareViewer from '../../../base/coursewareViewer.vue'
  export default {
    name:'ViewCourseware',
    components:{
      coursewareViewer
    },
    data(){
      return {
        course:[],
        carouselHeight:500,
        coursewareViewerParmas:{
          type:'workList',
          visible:false,
          id:null
        },
      }
    },
    created:function(){
//      this.getCourseInfo(this.$route.query.id);
      this.coursePreview(this.$route.query.id);
      this.setCarouselHeight();
    },
    methods:{
      getCourseInfo:function(id){
        let _this = this;
        WorkBenchApi.courseInfo(id).then((res)=>{
          _this.course = res;
        });
      },
      setCarouselHeight:function(){
        let height = window.innerHeight-350;
        this.carouselHeight = height;
        this.coursewareViewerParmas.height = height;
      },
      // 关闭课件
      coursewareViewerClose:function(visible){
        this.coursewareViewerParmas.visible = visible;
      },
      // 查看课件
      coursePreview:function(id){
        let _this = this;
        _this.coursewareViewerParmas.visible = true;
        _this.coursewareViewerParmas.id = id;
      },
    }
  }
</script>
<style scoped>
  .coursewareListImg {
    width:auto!important;
    max-width:100%;
    height:500px;
    margin:auto;
    cursor:zoom-in;
  }
  .align-center {
    text-align:center;
  }
</style>

