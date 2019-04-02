<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-tabs v-model="activeTableName" @tab-click="handleTableClick" type="card">
          <el-tab-pane name="coursewareList" label="课件" v-if="coursewareList">
            <el-carousel :id="'coursewareList_'+coursewareViewerParmas.id" :autoplay="false" :height="carouselHeight + 'px'" :interval="5000" arrow="always" >
              <el-carousel-item class="align-center" v-for="item in coursewareList" :key="item.id">
                <img v-if="item.fileType==0" :height="carouselHeight" :src="'//'+item.fileUrl" class="coursewareListImg">
                <audio style="margin-top:250px;" v-if="item.fileType==1" :src="item.fileUrl" controls="controls"></audio>
                <Aliplayer v-if="item.fileType==2" :vid="item.vid" height="500px"></Aliplayer>
              </el-carousel-item>
            </el-carousel>
          </el-tab-pane>

          <el-tab-pane name="workList" label="作业" v-if="workList">
            <el-carousel :id="'workListImg_'+coursewareViewerParmas.id" :autoplay="false" :height="carouselHeight + 'px'" :interval="5000" arrow="always" >
              <el-carousel-item class="align-center" v-for="item in workList" :key="item.id">
                <img v-if="item.fileType==0" :height="carouselHeight" :src="'//'+item.fileUrl" class="coursewareListImg">
                <audio style="margin-top:250px;" v-if="item.fileType==1" :src="item.fileUrl" controls="controls"></audio>
                <Aliplayer v-if="item.fileType==2" :vid="item.vid" height="500px"></Aliplayer>
              </el-carousel-item>
            </el-carousel>
          </el-tab-pane>

          <el-tab-pane name="teachingList" label="教案" v-if="teachingList">
            <el-carousel :id="'teachingListImg_' + coursewareViewerParmas.id" :autoplay="false" :height="carouselHeight + 'px'" :interval="5000" arrow="always" >
              <el-carousel-item class="align-center" v-for="item in teachingList" :key="item.id">
                <img v-if="item.fileType==0" :height="carouselHeight" :src="'//'+item.fileUrl" class="coursewareListImg">
                <audio style="margin-top:250px;" v-if="item.fileType==1" :src="item.fileUrl" controls="controls"></audio>
                <Aliplayer v-if="item.fileType==2" :vid="item.vid" height="500px"></Aliplayer>
              </el-carousel-item>
            </el-carousel>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  //import Viewer from 'viewerjs';
  import Aliplayer from '../base/Aliplayer.vue';
  import $http from "../api/request";
  let viewer;
  export default {
    name:'coursewareViewer',
    props:['coursewareViewerParmas'],
    components:{
      Aliplayer
    },
    data(){
      return {
        coursewareViewerId:null,
        visible:false,
        title:'课件预览',
        activeTableName:'coursewareList',
        coursewareViewerType:'',
        carouselHeight:500,
        coursewareList:[],
        teachingList:[],
        workList:[]
      }
    },
    updated:function(){
      let _this = this;
      this.visible = this.coursewareViewerParmas.visible;

      if(this.coursewareViewerParmas.visible==true) {
        _this.coursewareViewerId = _this.coursewareViewerParmas.id;
        _this.coursewareViewerType = _this.coursewareViewerParmas.type;
      }
    },
    methods:{
      coursePreview:function(id){
        console.log('获取课件包详情');
        let _this = this;
        let params = new URLSearchParams();
        params.append('packageId',id);
        $http.post('/teacher/coursewareInfo/get',params).then(res => {
          _this.coursewareList = res.coursewareList;
          _this.workList = res.workList;
          _this.teachingList = res.teachingList;
        });
      },
      // 关闭教学课程预览
      coursewareViewerClose:function(){
        this.$emit('visible', false);
        this.visible=false;
        this.coursewareList = [];
      },
      // 创建imgViewer
      creatImgViewer:function(elementId){
        let $el = document.getElementById(elementId);
        if($el) {
          viewer = new Viewer($el, {
            inline: false,
            toolbar:{
              zoomIn: 4,
              zoomOut: 4,
              oneToOne: 4,
              reset: 4,
              prev: 4,
              play: {
                show: 4,
                size: 'large',
              },
              next: 4,
              rotateLeft: 4,
              rotateRight: 4,
              flipHorizontal: 4,
              flipVertical: 4
            },
            viewed() {
              viewer.zoomTo(1);
            },
          });
        }
      },
      // tab点击事件
      handleTableClick:function(tab, event){
        if(tab.name=='coursewareList') {
          this.$nextTick(()=>{
            this.creatImgViewer('coursewareListImg_'+this.coursewareViewerParmas.id);
          });
        }
        if(tab.name=='workList') {
          this.$nextTick(()=>{
            this.creatImgViewer('workListImg_'+this.coursewareViewerParmas.id);
          });
        }
        if(tab.name=='teachingList') {
          this.$nextTick(()=>{
            this.creatImgViewer('teachingListImg_'+this.coursewareViewerParmas.id);
          });
        }
      }
    },
    watch:{
      visible:function(){
        if(this.visible==true) {
          let id = this.coursewareViewerId;
          this.coursePreview(id);
        }
      }
    }
  }
</script>
<style scoped>
  @import url('//cdn.staticfile.org/viewerjs/1.3.2/viewer.min.css');
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
