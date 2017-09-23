<template>
  <div id="putaway" class="putaway_class">
    <el-table
      ref="multipleTable"
      :data="goodList"
      :border=true
      height="420"
      tooltip-effect="dark"
      style="width: 1020px;"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection">
      </el-table-column>
      <el-table-column
        prop="id"
        label="ID"
        width="75">
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        width="160px"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="num"
        label="数量"
        width="68">
      </el-table-column>
      <el-table-column
        prop="price"
        label="价格"
        width="78">
      </el-table-column>
      <el-table-column
        prop="sort"
        label="类别"
        width="68">
      </el-table-column>
      <el-table-column
        prop="specification"
        label="规格"
        width="90">
      </el-table-column>
      <!--<el-table-column-->
        <!--prop="goodsVolume"-->
        <!--label="体积"-->
        <!--width="68">-->
      <!--</el-table-column>-->
      <el-table-column
        prop="description"
        label="商品描述" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="date"
        label="创建时间">
      </el-table-column>
      <el-table-column
        label="操作">
        <template scope="scope">
          <el-button type="text" size="small" @click="editGoods(scope)" >编辑</el-button>
          <el-button type="text" size="small" @click="goodsList1(scope)" >上架</el-button>
          <el-button type="text" size="small" @click="handleDelete(scope, tableData3)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-button type="primary" style="margin-top: 10px">批量上架商品</el-button>
      <el-button type="primary" style="margin-top: 10px" @click = moreDelete(tableData3)>批量删除商品</el-button>
    </div>
    <el-dialog title="修改商品信息" v-model="dialogFormVisible">
      <el-form>
        <el-form-item label="名称" label-width="100px">
          <el-input v-model="selectTable.name"></el-input>
        </el-form-item>
        <el-form-item label="数量" label-width="100px">
          <el-input-number v-model="selectTable.num"  style="line-height: normal"></el-input-number>
        </el-form-item>
        <el-form-item label="价格" label-width="100px">
          <el-input v-model="selectTable.price"></el-input>
        </el-form-item>
        <el-form-item label-width="100px" label="商品描述">
          <el-input
            type="textarea"
            :rows="6"
            placeholder="请输入内容"
            v-model="selectTable.description">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmEdit(selectTable)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import createGoods from './CreateGoods.vue'
  export default {
    components: {createGoods},
    data () {
      return {
        goodList: [{
          id: '1',
          name: '王小虎牌水泥',
          num: '100',
          price: '10.25',
          sort: '建材',
          specification: '23',
          description: '船运撒村的撒出啊是线程V型正常V型存在V型在V型从V字形V型正常V型在想',
          date: '2016-05-03'
        }],
        dialogFormVisible: false,
        selectTable: {},
        selections: []
      }
    },
    methods: {
      handleSelect (key) {
        console.log(key)
        this.local_choose = key
      },
      editGoods (scope) {
        console.log(scope)
        this.selectTable = scope.row
        this.dialogFormVisible = true
      },
      handleDelete (scope, rows) {
        this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          rows.splice(scope.$index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      },
      handleSelectionChange (val) {
        console.log(val)
        this.selections = val
      },
      putawayGoods (val) {
        console.log(val.row.id)
        this.selections = val
        const h = this.$createElement
        this.$msgbox({
          title: '上架商品',
          message: h('p', null, [
            h('span', null, '确定上架此商品？'),
            h('B', { style: 'color: red' }, '商品ID ： ' + val.row.id)
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true
              instance.confirmButtonText = '执行中...'
              setTimeout(() => {
                done()
                setTimeout(() => {
                  instance.confirmButtonLoading = false
                }, 300)
              }, 3000)
            } else {
              done()
            }
          }
        }).then(action => {
          this.$message({
            type: 'info',
            message: 'action: ' + action
          })
        })
      },
      confirmEdit (selectTable) {
        console.log(selectTable)
      },
      moreDelete (rows) {
        let selects = this.selections
        this.$confirm('此操作将永久删除商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          for (let i = 0; i < selects.length; i++) {
//          let id = selects [i].id;
            let index = selects[i].$index
            rows.splice(index, 1)
            this.$refs.multipleTable.clearSelection(index)
          }
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }
    }
  }
</script>
<style>
  .putaway_class {
    margin-top: 10px;
    border: 1px solid #b5b5b5;
    min-height: 473px;
    padding: 0;
    width: 1020px;
  }
  .el-form-item__content {
    line-height: normal;
  }
  .el-table th {
    text-align: center;
  }
</style>
