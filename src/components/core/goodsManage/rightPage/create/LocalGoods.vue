<template>
  <div id="localgoods">
    <el-menu  :default-active="local_choose" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">创建商品</el-menu-item>
      <!--<el-menu-item index="2">上架商品</el-menu-item>-->
      <!--<el-menu-item index="3">删除商品</el-menu-item>-->
    </el-menu>
    <create-goods v-if="local_choose == '1'"></create-goods>
    <putaway-goods v-if="local_choose == '2'"></putaway-goods>
    <!--<delete-goods v-if="local_choose == '3'"></delete-goods>-->
  </div>
</template>
<script>
  import createGoods from './CreateGoods.vue'
  import putawayGoods from './PutawayGoods.vue'
  export default {
    components: {createGoods, putawayGoods},
    name: 'localgoods',
    data () {
      return {
        local_choose: '1'
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
  .el-menu-demo{
    height: 60px;
    width: 1020px;
  }
</style>
