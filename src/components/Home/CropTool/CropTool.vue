<template>
  <div>
      <CropTool
              v-bind:label="'选择图片'"
              v-bind:boxWidth="800"
              v-bind:boxHeight="400"
              v-on:cutDown="cudDown"
      ></CropTool>
      <img :src="imgSrc" v-if="imgSrc" style="margin-top:20px;">
  </div>
</template>
<script>
    import CropTool from '../../../base/plugin/CropTool'
    export default {
        components:{
            CropTool
        },
        data(){
            return {
                imgSrc:null
            }
        },
        methods:{
            cudDown:function(file){
                console.log(file);
                this.imgSrc = file.src;
            }
        }
    }
</script>
