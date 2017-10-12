<template>
  <div id="shopSetupBody" class="setupBody_class">
    <el-form class="setUp_form" label-width="190px">
      <el-form-item label="店铺名称:">
        {{adShopName}}
      </el-form-item>
      <el-form-item label="店铺logo:">
        <el-upload
          class="avatar-uploader"
          action="http://www.wutongsd.com/uploadOssCard.do"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :on-error="logoUpErr"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="upLogo" style="width: 120px; margin-top: 140px; margin-left:-200px">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        adShopName: '',
        imageUrl: '',
        imgName: ''
      }
    },
    methods: {
      // 更新logo
      upLogo () {
        let adExId = this.$store.state.login.adminState.adExId
        let adShopLogo = this.imgName
        let adEx = {
          'adExId': adExId,
          'adShopLogo': adShopLogo
        }
        this.$store.dispatch('upAdEx', adEx).then(
          () => {
            if (this.$store.state.shopManage.upAdExState.status) {
              let item = sessionStorage.getItem('adminState')
              let adminState = JSON.parse(item)
              adminState.adShopLogo = this.imgName
              let s = JSON.stringify(adminState)
              sessionStorage.setItem('adminState', s)
              this.$alert(this.$store.state.shopManage.upAdExState.msg, '修改logo', {
                confirmButtonText: '确定',
                type: 'success'
              })
            } else {
              this.$alert(this.$store.state.shopManage.upAdExState.msg, '修改logo', {
                confirmButtonText: '确定',
                type: 'error'
              })
            }
          }
        )
      },
      // 图片上传成功的钩子
      handleAvatarSuccess (res, file, filelist) {
        this.imageUrl = URL.createObjectURL(file.raw)
        if (res.success) {
          this.imgName = res.filename
        }
      },
      // 图片上传失败的钩子
      logoUpErr () {
        this.$message.error('服务器出了点问题正在抢修,请稍后再试')
      },
      // 图片上传前的钩子（判断文件类型）
      beforeAvatarUpload (file) {
        const isJPG = (file.type === 'image/jpeg' || 'image/png')
        const isLt2M = file.size / 1024 / 100 < 2

        if (!isJPG) {
          this.$message.error('上传logo图片只能是 JPG 或 PNG格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传logo图片大小不能超过 200k!')
        }
        return isJPG && isLt2M
      }
    },
    mounted () {
      this.$store.state.login.adminState = JSON.parse(sessionStorage.getItem('adminState'))
      let adminState = this.$store.state.login.adminState
      this.adShopName = adminState.adShopName
      if (adminState.adShopLogo !== null) {
        this.imageUrl = 'http://wut1.oss-cn-beijing.aliyuncs.com/' + adminState.adShopLogo
      }
    }
  }
</script>
<style>
  .setupBody_class {
    width: 1020px;
    margin-top: 25px;
    height: 620px;
    border: 1px solid #aaaaaa;
    overflow-y: auto;
  }
  .setUp_form {
    width: 50%;
    margin: 100px 25%;
    border: 0px;
    height: 50%;
  }
  .setUp_form label {
    font-size: 20px;
  }
  .setUp_form div {
    font-size: 20px;
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
