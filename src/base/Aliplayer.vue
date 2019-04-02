<template>
  <div>
    <div class="prism-player" :id="playId" :style="playStyle"></div>
  </div>
</template>

<script>
  import {getVideoAuth} from '../api/coursewareManagement.js'
  export default {
    props: {
      playStyle: {
        type: String,
        default: ''
      },
      aliplayerSdkPath: { //=> Aliplayer 代码的路径
        type: String,
        default: '//g.alicdn.com/de/prismplayer/2.7.4/aliplayer-min.js'
      },
      source: {
        type: String,
        default: ''
      },
      playAuth: {
        type: String,
        default: ''
      },
      vid: {
        type: String,
        default: ''
      },
      autoplay: {
        type: Boolean,
        default: false
      },
      preload: {
        type: Boolean,
        default: false
      },
      height: {
        type: String,
        require: true,
        default: '200px'
      }
    },
    watch: {
      vid: function(){ //=> 如果vid发生变化，且player实例存在，则销毁播放器重新创建。
        if(this.player !== null){
          this.initPlayer();
        }
      },
      source: function(){ //=> 如果地址发生变化，且player实例存在，则销毁播放器重新创建。
        if(this.player !== null){
          this.initPlayer();
        }
      }
    },
    data(){
      return {
        playId: 'aliplayer_' + (Math.random().toFixed(5) * 1000000000000),
        auth: '',
        player: null,
        playauth: '',
        cover: '',
      }
    },
    mounted(){
      if(typeof window.Aliplayer !== 'undefined'){
        this.initPlayer();
      }else{
        this.createScript();
      }
    },
    methods: {
      createScript(){
        let playerScriptTag = document.getElementById('aliplayerScriptTag');
        if(playerScriptTag === null){ //=> 资源未加载，创建script标签
          playerScriptTag = document.createElement('script');
          playerScriptTag.type = 'text/javascript';
          playerScriptTag.src = this.aliplayerSdkPath;
          playerScriptTag.id = 'aliplayerScriptTag';
          let s = document.getElementsByTagName('head')[0];
          s.appendChild(playerScriptTag);
        }

        if(playerScriptTag.loaded){
          this.initPlayer();
        }else{
          playerScriptTag.addEventListener('load', ()=>{
            playerScriptTag.loaded = true;
            this.initPlayer();
          })
        }
      },
      initPlayer(){ //=> 播放器初始化
        if(this.player !== null){
          this.player.dispose();
        }
        let _this = this;
        _this.$nextTick(()=>{
          this.getAuth(_this.vid, ()=>{
            _this.player = new Aliplayer({
              id: _this.playId,
              autoplay: false,
              preload: false,
              cover: _this.cover,
              width: '100%',
              height: _this.height,
              x5_type: 'h5',
              vid: _this.vid,
              playauth: _this.playauth,
              controlBarVisibility: 'always'
            }, function (player) {
              console.log('播放器创建好了。')
            });
          })
        })
      },
      async getAuth(vid, callback){
        console.log(vid);
        let res = await getVideoAuth(vid);
        if(res.playAuth){
          this.playauth = res.playAuth;
          this.cover = res.cover;
          callback();
        }else{
          this.getAuth(vid, callback);
        }
      }
    }

  }
</script>

<style scoped>
  @import url(//g.alicdn.com/de/prismplayer/2.7.4/skins/default/aliplayer-min.css);
</style>
