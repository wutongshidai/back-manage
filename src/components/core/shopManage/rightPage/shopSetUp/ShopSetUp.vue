<template>
  <div>
    <el-menu :default-active="'1'" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1">店铺设置</el-menu-item>
    </el-menu>
    <shop-setup-body></shop-setup-body>
  </div>
</template>
<script>
  import shopSetupBody from './ShopSetupBody'
  export default {
    components: {
      shopSetupBody
    }
  }
</script>
<style>
  .el-menu-demo{
    height: 60px;
    width: 1020px;
  }
</style>
