<template>
  <div class="tabs-main">
    <div class="tabs-group">
      <div v-for="(item, index) in this.$store.state.tabs" class="tabs-item">
        <div v-if="index>0" class="close-tab" @click="closeTab(index,item.url)"><i class="el-icon-error"></i></div>
        <router-link :to="{path: item.url}" :active-class="'tabs-item-active'" class="tabs-item" slot="title" v-if="!item.is">
          <div class="tabs-icon">
            <i :class="item.icon"></i>
          </div>
          <div class="tabs-name">{{item.name}}</div>
        </router-link>
      </div>
    </div>
    <div class="userinfo">
      <div class="headImg">
        <img v-if="headImg && headImg.length > 10" :src="headImg" alt="nickname">
        <div class="headImgNone" v-if="!headImg || headImg.length == ''">{{nickname[0]}}{{nickname[1]}}</div>
      </div>
      <div class="info">
        <div>{{nickname}}</div>
        <div class="login-out"><router-link to="/login">退出登录</router-link></div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name:'Header',
    data() {
      return {
        nickname:' ',
        headImg:'http://placekitten.com/g/100/100'
      }
    },
    created(){
      this.$router.push(this.$store.state.tabs[0].url);
      this.nickname = this.getCookies('nickname');
      this.headImg = this.getCookies('headImg');
    },
    updated(){
      this.nickname = this.getCookies('nickname');
      this.headImg = this.getCookies('headImg');
    },
    methods: {
      //=> 获取cookies
      getCookies:function(name){
        let arr;
        let reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)){
          return decodeURI(arr[2]);
        }else{
          return null;
        }
      },
      // 选择标签
      chooseTab:function(index){
        this.$store.commit('chooseTab',index);
        this.$router.push(this.$store.state.tabs[index].url)
      },
      // 关闭标签
      closeTab:function(index,url) {
        this.$router.push(this.$store.state.tabs[index-1].url);
        this.$store.commit('closeTab',url);
      }
    }
  }
</script>
<style>
  .login-out,.login-out a {
    font-size:10px;
    text-decoration: none;
    color:#999999;
  }
  .headImg,.info {
    float:left;
    margin-top:15px;
  }
  .info {
    padding-left:20px;
    box-sizing: border-box;
    line-height:180%;
  }
  .headImg img,.headImgNone {
    border-radius: 50%;
    width:50px;
    height:50px;
  }
  .headImgNone {
    background:#0b9de8;
    color:#fff;
    line-height:50px;
    text-align:center;
    font-size:1.3em;
  }
  .tabs-main {
    position: relative;
  }
  .tabs-group {
    float:left;
    width:100%;
    padding-right:200px;
    box-sizing: border-box;
  }
  .userinfo {
    position: absolute;
    right:0;
    top:0;
    width:200px;
    height:80px;
    box-sizing: border-box;
    padding-left:20px;
    overflow:hidden;
  }
  .tabs-item {
    position: relative;
  }
  .close-tab {
    position: absolute;
    top:0;
    right:5px;
    height:10px;
    width:10px;
    z-index:10;
    color:#F76260;
    opacity:0;
  }
  .tabs-item,.tabs-item a {
    height:80px;
    width:100px;
    text-align:center;
    box-sizing:border-box;
    display:inline-block;
    cursor:pointer;
    color:#595959;
    text-decoration: none;
  }
  .tabs-item:hover {
    background:#F3FBFF;
  }
  .tabs-item:hover .close-tab {
    opacity:1;
  }
  .tabs-item-active {
    background:#F3FBFF;
  }
  .tabs-icon {
    padding-top:14px;
  }
  .tabs-item .mkfont {
    font-size:2.2em;
  }
  .tabs-item-active .tabs-icon {
    color:#10AEFF;
  }
</style>
