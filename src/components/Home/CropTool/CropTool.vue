<template>
  <div>
      <ImgCutter
              :label="'选择图片'"
              :boxWidth="800"
              :boxHeight="400"
              v-on:cutDown="cutDown"
      ></ImgCutter>
      <img :src="imgSrc" v-if="imgSrc" style="margin-top:20px;">
  </div>
</template>
<script>
    import ImgCutter from '../../../base/plugin/CropTool'
    export default {
        components:{
            ImgCutter
        },
        data(){
            return {
                imgSrc:null
            }
        },
        methods:{
            cutDown:function(file){
                console.log(file);
                this.imgSrc = file.dataURL;
            }
        }
    }
</script>
