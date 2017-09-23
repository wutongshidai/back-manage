<template>
  <div class="attention_body">
    <div class="atten_head">
      <span class="atten_head_span">店铺关注</span>
    </div>
    <div class="atten_table">
      <el-table
        :data="attentions"
        border
        style="width: 100%">
        <el-table-column
          type="selection">
        </el-table-column>
        <el-table-column
          prop="id"
          label="会员ID">
        </el-table-column>
        <el-table-column
          prop="name"
          label="会员名称">
        </el-table-column>
        <el-table-column
          prop="time"
          label="关注时间">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        attentions: [
          {
            id: '1',
            name: '梧桐',
            time: '2017-9-5'
          },
          {
            id: '2',
            name: '梧桐',
            time: '2017-9-5'
          },
          {
            id: '3',
            name: '梧桐',
            time: '2017-9-5'
          }
        ]
      }
    },
    methods: {
    }
  }
</script>
<style>
  .attention_body {
    width: 1020px;
    margin-top: 25px;
    height: 620px;
    border: 1px solid #aaaaaa;
    overflow-y: auto;
  }
  .atten_head_span {
    margin: 20px 50px;
    float: left;
    font-size: 20px;
    width: 730px;
    text-align: left;
  }
  .atten_table {
    margin: 0px 50px;
  }
</style>
