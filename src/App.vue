<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  html,body,#app {
    height:100%;
    overflow-x:hidden;
    margin:0;
    font-size:14px;
  }
  .clearfix {
    clear:both;
  }
</style>
