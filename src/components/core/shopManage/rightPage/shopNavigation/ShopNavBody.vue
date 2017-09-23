<template>
  <div id="shopNavBody" class="nav_body">
    <div class="nav_head">
      <span class="nav_head_span">导航列表</span>
      <el-button type="primary" class="nav_head_btt" @click="showNavEdit(0)">添加导航</el-button>
    </div>
    <div class="nav_table">
      <el-table
        :data="navData"
        border
        style="width: 100%">
        <el-table-column
          prop="naName"
          label="导航名称"
          width="360">
        </el-table-column>
        <el-table-column
          prop="cat"
          label="关联分类"
          width="320">
        </el-table-column>
        <el-table-column
          prop="naDisplays"
          label="是否显示"
          width="140">
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作">
          <template scope="scope">
            <el-button type="text" size="small" @click="showNavEdit(1, scope)"
                       v-if="!(scope.row.naName ==='首页' || scope.row.naName ==='全部商品')">编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog :title=titleTip :visible.sync="dialogTableVisible" size="tiny"  :close-on-press-escape= "dialog_close" :close-on-click-modal = "dialog_close" :show-close=false class="editNav_class">
        <ul class="nav_add">
          <li>
              <span>
                 <label>
                 导航名称 :
                 </label>
              </span>
            <span class="add_navName">
              <el-input v-model="dialog_table.naName" :maxlength=8 style="width: 198px"></el-input>
              </span>
          </li>
          <li>
               <span class="add_isShow_label">
                 <label>
                 是否显示 :
                 </label>
               </span>
            <span class="add_isShow">
                  <el-radio class="radio" v-model="naDisplay" label="1">是</el-radio>
                  <el-radio class="radio" v-model="naDisplay" label="0">否</el-radio>
               </span>
          </li>
          <li>
            <span>
              <label>
                关联分类 :
              </label>
            </span>
            <span class="add_navName">
              <el-select v-model="catId" placeholder="请选择">
                <el-option
                  v-for="item in option2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </span>
          </li>
          <li>
            <el-button type="primary" @click="editNav">提交</el-button>
          </li>
        </ul>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import option2 from '../../../../../utils/inputOptions3'
  export default {
    data () {
      return {
        titleTip: '',
        isEdit: '',
        isShow: '',
        dialogTableVisible: false,
        navName: '',
        navData: [],
        option2: [],
        dialog_table: {
          naName: '',
          naDisplay: 0,
          catId: '',
          adExId: ''
        },
        catId: '',
        adExId: '',
        naDisplay: '0',
        dialog_close: true
      }
    },
    methods: {
      editNav () {
        this.dialog_table.adExId = this.adExId
        this.dialog_table.catId = this.catId
        this.dialog_table.naDisplay = this.naDisplay
        this.dialog_close = false
        if (this.isEdit === 0) {
          // 添加导航
          console.log(this.dialog_table)
          this.$store.dispatch('addNav', this.dialog_table).then(
            () => {
              let addNavState = this.$store.state.shopManage.addNavState
              this.dialog_close = true
              if (addNavState.status) {
                this.dialogTableVisible = false
                this.selectNav()
                this.$message({
                  showClose: false,
                  message: addNavState.msg,
                  type: 'success'
                })
              } else {
                this.$message.error(addNavState.msg)
              }
            }
          )
        } else if (this.isEdit === 1) {
          // 编辑导航
          console.log('编辑导航')
          console.log(this.dialog_table)
          this.$store.dispatch('upNav', this.dialog_table).then(
            () => {
              let upNavState = this.$store.state.shopManage.upNavState
              this.dialog_close = true
              if (upNavState.status) {
                this.dialogTableVisible = false
                this.selectNav()
                this.$message({
                  showClose: false,
                  message: upNavState.msg,
                  type: 'success'
                })
              } else {
                this.$message.error(upNavState.msg)
              }
            }
          )
        }
      },
      selectNav () {
        let adExId = this.adExId
        this.$store.dispatch('selectNav', {'adExId': adExId}).then(
          () => {
            let selectNavState = this.$store.state.shopManage.selectNavState
            let nav = [
              {
                naName: '首页',
                naDisplay: '1',
                naDisplays: '是',
                cat: null,
                catId: ''
              },
              {
                naName: '全部商品',
                naDisplay: '1',
                naDisplays: '是',
                cat: null,
                catId: ''
              }
            ]
            if (selectNavState !== null) {
              for (let i = 0; i < selectNavState.length; i++) {
                let naDisplay = selectNavState[i].naDisplay
                if (naDisplay === 0) {
                  selectNavState[i].naDisplays = '否'
                } else if (naDisplay === 1) {
                  selectNavState[i].naDisplays = '是'
                }
                for (let j = 0; j < option2.length; j++) {
                  if (selectNavState[i].catId + '' === option2[j].value + '') {
                    selectNavState[i].cat = option2[j].label
                  }
                }
                let navDate = {}
                navDate.naName = selectNavState[i].naName
                navDate.naDisplays = selectNavState[i].naDisplays
                navDate.naDisplay = selectNavState[i].naDisplay + ''
                navDate.naId = selectNavState[i].naId
                navDate.catId = selectNavState[i].catId + ''
                navDate.cat = selectNavState[i].cat
                nav.push(navDate)
//                console.log(nav)
              }
              this.navData = nav
            }
          }
        )
      },
      showNavEdit (flag, scope) {
        if (flag === 1) {
          this.isEdit = 1
          this.titleTip = '编辑导航'
          if (scope !== null) {
            this.dialog_table = scope.row
            this.catId = this.dialog_table.catId
            this.naDisplay = this.dialog_table.naDisplay + ''
//            console.log(scope.row)
          }
        } else if (flag === 0) {
          this.dialog_table = {}
          this.naDisplay = '0'
          this.catId = null
          this.isEdit = 0
          this.titleTip = '添加导航'
        }
        this.dialogTableVisible = true
      }
    },
    beforeMount () {
      this.adExId = this.$store.state.login.adminState.adExId
      this.selectNav()
      this.option2 = option2
    }
  }
</script>
<style>
  .nav_body {
    width: 1020px;
    margin-top: 25px;
    height: 620px;
    border: 1px solid #aaaaaa;
    overflow-y: auto;
  }
  .editNav_class .el-dialog--tiny{
    width: 400px;
  }
  .nav_head_span {
    margin: 20px 50px;
    float: left;
    font-size: 20px;
    width: 730px;
    text-align: left;
  }

  .nav_head_btt {
    margin-top: 20px;
  }

  .nav_table {
    margin: 0px 50px;
  }

  .nav_add li {
    height: 40px;
    margin: 5px 10px;
  }

  .nav_add button {
    width: 120px;
    margin-top: 10px;
  }

  .add_isShow {
    display: inline-block;
    text-align: left;
    width: 70%;
    margin-top: 5px;
    padding-left: 17px;
  }
  .add_navName {
    display: inline-block;
    width: 70%;
    padding: 0px;
  }
</style>
