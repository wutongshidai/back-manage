<template>
  <div id="shopManage">
    <div class="left_class">
        <el-row class="tac" id="el_row">
          <el-col>
            <el-menu :default-active="active_choose" class="el-menu-vertical-demo" @select="handleOpen" >
              <el-menu-item index="1">店铺设置</el-menu-item>
              <el-menu-item index="2">店铺导航</el-menu-item>
              <el-menu-item index="3">店铺信息</el-menu-item>
              <!--<el-menu-item index="4">店铺关注</el-menu-item>-->
              <!--<el-menu-item index="3">所有商品</el-menu-item>-->
            </el-menu>
          </el-col>
        </el-row>
    </div>
    <div class="right_class">
      <shop-set-up v-if="this.active_choose == 1"></shop-set-up>
      <shop-navigation v-if="this.active_choose == 2"></shop-navigation>
      <shop-info v-if="this.active_choose == 3"></shop-info>
      <!--<shop-attention v-if="this.active_choose == 4"></shop-attention>-->
      <!--<all-goods v-if="this.active_choose == 3"></all-goods>-->
    </div>
  </div>
</template>
<script>
   import shopInfo from './rightPage/shopInfo/ShopInfo'
   import shopAttention from './rightPage/shopAttention/ShopAttention'
   import shopNavigation from './rightPage/shopNavigation/ShopNavigation'
   import shopSetUp from './rightPage/shopSetUp/ShopSetUp'
   export default {
     components: {shopInfo, shopSetUp, shopNavigation, shopAttention},
     name: 'shopManage',
     data () {
       return {
         active_choose: '1'
       }
     },
     methods: {
       handleOpen: function (key, keyPath) {
         this.active_choose = key
         console.log(this.active_choose)
       }
     }
   }
</script>
<style>
  .left_class{
    float: left;
    width: 230px;
    background: #9dc9fb;
    min-height: 705px;
  }
  .el-menu-vertical-demo{
    background: #9dc9fb;
  }
  .right_class{
    margin-left: 250px;
    width: 70%;
  }
</style>
