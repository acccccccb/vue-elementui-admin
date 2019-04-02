<template>
  <el-row>
    <el-col :span="24">
      <router-view></router-view>
    </el-col>
    <el-col :span="24" v-show="this.$route.path == '/home/workBench'">
      <el-form :inline="true" :model="searchBar" class="demo-form-inline">
        <el-form-item label="筛选条件：">
          <el-select @focus="getCourseList" v-model="searchBar.courseId" placeholder="全部课程">
            <el-option v-for="item in courseList" :key="item.id" :label="item.courseName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-select @focus="getAgeList" v-model="searchBar.ageSettingId" placeholder="请选择年龄段">
            <el-option v-for="item in ageList" :key="item.id" :label="item.ageDesc" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="searchBar.courseName" placeholder="请填写课件名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getCourseGroup">筛选课件</el-button>
        </el-form-item>
      </el-form>
      <el-card v-for="(item,index) in listGroup" :key="item.id" class="box-card" shadow="never">
        <!--TODO 显示组名-->
        <div slot="header" class="clearfix">
          <span>小公主预科课3-4岁舞蹈-2019上半年课件组</span>
          <router-link :to="{path:'/home/workBench/workBenchGroupList',query:{courseGroupId:item.id}}">
            <el-button style="float: right; padding: 3px 0" type="text">查看全部</el-button>
          </router-link>
        </div>
        <div>
          <el-row :gutter="30">
            <el-col :span="6" v-for="(childItem,index) in item.coursewarePackageList" :key="childItem.id" v-if="index<4">
              <el-card :body-style="cardStyle" shadow="hover">
                <router-link :to="{path:'/home/workBench/workBenchGroupList/viewCourseware',query:{id:childItem.id}}">
                  <img :src="'//' + childItem.packageFileUrl" class="image">
                </router-link>
                <div style="padding: 14px;">
                    <div>{{childItem.packageName}}</div>
                    <div class="time">{{childItem.group_name}}</div>
                  </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
  import $http from '../../../api/request'
  import {getSelectedList} from '../../../api/getSelectList'
  export default {
    name:'WorkBenchGroupList',
    data(){
      return {
        searchBar:{
          courseId:'',//课程
          ageSettingId:'',//年龄段
          courseName:''//课件名称
        },
        ageList:[],
        courseList:[],
        listGroup:{
          list1:[]
        },
        cardStyle:{
          padding: '0px',
        }
      }
    },
    mounted(){
      this.getCourseGroup();
    },
    methods:{
      getCourseList:function(){
        let _this = this;
        getSelectedList.course().then((res)=>{
          _this.courseList = res.obj;
        })
      },
      getAgeList:function(){
        let _this = this;
        getSelectedList.age().then((res)=>{
          _this.ageList = res.obj;
        })
      },
      getCourseGroup:function(){
        let _this = this;
        let params = new URLSearchParams();
        params.append('pageNo',1);
        params.append('pageSize',9999);
        $http.get('/teacher/courseGroup/search',params).then((res)=>{
          console.log(res);
          _this.listGroup = res.rows;
        });
      },
    },
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
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }
</style>
