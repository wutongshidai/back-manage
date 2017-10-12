<template>
  <div>
    <div class="content_table" v-if="editFlag">
      <ul>
        <li class="content_table_p">公司及联系人信息</li>
        <li class="ul_li_dub"><span>公司名称:</span><b style="display: inline-block; width: 200px">{{company.companyName}}</b><span>公司性质:</span><input v-model="company.adCompanyNature" type="text"/></li>
        <li class="ul_li_one"><span>公司网址:</span><input v-model="company.adCompanyUrl" type="text"/></li>
        <li class="ul_li_one"><span>公司所在地:</span><input  v-model="company.adCompanyAddress" type="text"/></li>
        <li class="ul_li_one"><span>固定电话:</span><input placeholder="010-00000000" @blur="check_companyPhone" v-model="company.adCompanyPhone" type="text"/></li>
        <li class="ul_li_dub"><span>邮政编码:</span><input @blur="check_companyCode" v-model="company.adCompanyCode" type="text"/><span>电子邮箱:</span><input @blur="check_companyMail" v-model="company.adCompanyMail" type="text"/></li>
        <li class="ul_li_one"><span>联系人姓名:</span><input v-model="company.adCompanyContacts" type="text"/></li>
        <li class="ul_li_one"><span>联系人电话:</span><input  @blur="check_companyContacts" placeholder="建议提供销售联系人的电话" v-model="company.adCompanyContactsnumber" type="text"/></li>
        <li class="content_table_p">开户行信息</li>
        <li class="ul_li_one"><span>银行开户名:</span><input v-model="company.adBankUsername" type="text"/></li>
        <li class="ul_li_one"><span>公司银行账号:</span><input @blur="check_bankNumber" v-model="company.adBankNumber" type="text"/></li>
        <li class="ul_li_one"><span>开户银行支行名称:</span><input v-model="company.adBankName" type="text"/></li>
        <li class="ul_li_one"><span>开户银行所在地:</span><input v-model="company.adBankAddress" type="text"/></li>
        <li class="content_table_p">店铺经营信息</li>
        <li class="ul_li_dub"><span>卖家账号:</span><b style="display: inline-block; width: 200px">{{company.userName}}</b><span>店铺名称:</span><b v-if="!this.inputFlag" style="display: inline-block; width: 200px">{{company.adShopName}}</b><input v-if="this.inputFlag" v-model="company.adShopName"/></li>
        <li class="ul_li_dub"><span>店铺负责人:</span><input v-model="company.adShopUsername" type="text"/><span>负责人手机号码:</span><input @blur="check_shopPhone" v-model="company.adShopPhone" type="text"/></li>
        <li class="ul_li_dub"><span>负责人QQ号码:</span><input v-model="company.adShopQq" type="text"/></li>
        <li class="content_table_p">证件信息</li>
        <li class="ul_li_ther"><span style="float: left">企业营业执照副本:</span>
          <el-upload
            class="avatar-uploader"
            action="http://www.wutongsd.com/uploadOssCard.do"
            :show-file-list="false"
            :on-success="picSuccess1"
            :before-upload="picUploadbefore">
            <img v-if="this.company.adLicenseImg !== ''" :src="'http://wut3.oss-cn-beijing.aliyuncs.com/' + this.company.adLicenseImg" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>

        </li>
        <li class="ul_li_ther two"><span style="float: left">法人身份证:</span>
          <el-upload
            class="avatar-uploader"
            action="http://www.wutongsd.com/uploadOssCard.do"
            :show-file-list="false"
            :on-success="picSuccess2"
            :before-upload="picUploadbefore">
            <img v-if="this.company.adLegalImg !== ''" :src="'http://wut3.oss-cn-beijing.aliyuncs.com/' + this.company.adLegalImg"  class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </li>
        <li class="ul_li_ther two twos"><span style="float: left">店铺负责人身份证:</span>
          <el-upload
            class="avatar-uploader"
            action="http://www.wutongsd.com/uploadOssCard.do"
            :show-file-list="false"
            :on-success="picSuccess3"
            :before-upload="picUploadbefore">
            <img v-if="this.company.adManageImg !== ''" :src="'http://wut3.oss-cn-beijing.aliyuncs.com/' + this.company.adManageImg" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <!--<button type="">上传</button>-->
        </li>
        <li class="ul_li_f">
          <button @click="subExInfo">确认提交</button>
        </li>
      </ul>
    </div>
    <div class="content_table" v-if="!editFlag">
      <ul>
        <li class="content_table_p">公司及联系人信息</li>
        <li class="ul_li_dub"><span>公司名称:</span><span class="content_table_span">{{company.companyName}}</span><span>公司性质:</span><span class="content_table_span">{{company.adCompanyNature}}</span></li>
        <li class="ul_li_one"><span>公司网址:</span><span class="content_table_span">{{company.adCompanyUrl}}</span></li>
        <li class="ul_li_one"><span>公司所在地:</span><span class="content_table_span">{{company.adCompanyAddress}}</span></li>
        <li class="ul_li_one"><span>固定电话:</span><span class="content_table_span">{{company.adCompanyPhone}}</span></li>
        <li class="ul_li_dub"><span>邮政编码:</span><span class="content_table_span">{{company.adCompanyCode}}</span><span>电子邮箱:</span><span class="content_table_span">{{company.adCompanyMail}}</span></li>
        <li class="ul_li_one"><span>联系人姓名:</span><span class="content_table_span">{{company.adCompanyContacts}}</span></li>
        <li class="ul_li_one"><span>联系人电话:</span><span class="content_table_span">{{company.adCompanyContactsnumber}}</span></li>
        <li class="content_table_p">开户行信息</li>
        <li class="ul_li_one"><span>银行开户名:</span><span class="content_table_span">{{company.adBankUsername}}</span></li>
        <li class="ul_li_one"><span>公司银行账号:</span><span class="content_table_span">{{company.adBankNumber}}</span></li>
        <li class="ul_li_one"><span>开户银行支行名称:</span><span class="content_table_span">{{company.adBankName}}</span></li>
        <li class="ul_li_one"><span>开户银行所在地:</span><span class="content_table_span">{{company.adBankAddress}}</span></li>
        <li class="content_table_p">店铺经营信息</li>
        <li class="ul_li_dub"><span>卖家账号:</span><span class="content_table_span">{{company.userName}}</span><span>店铺名称:</span><span class="content_table_span"><b style="display: inline-block; width: 200px">{{company.adShopName}}</b></span></li>
        <li class="ul_li_dub"><span>店铺负责人:</span><span class="content_table_span">{{company.adShopUsername}}</span><span>负责人手机号码:</span><span class="content_table_span">{{company.adShopPhone}}</span></li>
        <li class="ul_li_dub"><span>负责人QQ号码:</span><span class="content_table_span">{{company.adShopQq}}</span></li>
        <li class="content_table_p">证件信息</li>
        <li class="ul_li_ther"><span style="float: left">企业营业执照副本:</span>
          <img v-if="this.company.adLicenseImg !== ''" :src="'http://wut3.oss-cn-beijing.aliyuncs.com/' + this.company.adLicenseImg" class="avatar">
        </li>
        <li class="ul_li_ther two"><span style="float: left">法人身份证:</span>
          <img v-if="this.company.adLicenseImg !== ''" :src="'http://wut3.oss-cn-beijing.aliyuncs.com/' + company.adLegalImg" class="avatar">
        </li>
        <li class="ul_li_ther two twos"><span style="float: left">店铺负责人身份证:</span>
          <img v-if="this.company.adLicenseImg !== ''" :src="'http://wut3.oss-cn-beijing.aliyuncs.com/' + company.adManageImg" class="avatar">
        </li>
        <li class="ul_li_f">
          <button v-on:click="editInfo">修改信息</button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        editFlag: false,
        company: {
          adId: '',
          adCompanyNature: '',
          adCompanyUrl: '',
          adCompanyAddress: '',
          adCompanyPhone: '',
          adCompanyCode: '',
          adCompanyMail: '',
          adCompanyContacts: '',
          adCompanyContactsnumber: '',
          adBankUsername: '',
          adBankNumber: '',
          adBankName: '',
          adBankAddress: '',
          adShopName: '',
          adShopUsername: '',
          adShopQq: '',
          adShopPhone: '',
          adLicenseImg: '',
          adLegalImg: '',
          adManageImg: ''
        },
        inputFlag: false,
        adExId: ''
      }
    },
    methods: {
      editInfo () {
        console.log(this.company.adShopName === null)
        if (this.company.adShopName === '') {
          this.inputFlag = true
        }
        this.editFlag = true
      },
      selectInfo () {
        let adExId = this.adExId
        this.$store.dispatch('selectInfo', {'adExId': adExId}).then(
          () => {
            let shopInfo = this.$store.state.shopManage.shopInfo
            if (shopInfo.status) {
              this.company = shopInfo.company
            } else {
              this.$message.error(shopInfo.msg)
            }
          }
        ).catch(
          () => {
            this.$message.error('服务器炸了。请稍后再试')
          }
        )
      },
      // 企业营业执照副本
      picSuccess1 (res, file) {
        this.company.adLicenseImg = URL.createObjectURL(file.raw)
        this.company.adLicenseImg = res.filename
      },
      // 法人身份证
      picSuccess2 (res, file) {
        this.company.adLegalImg = URL.createObjectURL(file.raw)
        this.company.adLegalImg = res.filename
      },
      // 店铺负责人身份证
      picSuccess3 (res, file) {
        this.company.adManageImg = URL.createObjectURL(file.raw)
        this.company.adManageImg = res.filename
      },
      // 校验格式
      picUploadbefore (file) {
        const isJPG = (file.type === 'image/jpeg' || 'image/png')
        const isLt2M = file.size / 1024 / 100 < 2

        if (!isJPG) {
          this.$message.error('上传logo图片只能是 JPG 或 PNG格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传logo图片大小不能超过 200k!')
        }
        return isJPG && isLt2M
      },
      // 校验固定电话
      check_companyPhone () {
        let data2 = this.company.adCompanyPhone
        let r = new RegExp(/\d{3}-\d{7}/)
        let test = r.test(data2)
//        alert(test)
        if (!test) {
          this.$message.error('固定电话格式不对。请重新填写')
          this.companyPhonef = false
        } else {
          this.companyPhonef = true
        }
        console.log(test)
      },
      // 校验邮政编码
      check_companyCode () {
        let data2 = this.company.adCompanyCode
        let r = new RegExp(/\d{6}/)
        let test = r.test(data2)
//        alert(test)
        if (!test) {
          this.$message.error('邮政编码格式不对。请重新填写')
          this.companyCodef = false
        } else {
          this.companyCodef = true
        }
      },
      // 校验邮箱
      check_companyMail () {
        let data2 = this.company.adCompanyMail
        let r = new RegExp(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/)
        let test = r.test(data2)
        if (!test) {
          this.$message.error('邮箱格式不对。请重新填写')
          this.companyMailf = false
        } else {
          this.companyMailf = true
        }
      },
      // 校验联系人电话
      check_companyContacts () {
        let data2 = this.company.adCompanyContactsnumber
        let r = new RegExp(/^1[34578]\d{9}$/)
        let test = r.test(data2)
//        alert(test)
        if (!test) {
          this.$message.error('联系人电话格式不对。请重新填写')
          this.companyContactsf = false
        } else {
          this.companyContactsf = true
        }
      },
      // 校验公司银行账户
      check_bankNumber () {
        let data2 = this.company.adBankNumber
        let r = new RegExp(/^\d{16}|\d{19}$/)
        let test = r.test(data2)
//        alert(test)
        if (!test) {
          this.$message.error('公司银行账户格式不对。请重新填写')
          this.bankNumberf = false
        } else {
          this.bankNumberf = true
        }
      },
      // 校验负责人手机号码
      check_shopPhone () {
        let data2 = this.company.adShopPhone
        let r = new RegExp(/^1[34578]\d{9}$/)
        let test = r.test(data2)
//        alert(test)
        if (!test) {
          this.$message.error('负责人手机号码格式不对。请重新填写')
          this.shopPhonef = false
        } else {
          this.shopPhonef = true
        }
      },
      // 提交信息
      subExInfo () {
        this.check_companyPhone()
        this.check_companyCode()
        this.check_companyMail()
        this.check_companyContacts()
        this.check_bankNumber()
        this.check_shopPhone()
        let companyPhonef = this.companyPhonef
        let companyCodef = this.companyCodef
        let companyMailf = this.companyMailf
        let companyContactsf2 = this.companyContactsf
        let bankNumberf2 = this.bankNumberf
        let shopPhonef2 = this.shopPhonef
        if (companyPhonef && companyCodef && companyMailf && companyContactsf2 && bankNumberf2 && shopPhonef2) {
          this.$store.dispatch('upShop', this.company).then(
            () => {
              let upShopState = this.$store.state.shopManage.upShopState
              console.log(upShopState)
              if (upShopState.status) {
                this.$message({
                  showClose: false,
                  message: upShopState.msg,
                  type: 'success'
                })
                this.editFlag = false
                this.inputFlag = false
                this.selectInfo()
              } else {
                this.$message.error(upShopState.msg || '修改失败，请稍后')
              }
            }
          ).catch(() => {
            this.$message.error('修改失败，请检查参数，稍后再试')
          })
        }
      }
    },
    components: {},
    created () {
      this.adExId = this.$store.state.login.adminState.adExId
      this.selectInfo()
    }
  }
