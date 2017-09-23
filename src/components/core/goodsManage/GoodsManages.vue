<template>
  <div id="goodsManages" class="goods_class">
    <div class="leftsec_class">
      <div class="aside_class">
        <el-row class="tac" id="el_row">
          <el-col>
            <el-menu :default-active="active_choose" class="el-menu-vertical-demo" @select="handleOpen" >
              <el-menu-item index="1">创建商品</el-menu-item>
              <el-menu-item index="2">商品列表</el-menu-item>
              <!--<el-menu-item index="3">所有商品</el-menu-item>-->
            </el-menu>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="right_class">
      <local-goods v-if="this.active_choose == 1"></local-goods>
      <cloud-goods v-if="this.active_choose == 2"></cloud-goods>
      <!--<all-goods v-if="this.active_choose == 3"></all-goods>-->
    </div>
  </div>
</template>
<script>
  import localGoods from './rightPage/create/LocalGoods.vue'
  import cloudGoods from './rightPage/list/List.vue'
  export default {
    components: {localGoods, cloudGoods},
    name: 'home',
    data () {
      return {
        active_choose: '1'
      }
    },
    methods: {
      handleOpen: function (key, keyPath) {
        this.active_choose = key
      }
    }
  }
</script>
<style>
  .leftsec_class{
    float: left;
    height: 100%;
  }
  .aside_class{
    float: left;
    min-height: 100%;
    width: 230px;
    background: #9dc9fb;
  }
  .el-menu-vertical-demo{
    background: #9dc9fb;
  }
  .right_class{
    margin-left: 250px;
    width: 70%;
  }
  .goods_class {
    height: 705px;
  }
</style>
