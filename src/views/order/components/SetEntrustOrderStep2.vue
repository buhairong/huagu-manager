<template>
  <div>
    <el-form ref="step2form" :model="detail" :rules="rules" label-width="180px">
      <div class="title">实际用车人信息</div>

      <el-form-item class="el-form-item_required" label="实际用车人身份证" prop="idcardUrl">
        <div class="upload-wrap">
          <el-upload
            :action="UPLOAD_URL"
            :show-file-list="false"
            :accept="IMG_ACCEPT"
            :before-upload="beforeImgUpload"
            :on-success="(res, file) => handleSuccess(1, res, file)"
          >
            <img v-if="detail.idcardUrl" :src="detail.idcardUrl" class="img">
            <div v-else>
              <i class="el-icon-plus"></i>
              <div class="upload-tip">身份证人像面照片</div>
            </div>
          </el-upload>

          <el-upload
            :action="UPLOAD_URL"
            :show-file-list="false"
            :accept="IMG_ACCEPT"
            :before-upload="beforeImgUpload"
            :on-success="(res, file) => handleSuccess(2, res, file)"
          >
            <img v-if="detail.idcardBackUrl" :src="detail.idcardBackUrl" class="img">
            <div v-else>
              <i class="el-icon-plus"></i>
              <div class="upload-tip">身份证国徽面照片</div>
            </div>
          </el-upload>
        </div>
      </el-form-item>

      <el-form-item label="实际用车人姓名" prop="userName">
        <c-input 
          :inputValue.sync="detail.userName"
          placeholder="请输入实际用车人姓名"
          :inputStyle="{
            width: '300px'
          }"
        />
      </el-form-item>

      <el-form-item label="实际用车人证件号" prop="idcard">
        <c-input 
          :inputValue.sync="detail.idcard"
          placeholder="请输入实际用车人证件号"
          :inputStyle="{
            width: '300px'
          }"
        />
      </el-form-item>

      <el-form-item class="el-form-item_required" label="证件有效期限" prop="idcardEndDate">
        <div class="forever-wrap">
          <c-date 
            :value.sync="detail.idcardEndDate"
            placeholder="请选择证件有效期限"
            :disabled="detail.isForever === 1"
          />

          <el-checkbox v-model="detail.isForever" :true-label="1" :false-label="0" @change="changeIdcardForever">长期有效</el-checkbox>
        </div>
      </el-form-item>

      <el-form-item label="实际用车人手机号">
        <div>{{ detail.userMobile }}</div>
      </el-form-item>

      <el-form-item class="el-form-item_required" label="实际用车人驾驶证" prop="driverLicenseUrl">
        <div class="upload-wrap">
          <el-upload
            :action="UPLOAD_URL"
            :show-file-list="false"
            :accept="IMG_ACCEPT"
            :before-upload="beforeImgUpload"
            :on-success="(res, file) => handleSuccess(3, res, file)"
          >
            <img v-if="detail.driverLicenseUrl" :src="detail.driverLicenseUrl" class="img">
            <div v-else>
              <i class="el-icon-plus"></i>
              <div class="upload-tip">驾驶证主页</div>
            </div>
          </el-upload>

          <el-upload
            :action="UPLOAD_URL"
            :show-file-list="false"
            :accept="IMG_ACCEPT"
            :before-upload="beforeImgUpload"
            :on-success="(res, file) => handleSuccess(4, res, file)"
          >
            <img v-if="detail.driverLicenseSecondSheetUrl" :src="detail.driverLicenseSecondSheetUrl" class="img">
            <div v-else>
              <i class="el-icon-plus"></i>
              <div class="upload-tip">驾驶证副页</div>
            </div>
          </el-upload>
        </div>
      </el-form-item>

      <el-form-item label="实际用车人准驾车型" prop="carType">
        <c-select
          :selectValue.sync="detail.carType"
          :options="carTypeList"
          placeholder="请选择实际用车人准驾车型"
          :showAllValue="false"
          :selectStyle="{
            width: '300px'
          }"
        />
      </el-form-item>

      <el-form-item label="实际用车人驾驶证有效期" prop="driverLicenseEndDate">
        <c-date 
          :value.sync="detail.driverLicenseEndDate"
          placeholder="请选择实际用车人驾驶证有效期"
          :selectStyle="{
            width: '300px'
          }"
        />
      </el-form-item>

      <div class="title">备用联系人信息</div>

      <el-form-item label="备用联系人姓名" prop="emergencyContactName">
        <c-input 
          :inputValue.sync="detail.emergencyContactName"
          placeholder="请输入备用联系人姓名"
          :inputStyle="{
            width: '300px'
          }"
        />
      </el-form-item>

      <el-form-item label="备用联系人手机号" prop="emergencyContactPhone">
        <c-input 
          :inputValue.sync="detail.emergencyContactPhone"
          placeholder="请输入备用联系人手机号"
          :inputStyle="{
            width: '300px'
          }"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { ocrIdcard, ocrDrivingLicense } from '@/api/order/orderManagement'
