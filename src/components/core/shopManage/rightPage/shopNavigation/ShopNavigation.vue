<template>
  <div>
    <el-menu :default-active="'1'" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1">店铺导航</el-menu-item>
    </el-menu>
    <shop-nav-body></shop-nav-body>
  </div>
</template>
<script>
  import shopNavBody from './ShopNavBody'
  export default {
    components: {shopNavBody}
  }
</script>
<style>
</style>
