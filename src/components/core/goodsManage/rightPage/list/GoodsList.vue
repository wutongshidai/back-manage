<template>
  <div id="putaway" class="putaway_class">
    <el-table
      ref="multipleTable"
      :data="goodList"
      :border=true
      height="635"
      tooltip-effect="dark"
      style="width: 1020px;">
      <!--<el-table-column type="selection">-->
      <!--</el-table-column>-->
      <el-table-column
        prop="gdId"
        label="ID"
        width="75" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="gdName"
        label="名称"
        width="160px"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="gdNumber"
        label="数量"
        width="68" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="gdPrice"
        label="价格"
        width="78" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="gdPlace"
        label="产地"
        width="68" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="catSon"
        label="商品类别" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="gdOrder"
        label="规格"
        width="90" show-overflow-tooltip>
      </el-table-column>
      <!--<el-table-column-->
        <!--prop="goodsVolume"-->
        <!--label="体积"-->
        <!--width="68">-->
      <!--</el-table-column>-->
      <el-table-column
        prop="gdColour"
        label="颜色分类"  show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="gdTime"
        label="创建时间"  show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="操作">
        <template scope="scope">
          <el-button type="text" size="small" @click="editGoods(scope)" >编辑</el-button>
          <el-button type="text" size="small" @click="putawayGoods(scope)" v-if="goodList[scope.$index].gdDisplay === '0'">上架</el-button>
          <el-button type="text" size="small" @click="soldOutGoods(scope)" v-if="goodList[scope.$index].gdDisplay === '1'">下架</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="修改商品信息" v-model="dialogFormVisible" size="tiny" :show-close=false  :close-on-press-escape= "dialog_close" :close-on-click-modal = "dialog_close" class="editGoods_class">
      <el-form>
        <el-form-item label="名称" label-width="100px">
          <el-input v-model="selectTable.gdName" class="name_class"></el-input>
        </el-form-item>
        <el-form-item label="数量" label-width="100px">
          <InputNumber class="num_form_input" :min="0" :step="1" v-model="selectTable.gdNumber" @on-change="handleNum1()"></InputNumber>
        </el-form-item>
        <el-form-item label="价格" label-width="100px">
          <InputNumber class="num_form_input"  :max="999999.99" :min="0" :step="1" v-model="selectTable.gdPrice" @on-change="handlePrice1()"></InputNumber>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :disabled = "editDisabled" @click="dialogFormVisible = false" class="dialog_btt">取 消</el-button>
        <el-button :disabled = "editDisabled" type="primary" :icon="loading" @click="confirmEdit(selectTable)" class="dialog_btt">{{bttMsg}}</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :title="titleTip"
      v-model="dialogputVisible"
      :show-close=false  :close-on-press-escape= "dialog_close" :close-on-click-modal = "dialog_close"
      size="tiny" class="putGoods_class">
      <span>{{putLog}}</span>
      <span style="display: block; color: red; margin-top: 20px">{{goodsName}}</span>
      <span slot="footer" class="dialog-footer">
    <el-button :disabled = "putDisable" @click="dialogputVisible = false">取 消</el-button>
    <el-button :disabled = "putDisable"  :icon="putloading" type="primary" @click="putaway()" >{{bttMsg}}</el-button>
  </span>
    </el-dialog>
  </div>
