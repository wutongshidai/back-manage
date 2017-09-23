<template>
  <div>
    <el-menu :default-active="'1'" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1">店铺关注</el-menu-item>
    </el-menu>
    <shop-attention-body></shop-attention-body>
  </div>
</template>
<script>
  import shopAttentionBody from './ShopAttentionBody'
  export default {
    components: {shopAttentionBody}
  }
</script>
<style>
</style>
