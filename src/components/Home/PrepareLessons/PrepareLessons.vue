<template>
  <el-row>
    <el-col :span="24">
      <template>
        <el-table
          :data="table.data"
          style="width: 100%">
          <el-table-column prop="id" label="ID" width="50" align="center"></el-table-column>
          <el-table-column prop="age" label="年龄段"></el-table-column>
          <el-table-column prop="courseId" label="科目"></el-table-column>
          <el-table-column prop="kejian" label="课件"></el-table-column>
          <el-table-column prop="teacher" label="任课教师"></el-table-column>
          <el-table-column prop="status" label="状态"></el-table-column>
          <el-table-column prop="action" label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="primary" size="small" plain @click="teachingLessons">查 看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!--查看弹框-->
      <el-dialog
        title="教学备课"
        :visible.sync="teachingLessonsDialog"
        width="60%">
        <div style="width: 100%; height: 1px; background-color: #ccc;"></div>
        <div style="display:flex; margin: 25px 0">
          <div>
            <span>课程：</span>
            <span>小淑女系统课</span>
          </div>
          <div style="margin: 0 20px;">
            <span>年龄段：</span>
            <span>5-6岁</span>
          </div>
          <div>
            <span>科目：</span>
            <span>舞蹈科</span>
          </div>
          <div style="margin: 0 20px;">
            <span>课件名：</span>
            <span>五月踢伸腿第一周</span>
          </div>
          <div>
            <span>任课教师：</span>
            <span>丽丽</span>
          </div>
        </div>
        <div style="width: 50%; height: 300px; margin: 20px auto; border: 1px solid #000;"></div>
        <div style="display: flex; justify-content: space-between; width: 100%; height: 50px; line-height: 50px; margin-bottom: 1px; background-color: #f2f2f2;">
          <div>
            <span>备课点评：</span>
            <span>第一部分不错。第二部分还须增加互动部分。</span>
          </div>
          <div>
            <span>张教官 2019.1.11 16:07</span>
          </div>
        </div>
        <div style="display: flex; justify-content: space-between; width: 100%; height: 50px; line-height: 50px; background-color: #f2f2f2; margin-bottom: 20px;">
          <div>
            <span>备课点评：</span>
            <span>示范时需同步讲解动作。</span>
          </div>
          <div>
            <span>李教官 2019.1.11 13:07</span>
          </div>
        </div>
        <div style="display: flex; justify-content: flex-end; align-items: flex-end;">
          <el-button type="info" @click="teachingLessonsDialog = false">关 闭</el-button>
        </div>
      </el-dialog>
    </el-col>
  </el-row>

</template>
<script>
  export default {
    name:'PrepareLessons',
    data(){
      return {
        table:{
          data:[
            {
              id:0,
              lesson:'课程',
              age:'年龄段',
              courseId:'科目',
              kejian:'课件',
              teacher:'任课教师',
              status:'状态',
              action:'操作'
            }
          ]
        },
        teachingLessonsDialog: false,
      }
    },
    methods: {
      teachingLessons() {
        let _this = this;

        _this.teachingLessonsDialog = true;
      }
    }
  }
</script>
<style scoped>

</style>
