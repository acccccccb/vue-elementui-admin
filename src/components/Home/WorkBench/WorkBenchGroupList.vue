<template>
  <div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <el-row :gutter="30" v-if="this.$route.path == '/home/workBench/workBenchGroupList'">
      <el-col :span="6" v-for="item in coursewarePackage" :key="item.id">
        <el-card  :body-style="cardStyle" shadow="hover">
          <router-link :to="{path:'/home/workBench/workBenchGroupList/viewCourseware',query:{id:item.id}}">
            <img :src="'//' + item.packageFileUrl" class="image">
          </router-link>
          <div style="padding: 14px;">
            <div>{{item.packageName}}</div>
            <div class="time">{{item.gmtCreate}}</div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import {WorkBenchApi} from '../../../api/WorkBenchApi'
  export default {
    name:'WorkBenchList',
    data(){
      return {
        courseGroup:[],
        coursewarePackage:[],
        cardStyle:{
          padding: '0px',
        }
      }
    },
    created(){
      let _this = this;
      let courseGroupId = _this.$route.query.courseGroupId;
      if(courseGroupId) {
        _this.getCoursewareGroupInfo(_this.$route.query.courseGroupId)
      }
    },
    methods:{
      getCoursewareGroupInfo:function(courseGroupId){
        let _this = this;
        WorkBenchApi.coursewareGroupInfo(courseGroupId).then((res)=>{
          _this.courseGroup = res.courseGroup;
          _this.coursewarePackage = res.coursewarePackage;
        })
      }
    }
  }
</script>
<style scoped>
  .image {
    width:100%;
    height:300px;
  }
  .time {
    font-size: 13px;
    color: #999;
  }
</style>
