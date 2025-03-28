<template>
  <el-form
    ref="step1form"
    :model="detail"
    :rules="rules"
    label-width="140px"
  >
    <el-form-item label="营业执照" prop="businessLicense">
      <div class="upload-wrap">
        <el-upload
          :action="UPLOAD_URL"
          :show-file-list="false"
          :accept="IMG_ACCEPT"
          :before-upload="beforeImgUpload"
          :on-success="handleSuccess"
        >
          <img
            v-if="detail.businessLicense"
            :src="detail.businessLicense"
            class="img"
          />
          <i v-else class="el-icon-plus"></i>
        </el-upload>
      </div>
    </el-form-item>

    <el-form-item label="企业名称" prop="companyName">
      <c-input
        :inputValue.sync="detail.companyName"
        placeholder="请输入企业名称"
        :inputStyle="{
          width: '300px',
        }"
      />
    </el-form-item>

    <el-form-item label="注册地址" prop="registeredAddress">
      <c-input
        :inputValue.sync="detail.registeredAddress"
        placeholder="请输入注册地址"
        :inputStyle="{
          width: '300px',
        }"
      />
    </el-form-item>

    <el-form-item label="信用代码" prop="corporationTaxNumber">
      <c-input
        :inputValue.sync="detail.corporationTaxNumber"
        placeholder="请输入信用代码"
        :inputStyle="{
          width: '300px',
        }"
      />
    </el-form-item>

    <el-form-item class="el-form-item_required" label="营业期限" prop="companyEndDate">
      <div class="forever-wrap">
        <c-date 
          :value.sync="detail.businessDeadline"
          placeholder="请选择营业期限"
          :disabled="detail.isCompanyForever === 1"
        />

        <el-checkbox v-model="detail.isCompanyForever" :true-label="1" :false-label="0" @change="changeCompanyForever">长期有效</el-checkbox>
      </div>
    </el-form-item>

    <el-form-item label="联系方式" prop="managerMobile">
      <c-input
        :inputValue.sync="detail.managerMobile"
        placeholder="联系方式"
        :inputStyle="{
          width: '300px',
        }"
      />
    </el-form-item>
  </el-form>
</template>

<script>
import { ocrBusinessLicenseDetail } from '@/api/merchant/merchant'
import { UPLOAD_URL, IMG_ACCEPT, IMG_LIMIT_SIZE } from "@/utils/constant"

export default {
  name: "SetCompanyPartnerStep1",

  components: {},

  props: {
    detail: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      UPLOAD_URL,
      IMG_ACCEPT,
      rules: {
        businessLicense: [
          { required: true, message: "请上传营业执照", trigger: "blur" },
        ],
        companyName: [
          { required: true, message: "请输入企业名称", trigger: "blur" },
        ],
        registeredAddress: [
          { required: true, message: "请输入注册地址", trigger: "blur" },
        ],
        corporationTaxNumber: [
          { required: true, message: "请输入信用代码", trigger: "blur" },
        ],
        managerMobile: [
          { required: true, message: "请输入联系方式", trigger: "blur" },
        ],
      },
    };
  },

  watch: {
    detail: {
      handler(val) {
        this.$emit("change", val);
      },
      immediate: true,
      deep: true,
    },
  },

  mounted() {},

  methods: {
    beforeImgUpload(file) {
      const size = file.size / 1024 / 1024;

      if (size > IMG_LIMIT_SIZE) {
        this.$message.error(`上传图片大小不能超过${IMG_LIMIT_SIZE}MB!`);
        return false;
      }

      return true;
    },

    handleSuccess(res, file) {
      this.detail.businessLicense = res.data.src
      this.ocrBusinessLicense(res.data.src)
    },

    ocrBusinessLicense(businessLicense) {
      const params = {
        businessLicense,
      }

      ocrBusinessLicenseDetail(params).then(res => {
        if (res.code === 0) {
          this.detail.companyName = res.data.name
          this.detail.registeredAddress = res.data.address
          if (res.data.valid_period) {
            const valid_period = `${res.data.valid_period.slice(0, 4)}-${res.data.valid_period.slice(4, 6)}-${res.data.valid_period.slice(6, 8)}`
            this.detail.businessDeadline = valid_period
          }
          this.detail.corporationTaxNumber = res.data.reg_num
        }
      })
    },

    changeCompanyForever(e) {
      if (e === 1) {
        this.detail.businessDeadline = ''
      }
    },
  },
};
</script>

<style lang="less" scoped>
.el-upload {
  width: 178px;
  height: unset;
  .img {
    width: 178px;
  }
}

.forever-wrap {
  display: flex;
  align-items: center;
  .el-checkbox {
    margin-left: 20px;
  }
}
</style>
