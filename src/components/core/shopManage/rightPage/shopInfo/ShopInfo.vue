<template>
  <div id="shopInfo">
    <el-menu  :default-active="'1'" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1">店铺信息</el-menu-item>
    </el-menu>
    <shop-info-body></shop-info-body>
    <!--<delete-goods v-if="local_choose == '3'"></delete-goods>-->
  </div>
</template>
<script>
  import shopInfoBody from './shopinfoBody'
  export default {
    components: {shopInfoBody}
  }
</script>
<style>
  .el-menu-demo{
    height: 60px;
    width: 1020px;
  }
</style>
