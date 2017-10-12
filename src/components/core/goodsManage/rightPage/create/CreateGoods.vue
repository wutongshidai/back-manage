<template>
  <div class="tmenu_class">
    <div class="tmenu_left">
      <el-form class="creat_form" label-width="110px">
        <el-form-item label="商品标题">
          <el-input  class="creat_form_input" v-model="goods.gdName" placeholder="请输入商品名称(不超过30字)" :maxlength="30"></el-input>
        </el-form-item>
        <el-form-item label="商品价格(元)">
          <!--<el-input-number v-model="goods.price" @change="handlePrice(goods.price)"></el-input-number>-->
          <InputNumber  class="creat_form_input" :min="0" :step="1" :max="999999.99" v-model="goods.gdPrice" @on-change="handlePrice(goods.gdPrice)" style="width: 204px"></InputNumber>
        </el-form-item>
        <el-form-item label="商品产地">
          <el-select  class="creat_form_input" v-model="goods.gdPlace" placeholder="请选择">
            <el-option
              v-for="item in origins"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品类别">
          <el-cascader
            class="creat_form_input"
            expand-trigger="hover"
            :options="option2"
            :show-all-levels="false"
            v-model="goods.categories">
          </el-cascader>
        </el-form-item>
        <el-form-item label="商品规格">
          <el-input class="creat_form_input" v-model="goods.gdOrder" placeholder="例：30x30cm ; 6kg ; 袋; 桶;"></el-input>
        </el-form-item>
        <el-form-item label="库存数量">
          <InputNumber class="creat_form_input" :min="0" :step="1" v-model="goods.gdNumber" @on-change="handleNum(goods.gdNumber)" style="width: 204px"></InputNumber>
        </el-form-item>
        <el-form-item label="颜色分类">
          <el-input class="creat_form_input" v-model="goods.gdColour" placeholder="如果需要区分颜色，请填写"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="tmenu_right">
      <el-form>
        <el-form-item label="商品详情图片">
          <!--<el-input-->
            <!--type="textarea"-->
            <!--:rows="6"-->
            <!--placeholder="请输入内容"-->
            <!--v-model="goods.description">-->
          <!--</el-input>-->
          <el-upload
            id="description"
            class="description"
            action="http://www.wutongsd.com/uploadOss.do"
            :on-remove="descriptionRemove"
            :on-success="descriptionSuccess"
            :before-upload="beforeDescriptionUpload"
            :on-error="descriptionErrors"
            v-bind:disabled="descriptionbt">
            <el-button size="small" type="primary" v-bind:disabled="descriptionbt">点击上传</el-button>
            <el-tag type="gray">商品的详情内容；只能上传jpg格式,最多传10张</el-tag>
          </el-upload>
        </el-form-item>
      </el-form>
      <el-form class="pic_form">
        <el-form-item label="商品展示图片">
          <!--action="https://jsonplaceholder.typicode.com/posts/"-->
          <el-upload
            action="http://www.wutongsd.com/uploadOss.do"
            class="pic"
            :on-remove="picRemove"
            :on-success="picSuccess"
            :before-upload="beforepicUpload"
            :on-error="picErrors"
            v-bind:disabled="handbt">
            <el-button size="small" type="primary" v-bind:disabled="handbt">点击上传</el-button>
            <el-tag type="gray">商品的展示内容；只能上传jpg格式,最多传8张</el-tag>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
    <div class="tmenu_bott">
      <el-button type="primary" @click="saveGoods()">保存</el-button>
      <!--<el-button type="primary">关闭</el-button>-->
    </div>
  </div>
