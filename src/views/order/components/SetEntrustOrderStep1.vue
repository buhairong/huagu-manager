<template>
  <div>
      <el-form ref="step1form" :model="detail" :rules="rules" label-width="180px">
        <div class="title">企业信息</div>

        <el-form-item label="营业执照" prop="businessLicense">
          <el-upload
            :action="UPLOAD_URL"
            :show-file-list="false"
            :accept="IMG_ACCEPT"
            :before-upload="beforeImgUpload"
            :on-success="handleSuccess"
          >
            <img v-if="detail.businessLicense" :src="detail.businessLicense" class="img">
            <i v-else class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="企业名称" prop="companyName">
          <c-input 
            :inputValue.sync="detail.companyName"
            placeholder="请输入企业名称"
            :inputStyle="{
              width: '300px'
            }"
          />
        </el-form-item>

        <el-form-item label="法人名称" prop="managerName">
          <c-input 
            :inputValue.sync="detail.managerName"
            placeholder="请输入法人名称"
            :inputStyle="{
              width: '300px'
            }"
          />
        </el-form-item>

        <el-form-item label="注册地址" prop="registeredAddress">
          <c-input 
            :inputValue.sync="detail.registeredAddress"
            placeholder="请输入注册地址"
            :inputStyle="{
              width: '300px'
            }"
          />
        </el-form-item>

        <el-form-item label="信用代码" prop="corporationTaxNumber">
          <c-input 
            :inputValue.sync="detail.corporationTaxNumber"
            placeholder="请输入信用代码"
            :inputStyle="{
              width: '300px'
            }"
          />
        </el-form-item>

        <el-form-item label="成立日期" prop="companyStartDate">
          <c-date 
            :value.sync="detail.companyStartDate"
            placeholder="请选择成立日期"
          />
        </el-form-item>

        <el-form-item class="el-form-item_required" label="营业期限" prop="companyEndDate">
          <div class="forever-wrap">
            <c-date 
              :value.sync="detail.companyEndDate"
              placeholder="请选择营业期限"
              :disabled="detail.isCompanyForever === 1"
            />

            <el-checkbox v-model="detail.isCompanyForever" :true-label="1" :false-label="0" @change="changeCompanyForever">长期有效</el-checkbox>
          </div>
        </el-form-item>

        <div class="title">风控与签约</div>

        <el-form-item label="是否开启风控审核">
          <el-radio-group v-model="detail.isRisk">
            <el-radio 
              v-for="item in openList"
              :key="item.value"
              :label="item.value"
            >
              {{ item.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="是否开启线上签约">
          <el-radio-group v-model="detail.isOnlineSign">
            <el-radio 
              v-for="item in openList"
              :key="item.value"
              :label="item.value"
            >
              {{ item.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>

      </el-form>
  </div>
</template>

<script>
import { ocrBusinessLicense } from '@/api/merchant/merchant'
import { UPLOAD_URL, IMG_ACCEPT, IMG_LIMIT_SIZE } from '@/utils/constant'

export default {
  props: {
      detail: {
          type: Object,
          required: true,
      },
  },

  data() {
    var checkEndDate = (rule, value, callback) => {
      if (this.detail.isCompanyForever === 0 && !this.detail.companyEndDate) {
          return callback(new Error('请选择营业期限'))
      }
      callback()
    }
        
    return {
      UPLOAD_URL,
      IMG_ACCEPT,
      rules: {
        businessLicense: [
          { required: true, message: '请上传营业执照', trigger: 'change' }
        ],
        companyName: [
          { required: true, message: '请输入企业名称', trigger: 'blur' }
        ],
        managerName: [
          { required: true, message: '请输入法人名称', trigger: 'blur' }
        ],
        registeredAddress: [
          { required: true, message: '请输入注册地址', trigger: 'blur' }
        ],
        corporationTaxNumber: [
          { required: true, message: '请输入信用代码', trigger: 'blur' }
        ],
        companyStartDate: [
          { required: true, message: '请选择成立日期', trigger: 'change' }
        ],
        companyEndDate: [
          { validator: checkEndDate, trigger: 'blur' }
        ],
      },
      openList: [
        { value: 1, label: '开启' },
        { value: 0, label: '关闭' },
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

    handleSuccess(res, file) {
      if (res.code === 0) {
        this.detail.businessLicense = res.data.src
        this.ocrBusinessLicense(res.data.src)
      }
    },

    ocrBusinessLicense(businessLicense) {
      const params = {
        businessLicense,
      }

      ocrBusinessLicense(params).then(res => {
        if(res.code === 0) {
          this.detail.corporationTaxNumber = res.data
        }
      })
    },

    changeCompanyForever(e) {
      if (e === 1) {
        this.detail.companyEndDate = ''
      }
    },
  },
}
</script>

<style lang="less" scoped>
.el-upload {
    width: 178px;
    height: unset;
    .img {
        width: 178px;
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