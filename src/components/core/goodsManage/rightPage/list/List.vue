<template>
  <div id="cloudGoods" class="cloud_class">
    <el-menu  :default-active="cloud_choose" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">全部商品列表</el-menu-item>
      <!--<el-menu-item index="2">上架商品</el-menu-item>-->
      <!--<el-menu-item index="3">删除商品</el-menu-item>-->
    </el-menu>
    <goods-list v-if="this.cloud_choose == 1"></goods-list>
  </div>
</template>
<script>
  import goodsList from './GoodsList.vue'
  export default {
    components: {goodsList},
    name: 'localgoods',
    data () {
      return {
        cloud_choose: '1'
      }
    },
    methods: {
      handleSelect (key) {
        console.log(key)
        this.local_choose = key
      }
    }
  }
</script>
<style>

</style>