</template>
<script>
  import options from '../../../../../utils/inputOptions'
  import place from '../../../../../utils/inputOptions2'
  export default {
    data () {
      return {
        putDisable: false,
        gdId: '',
        goodsName: '',
        putLog: '',
        titleTip: '',
        dialogputVisible: false,
        editDisabled: false,
        bttMsg: '确 定',
        loading: '',
        putloading: '',
        goodList: [],
        dialogFormVisible: false,
        selectTable: {},
        selections: [],
        dialog_close: true,
        commitnFlag: '',
        commitpFlag: true
      }
    },
    methods: {
      // 商品上、下架
      putaway () {
        if (this.titleTip === '上架') {
          var goods = {
            'gdId': this.gdId,
            'gdDisplay': '1'
          }
        } else if (this.titleTip === '下架') {
          goods = {
            'gdId': this.gdId,
            'gdDisplay': '0'
          }
        } else {
          return
        }
        this.putloading = 'loading'
        this.bttMsg = '请求中'
        this.putDisable = true
        this.dialog_close = false
        this.$store.dispatch('editGood', goods).then(
          () => {
            this.initList()
            this.dialogputVisible = false
            this.putloading = ''
            this.bttMsg = '确定'
            this.putDisable = false
            this.dialog_close = true
            console.log(this.$store.state.goodsManage.editGoodsFlag)
          }
        )
      },
      // 库存校验
      handleNum1 () {
        let value = this.selectTable.gdNumber
        console.log(this.selectTable.gdNumber)
        let reg = /.*\..*/
        if (reg.test(value)) {
          let number = parseInt(value)
          this.$message.error('库存只能是整数,建议输入：' + number)
          this.commitnFlag = false
          return 'false'
        } else {
          this.commitnFlag = true
        }
        return null
      },
      // 价格校验
      handlePrice1 () {
        let value = this.selectTable.gdPrice
        let price = value
        price = parseFloat(price) * 100
        let reg = /.*\..*/
        if (reg.test(price)) {
          let number = Math.round(price) / 100
          if (value !== number) {
            this.$message.error('价格只能保留两位小数, 建议输入:' + number)
            this.commitpFlag = false
            return false
          }
        } else {
          console.log(123)
          this.commitpFlag = true
        }
      },
      // table页切换
      handleSelect (key) {
        console.log(key)
        this.local_choose = key
      },
      // 展示编辑页
      editGoods (scope) {
        this.selectTable = scope.row
        this.dialogFormVisible = true
      },
      // 上架页面展示
      putawayGoods (val) {
        this.dialogputVisible = true
        this.titleTip = '上架'
        this.putLog = '确定上架此商品吗？'
        this.goodsName = val.row.gdName
        this.gdId = val.row.gdId
      },
      soldOutGoods (val) {
        this.dialogputVisible = true
        this.titleTip = '下架'
        this.putLog = '确定下架此商品吗？'
        this.goodsName = val.row.gdName
        this.gdId = val.row.gdId
      },
      initList () {
        let adExId = this.$store.state.login.adminState.adExId
        this.$store.dispatch('getGoods', {'adExId': adExId}).then(
          () => {
            let data2 = this.$store.state.goodsManage.goods_list
            if (data2 !== null) {
              for (let i = 0; i < data2.length; i++) {
                let catParentid = data2[i].catParentid
                let catId = data2[i].catId
                let catSonid = data2[i].catSonid
                let gdPlace = data2[i].gdPlace
                // 遍历类别
                for (let j = 0; j < options.length; j++) {
                  if (options[j].value === catParentid + '') {
                    let children = options[j].children
                    for (let k = 0; k < children.length; k++) {
                      if (children[k].value === catId + '') {
                        let children1 = children[k].children
                        for (let d = 0; d < children1.length; d++) {
                          if (children1[d].value === catSonid + '') {
                            data2[i].catSon = children1[d].label
                          }
                        }
                      }
                    }
                  }
                }
                // 遍历产地
                for (let j = 0; j < place.length; j++) {
                  if (place[j].value === gdPlace + '') {
                    data2[i].gdPlace = place[j].label
                  }
                }
                let gdTime = data2[i].gdTime
                data2[i].gdTime = new Date(gdTime).toLocaleString()
              }
              this.goodList = data2
            }
          }
        )
      },
      confirmEdit (selectTable) {
        this.handleNum1()
        this.handlePrice1()
        console.log(this.commitnFlag)
        console.log(this.commitpFlag)
        if (!this.commitnFlag) {
          return false
        }
        if (!this.commitpFlag) {
          return false
        }
        this.loading = 'loading'
        this.bttMsg = '发送中'
        this.editDisabled = true
        this.dialog_close = false
        delete selectTable.gdTime
        this.$store.dispatch('editGood', selectTable).then(
          () => {
            this.initList()
            this.dialogFormVisible = false
            this.loading = ''
            this.bttMsg = '确定'
            this.editDisabled = false
            this.dialog_close = true
            let editGoodsFlag = this.$store.state.goodsManage.editGoodsFlag
            console.log(editGoodsFlag)
            if (editGoodsFlag.status) {
              this.$message({
                showClose: false,
                message: '编辑商品成功',
                type: 'success'
              })
            } else {
              this.$message.error('编辑商品失败，请稍后再试')
            }
          }
        )
        console.log(selectTable)
      }
      //      changepage (page) {
//        console.log(page)
//      },
      // 多选
//      handleSelectionChange (val) {
//        console.log(val)
//        this.selections = val
//      },
      // 批量删除
//      moreDelete (rows) {
//        let selects = this.selections
//        this.$confirm('此操作将永久删除商品, 是否继续?', '提示', {
//          confirmButtonText: '确定',
//          cancelButtonText: '取消',
//          type: 'warning'
//        }).then(() => {
//          for (let i = 0; i < selects.length; i++) {
//          let id = selects [i].id;
//            let index = selects[i].$index
//            rows.splice(index, 1)
//            this.$refs.multipleTable.clearSelection(index)
//          }
//          this.$message({
//            type: 'success',
//            message: '删除成功!'
//          })
//        })
//      }
    },
    created () {

    },
    mounted () {
      this.initList()
    }
  }
</script>
<style>
  .editGoods_class .el-dialog--tiny{
    width: 400px;
    /*display: inline-block;*/
  }
  .putGoods_class .el-dialog--tiny{
    width: 400px;
    /*display: inline-block;*/
  }
  .editGoods_class .name_class{
    /*width: 400px;*/
    /*display: inline-block;*/
    width: 220px;
  }
  .editGoods_class .num_form_input{
    /*width: 400px;*/
    /*display: inline-block;*/
    width: 220px;
    /*position: relative;*/
  }
  .putaway_class {
    margin-top: 10px;
    border: 1px solid #b5b5b5;
    min-height: 635px;
    padding: 0;
    width: 1020px;
  }
  .el-form-item__content {
    line-height: normal;
  }
  .el-table th {
    text-align: center;
  }
  .dialog_btt {
    width: 95px;
  }
</style>
