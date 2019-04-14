<template>
  <div class="login">
    <div class="fixation">
      <div class="loginTitle">
        <img src="../../static/images/logo2.png" alt="">
      </div>
      <div class="text">教学工作台</div>
    </div>
    <div class="main">
      <div class="bg"></div>
      <div class="loginBox">
        <div class="loginMargin">
          <div class="loginBox-left">
            <div class="img">
              <img src="../../static/images/logo3.png" alt="">
            </div>
          </div>
          <div class="loginBox-right">
            <div>
              <!--<img src="../../static/images/login_img_sao.png" alt="">-->
            </div>
          </div>
        </div>
        <div class="loginInput">
          <span>教学工作台登录</span>
          <el-form :model="login" :rules="loginRules" ref="ruleForm" style="margin-top: 25px;">
            <el-form-item prop="username">
              <el-input v-model="login.username" type="text" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="login.password" type="password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item v-show="false" prop="mac">
              <el-input ref="refMac" id="mac" v-model="login.mac" type="text" placeholder="mac地址"></el-input>
            </el-form-item>
            <el-button :loading="loading" type="primary" @click="loginIn('ruleForm')">登 录</el-button>
          </el-form>
        </div>
      </div>
    </div>
    <div class="footer">
      <span>米娜凯威教育集团 （MINAKEVIN）@2009-2018 minakevin 版权所有 粤ICP备： 14015868号 - 1</span>
    </div>
  </div>
</template>
<script>
  import $http from '../api/request.js'
  export default {
    name:'Login',
    data(){
      return {
        loading:false,
        login:{
          username:'admin ',
          password:'123456',
        },
        loginRules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
        }
      }
    },
    mounted() {
      this.getMac();
    },
    methods:{
      getMac:function(){
        let _this = this;
        let editorExtensionId = "fndijacmgfpgicgknoceclheehanolhc";
        if(typeof(chrome)=='undefined'){
          _this.$notify({
            title: '启用插件失败',
            message: '请使用chrome浏览器并安装米娜凯威系统访问安全插件',
            type: 'warning',
            position: 'bottom-right',
          });
        } else {
          if(chrome.runtime) {
            chrome.runtime.sendMessage(editorExtensionId, {requestType: 'connect'});
            _this.$notify({
              title: '启用插件成功',
              message: '米娜凯威系统访问安全插件已启用',
              type: 'success',
              position: 'bottom-right',
            });
          } else {
            _this.$notify({
              title: '启用插件失败',
              message: '请安装米娜凯威系统访问安全插件',
              type: 'warning',
              position: 'bottom-right',
              offset: 100
            });
          }
        }
      },
      setCookie:function(c_name,value,expiredays) {
        let exdate=new Date();
        exdate.setDate(exdate.getDate()+expiredays);
        document.cookie=c_name+ "=" +decodeURI(value)+
          ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
      },
      loginIn:function (formName) {
        let _this = this;
        this.$refs[formName].validate((valid) => {
          if(valid) {
            _this.loading = true;
            let params = new URLSearchParams();
            params.append('username',this.login.username);
            params.append('password',this.login.password);
            _this.setCookie('JSSESSIONID','df0c5bb47ef7c009ce8d80');
            let macRef = this.$refs['refMac'];
            this.login.mac = macRef.$refs.input.value;
            params.append('mac',this.login.mac);
            $http.post('/mylogin',params).then((res)=>{
              if(res.success==true) {
                _this.$message.success('登录成功');
//                _this.setCookie('JSESSIONID','44A42ADDD2D0A31FD19646F48780F09F');
//                _this.setCookie('nickname','囤囤囤');
//                _this.$store.commit('setToken',res.obj.token);
                _this.$router.push('/home')
              } else {
                _this.$alert(res.msg?res.msg:'请检查用户名或密码是否正确','登录错误',{
                  type:'warning',
                });
              }
              _this.loading = false;
            });
          } else {
            this.$message.error('请输入完整信息');
            return false;
          }
        });
      }
    }
  }
</script>
<style scoped>

</style>