</script>
<style scoped>
  .img_c {
    width: 100%;
    height: 120px;
    background: url(../../../../../assets/logobig.png) no-repeat left top;
    overflow: hidden;
  }

  input {
    border: 1px solid red;
  }

  .shop_c {
    width: 100%;
    height: 80px;
    line-height: 80px;
    font-size: 18px;
  }

  .content_table {
    width: 1020px;
    margin-top: 25px;
    height: 619px;
    border: 1px solid #aaaaaa;
    overflow-y: auto;
    margin-left: 0px;
  }

  .content_table .content_table_p {
    width: 290px;
    height: 52px;
    line-height: 52px;
    text-align: right;
    font-size: 18px;
    font-weight: bold;
    margin: 20px 0;
  }
  .content_table .content_table_span {
    text-align: left;
  }
  .content_table ul li {
    height: 50px;
    text-align: left;
  }

  .content_table ul li input {
    height: 28px;
    border: 1px solid #c9c9c9;
  }

  .ul_li_dub, .ul_li_one, .ul_li_ther {
    margin-left: 150px;
  }

  .ul_li_dub input {
    width: 198px;

  }

  .ul_li_dub span, .ul_li_one span, .ul_li_ther span {
    width: 140px;
    display: inline-block;
    text-align: right;
    margin-right: 30px;
  }

  .ul_li_one input {
    width: 570px;

  }

  .ul_li_ther input {
    width: 428px;

  }

  .ul_li_ther button {
    width: 100px;
    height: 30px;
    background: #67aeff;
    border: none;
    color: #ffffff;
  }

  .content_table ul .ul_li_f {
    text-align: center;
  }

  .content_table ul .ul_li_f button {
    width: 120px;
    height: 34px;
    background: #67aeff;
    border: none;
    color: #ffffff;
  }
  .two{
    margin-top: 180px;
  }
  .twos{
    margin-bottom: 180px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