</template>
<script>
  import option from '../../../../../utils/inputOptions'
  export default {
    components: {},
    name: 'home',
    data () {
      return {
        textarea: '',
        handbt: false,
        descriptionbt: false,
        files: 0,
        disfiles: 0,
        dialogImageUrl: '',
        dialogVisible: false,
        num1: '',
        num2: '',
        input1: '',
        input2: '',
        input3: '',
        imageUrl: '',
        origins: [{
          value: '1',
          label: '北京'
        }, {
          value: '2',
          label: '上海'
        }, {
          value: '3',
          label: '天津'
        }, {
          value: '4',
          label: '重庆'
        }, {
          value: '5',
          label: '河北省'
        }, {
          value: '6',
          label: '山西省'
        }, {
          value: '7',
          label: '辽宁省'
        }, {
          value: '8',
          label: '吉林省'
        }, {
          value: '9',
          label: '黑龙江省'
        }, {
          value: '10',
          label: '江苏省'
        }, {
          value: '11',
          label: '浙江省'
        }, {
          value: '12',
          label: '安徽省'
        }, {
          value: '13',
          label: '福建省'
        }, {
          value: '14',
          label: '江西省'
        }, {
          value: '15',
          label: '山东省'
        }, {
          value: '16',
          label: '河南省'
        }, {
          value: '17',
          label: '湖北省'
        }, {
          value: '18',
          label: '湖南省'
        }, {
          value: '19',
          label: '广东省'
        }, {
          value: '20',
          label: '海南省'
        }, {
          value: '21',
          label: '四川省'
        }, {
          value: '22',
          label: '贵州省'
        }, {
          value: '23',
          label: '云南省'
        }, {
          value: '24',
          label: '陕西省'
        }, {
          value: '25',
          label: '甘肃省'
        }, {
          value: '26',
          label: '青海省'
        }, {
          value: '27',
          label: '内蒙古'
        }, {
          value: '28',
          label: '广西'
        }, {
          value: '29',
          label: '西藏'
        }, {
          value: '30',
          label: '宁夏'
        }, {
          value: '31',
          label: '新疆'
        }, {
          value: '32',
          label: '香港'
        }, {
          value: '33',
          label: '澳门'
        }, {
          value: '34',
          label: '台湾'
        }],
        option2: [],
        value: '',
        successFiles: [],
        successDisFiles: [],
        goods: {
          // 标题
          gdName: '',
          // 价格
          gdPrice: null,
          // 产地
          gdPlace: '',
          // 类别
          categories: [],
          // 规格
          gdOrder: '',
          // 颜色分类
          gdColour: '',
          // 数量
          gdNumber: null,
          // 描述
          gdDeimg: '',
          // 图片
          gdImg: '',
          // 店铺ID
          adExId: ''
        }
      }
    },
    methods: {
      // 移除展示图片
      picRemove (file, fileList) {
        this.files = fileList.length
        console.log(this.files)
        let successFiles = this.successFiles
        for (let i = 0; i < successFiles.length; i++) {
          if (successFiles[i].uid === file.uid) {
            successFiles.splice(i, 1)
            this.successFiles = successFiles
          }
        }
        if (this.files < 8) {
          this.handbt = false
        }
      },
      // 展示图片上传失败
      picErrors (err1, file, fileList) {
        this.files = fileList.length
        console.log(this.files)
        if (this.files < 8) {
          this.handbt = false
        }
        this.$message.error('服务器出了点问题正在抢修,请稍后再试')
      },
      // 展示图片上传前
      beforepicUpload () {
        this.files++
        if (this.files === 8) {
          this.handbt = true
        }
      },
      // 展示图片上传成功
      picSuccess (res, file, filelist) {
        if (res.success) {
          let successFile = {}
          successFile.uid = file.uid
          successFile.upName = res.filename
          this.successFiles.push(successFile)
        } else {
          filelist.pop()
        }
      },

      // 移除描述图片
      descriptionRemove (file, fileList) {
        this.disfiles = fileList.length
        let successFiles = this.successDisFiles
        for (let i = 0; i < successFiles.length; i++) {
          if (successFiles[i].uid === file.uid) {
            successFiles.splice(i, 1)
            this.successDisFiles = successFiles
          }
        }
        if (this.disfiles < 10) {
          this.descriptionbt = false
        }
      },
      // 描述图片上传失败
      descriptionErrors (err0, file, fileList) {
        this.$message.error('服务器出了点问题正在抢修,请稍后再试')
        this.disfiles = fileList.length
        if (this.disfiles < 10) {
          this.descriptionbt = false
        }
      },
      // 描述图片上传前
      beforeDescriptionUpload () {
        this.disfiles++
        if (this.disfiles === 10) {
          this.descriptionbt = true
        }
      },
      // 描述图片上传成功
      descriptionSuccess (res, file, filelist) {
        if (res.success) {
          let successFile = {}
          successFile.uid = file.uid
          successFile.upName = res.filename
          this.successDisFiles.push(successFile)
        } else {
          filelist.pop()
        }
      },
      // 创建商品
      saveGoods () {
        let goods = this.goods
        let categories = goods.categories
        if (goods.gdName === '') {
          this.$message.error('请输入商品标题')
          return
        }
        let handlePrice2 = this.handlePrice(goods.gdPrice)
        if (goods.gdPrice === null) {
          this.$message.error('请输入价格')
          return
        }
        if (handlePrice2 != null) {
          return
        }
        if (goods.gdPlace === '') {
          this.$message.error('请选择产地')
          return
        }
        if (categories === null) {
          this.$message.error('请选择类别')
          return
        }
        if (goods.gdOrder === '') {
          this.$message.error('请输入规格')
          return
        }
        if (goods.gdNumber === null) {
          this.$message.error('请输入库存')
          return
        }
        let goodsNum = this.handleNum(goods.gdNumber)
        if (goodsNum != null) {
          return
        }
        goods.catParentid = categories[0]
        goods.catId = categories[1]
        goods.catSonid = categories[2]
//        console.log(categories)
        let successFiles = this.successFiles
        let length2 = successFiles.length
        for (let i = 0; i < length2; i++) {
          if (i < length2) {
            goods.gdImg += successFiles[i].upName + ';'
          } else {
            goods.gdImg += successFiles[i].upName
          }
        }
        let successDisFiles = this.successDisFiles
        let length = successDisFiles.length
        for (let i = 0; i < length; i++) {
          if (i < length) {
            goods.gdDeimg += successDisFiles[i].upName + ';'
          } else {
            goods.gdDeimg += successDisFiles[i].upName
          }
        }
        goods.adExId = this.$store.state.login.adminState.adExId
        this.$store.dispatch('savegoods', goods).then(
          res => {
            if (this.$store.state.goodsManage.saveState.status) {
//              alert('添加商品成功')
              this.$alert(this.$store.state.goodsManage.saveState.msg, '添加商品', {
                confirmButtonText: '确定',
                type: 'success'
              })
            } else {
//              this.$message.error(this.$store.state.goodsManage.saveState.msg)
              this.$alert(this.$store.state.goodsManage.saveState.msg, '添加商品', {
                confirmButtonText: '确定',
                type: 'error'
              })
            }
          }
        )
      },
      // 价格校验
      handlePrice (value) {
        let price = value
        price = parseFloat(price) * 100
        let reg = /.*\..*/
        if (reg.test(price)) {
          let number = Math.round(price) / 100
          if (!(value === number)) {
            this.$message.error('价格只能保留两位小数, 建议输入:' + number)
            return 'false'
          }
        }
        return null
      },
      // 库存校验
      handleNum (value) {
        let reg = /.*\..*/
        if (reg.test(value)) {
          let number = parseInt(value)
          this.$message.error('库存只能是整数,建议输入：' + number)
          return 'false'
        }
        return null
      },
      beforeAvatarUpload (file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      }
    },
    beforeMount () {
      this.option2 = option
      let s = JSON.stringify(this.origins)
      sessionStorage.setItem('place', s)
    }
  }
</script>
<style>
  .tmenu_class {
    margin-top: 10px;
    border: 1px solid #b5b5b5;
    min-height: 635px;
    padding: 0;
    width: 1020px;
  }
  .tmenu_left {
    float: left;
    width: 50%;
    margin-top: 15px;
  }
  .creat_form_input {
    width: 204px;
    float: left;
  }
  .creat_form .el-form-item {
    margin: 4px 8px;
    text-align: left;
  }
  .tmenu_right {
    margin-top: 15px;
    /*margin-left: 270px;*/
    float: left;
    width: 49%;
  }
  .description .el-upload-list__item , .pic .el-upload-list__item {
    width: 210px;
    float: left;
    margin-right: 10px;
  }
  .pic {
    height: 180px;
  }
   /*去掉第一个li的margin-top*/
  .description .el-upload-list__item:first-child , .pic .el-upload-list__item:first-child{
    margin-top: 5px;
  }
  #description ul, .pic ul{
    height: 186px;
    margin-top: 10px;
  }
</style>