import { UPLOAD_URL, IMG_ACCEPT, IMG_LIMIT_SIZE } from '@/utils/constant'

export default {
  props: {
      detail: {
          type: Object,
          required: true,
      },
  },

  data() {
    var checkIdcardUrl = (rule, value, callback) => {
      if (!this.detail.idcardUrl) {
          return callback(new Error('请上传身份证人像面照片'))
      } else if (!this.detail.idcardBackUrl) {
          return callback(new Error('请上传身份证国徽面照片'))
      }
      callback()
    }

    var checkIdcardEndDate = (rule, value, callback) => {
      if (this.detail.isForever === 0 && !this.detail.idcardEndDate) {
          return callback(new Error('请选择证件有效期限'))
      }
      callback()
    }

    var checkDriverLicenseUrl = (rule, value, callback) => {
      if (!this.detail.driverLicenseUrl) {
          return callback(new Error('请上传驾驶证主页'))
      } else if (!this.detail.driverLicenseSecondSheetUrl) {
          return callback(new Error('请上传驾驶证副页'))
      }
      callback()
    }
        
    return {
      UPLOAD_URL,
      IMG_ACCEPT,
      rules: {
        idcardUrl: [
          { validator: checkIdcardUrl, trigger: 'change' }
        ],
        userName: [
          { required: true, message: '请输入实际用车人姓名', trigger: 'blur' }
        ],
        idcard: [
          { required: true, message: '请输入实际用车人证件号', trigger: 'blur' }
        ],
        idcardEndDate: [
          { validator: checkIdcardEndDate, trigger: 'change' }
        ],
        driverLicenseUrl: [
          { validator: checkDriverLicenseUrl, trigger: 'change' }
        ],
        carType: [
          { required: true, message: '请选择实际用车人准驾车型', trigger: 'change' }
        ],
        driverLicenseEndDate: [
          { required: true, message: '请选择实际用车人驾驶证有效期', trigger: 'change' }
        ],
        emergencyContactName: [
          { required: true, message: '请输入备用联系人姓名', trigger: 'blur' }
        ],
        emergencyContactPhone: [
          { required: true, message: '请输入备用联系人手机号', trigger: 'blur' },
          { pattern: /^1[3|4|5|7|8|9]\d{9}$/, message: '请输入正确的备用联系人手机号', trigger: 'blur' },
        ],
      },
      carTypeList: [
        {
          value: 'A1',
          label: 'A1'
        },
        {
          value: 'A2',
          label: 'A2'
        },
        {
          value: 'A3',
          label: 'A3'
        },
        {
          value: 'B1',
          label: 'B1'
        },
        {
          value: 'B2',
          label: 'B2'
        },
        {
          value: 'C1',
          label: 'C1'
        },
        {
          value: 'C2',
          label: 'C2'
        },
      ],
    }
  },

  watch: {
    detail: {
      handler(val) {
          this.$emit('change', val)
      },
      immediate: true,
      deep: true
    }
  },

  mounted() {
    
  },

  methods: {
    beforeImgUpload(file) {
      const size = file.size / 1024 / 1024

      if (size > IMG_LIMIT_SIZE) {
        this.$message.error(`上传图片大小不能超过${IMG_LIMIT_SIZE}MB!`)
        return false
      }

      return true
    },

    // type: 1.身份证正面 2.身份证反面 3.驾驶证主页 4.驾驶证副页
    handleSuccess(type, res, file) {
      if (res.code === 0) {
        if (type === 1) {
          this.detail.idcardUrl = res.data.src
          this.ocrIdcard(res.data.src, type)
        } else if (type === 2) {
          this.detail.idcardBackUrl = res.data.src
          this.ocrIdcard(res.data.src, type)
        } else if (type === 3) {
          this.detail.driverLicenseUrl = res.data.src
          this.ocrDrivingLicense(res.data.src, type)
        } else if (type === 4) {
          this.detail.driverLicenseSecondSheetUrl = res.data.src
          this.ocrDrivingLicense(res.data.src, type)
        }
      }
    },

    ocrIdcard(url, type) {
      let params = {
        idcardImageUrl: url,
      }

      if (type === 2) {
        params = {
          idcardBackImageUrl: url,
        }
      }

      ocrIdcard(params).then(res => {
        if (res.code === 0) {
          if (type === 1) {
            this.detail.userName = res.data.resultJSON.name
            this.detail.idcard = res.data.resultJSON.num
          } else {
            if (res.data.resultJSON.start_date) {
              const startDate = res.data.resultJSON.start_date
              const year = startDate.slice(0, 4)
              const month = startDate.slice(4, 6)
              const day = startDate.slice(6, 8)
              this.detail.idcardValidityTimeStart = `${year}-${month}-${day}`
            }

            if (res.data.resultJSON.end_date) {
              const endDate = res.data.resultJSON.end_date
              const year = endDate.slice(0, 4)
              const month = endDate.slice(4, 6)
              const day = endDate.slice(6, 8)
              this.detail.idcardEndDate = `${year}-${month}-${day}`
            }
            
            if (res.data.resultJSON.is_fake) {
              this.detail.isForever = 1
            }
          }
        }
      })
    },

    changeIdcardForever(e) {
      if (e === 1) {
        this.detail.idcardEndDate = ''
      }
    },

    ocrDrivingLicense(url, type) {
      const params = {
        drivingLicenseUrl: url,
        faceOrBack: 1
      }

      if (type === 4) {
        params.faceOrBack = 2
      }

      ocrDrivingLicense(params).then(res => {
        if (res.code === 0) {
          if (type === 3) {
            this.detail.carType = res.data.resultJSON.vehicle_type
            if (res.data.resultJSON.start_date) {
              const startDate = res.data.resultJSON.start_date
              const year = startDate.slice(0, 4)
              const month = startDate.slice(4, 6)
              const day = startDate.slice(6, 8)
              this.detail.driverLicenseTimeStart = `${year}-${month}-${day}`
            }

            if (res.data.resultJSON.end_date) {
              const endDate = res.data.resultJSON.end_date
              const year = endDate.slice(0, 4)
              const month = endDate.slice(4, 6)
              const day = endDate.slice(6, 8)
              this.detail.driverLicenseEndDate = `${year}-${month}-${day}`
            }
          }
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.upload-wrap {
  display: flex;
}

/deep/ .el-upload {
  margin-right: 20px;
  width: 178px;
  height: 178px;
  .img {
    width: 100%;
  }
}

.title {
  margin-bottom: 20px;
  height: 30px;
  font-family: PingFangSC-Medium;
  font-size: 16px;
  line-height: 30px;
  color: #1D2129;
}

.forever-wrap {
  display: flex;
  align-items: center;
  .el-checkbox {
    margin-left: 20px;
  }
}
</style>