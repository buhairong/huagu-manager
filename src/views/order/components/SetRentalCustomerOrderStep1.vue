<template>
  <el-form
    ref="step1form"
    :model="detail"
    :rules="rules"
    label-width="140px"
  >
    <el-form-item label="客户类型">
      <el-radio-group v-model="detail.userCarFinanceLeaseSubscribe.orderType">
        <el-radio
          v-for="item in CUSTOMER_TYPE_LIST"
          :key="item.value"
          :label="item.value"
        >
          {{ item.label }}
        </el-radio>
      </el-radio-group>
    </el-form-item>

    <template v-if="detail.userCarFinanceLeaseSubscribe.orderType === 2">
      <el-form-item label="营业执照">
        <div class="upload-wrap">
          <el-upload
            :action="UPLOAD_URL"
            :show-file-list="false"
            :accept="IMG_ACCEPT"
            :before-upload="beforeImgUpload"
            :on-success="(res, file) => handleSuccess(1, res, file)"
          >
            <img
              v-if="detail.userCompanyEntity.businessLicense"
              :src="detail.userCompanyEntity.businessLicense"
              class="img"
            />
            <i v-else class="el-icon-plus"></i>
          </el-upload>
        </div>
      </el-form-item>

      <el-form-item label="客户名称" prop="userCompanyEntity.companyName">
        <c-input
          :inputValue.sync="detail.userCompanyEntity.companyName"
          placeholder="请输入客户名称"
          :inputStyle="{
            width: '300px',
          }"
        />
      </el-form-item>

      <el-form-item label="唯一证件号" prop="userCompanyEntity.corporationTaxNumber">
        <c-input
          :inputValue.sync="detail.userCompanyEntity.corporationTaxNumber"
          placeholder="请输入唯一证件号"
          :inputStyle="{
            width: '300px',
          }"
        />
      </el-form-item>

      <el-form-item label="注册地址" prop="userCompanyEntity.registeredAddress">
        <c-input
          :inputValue.sync="detail.userCompanyEntity.registeredAddress"
          placeholder="请输入注册地址"
          :inputStyle="{
            width: '300px',
          }"
        />
      </el-form-item>

      <el-form-item label="经营场所地址" prop="userCompanyEntity.address">
        <c-input
          :inputValue.sync="detail.userCompanyEntity.address"
          placeholder="请输入经营场所地址"
          :inputStyle="{
            width: '300px',
          }"
        />
      </el-form-item>

      <el-form-item label="企业联系人" prop="userCompanyEntity.managerName">
        <c-input
          :inputValue.sync="detail.userCompanyEntity.managerName"
          placeholder="请输入企业联系人"
          :inputStyle="{
            width: '300px',
          }"
        />
      </el-form-item>

      <el-form-item label="企业联系人手机号" prop="userCompanyEntity.managerMobile">
        <c-input
          :inputValue.sync="detail.userCompanyEntity.managerMobile"
          placeholder="请输入企业联系人手机号"
          :inputStyle="{
            width: '300px',
          }"
        />
      </el-form-item>
    </template>

    <el-form-item label="使用人证件">
      <div class="upload-wrap">
        <el-upload
          :action="UPLOAD_URL"
          :show-file-list="false"
          :accept="IMG_ACCEPT"
          :before-upload="beforeImgUpload"
          :on-success="(res, file) => handleSuccess(2, res, file)"
        >
          <img v-if="detail.userInfoEntity.idcardUrl" :src="detail.userInfoEntity.idcardUrl" class="img" />
          <i v-else class="el-icon-plus"></i>
        </el-upload>
      </div>
    </el-form-item>

    <el-form-item label="使用人姓名" prop="userInfoEntity.userName">
      <c-input
        :inputValue.sync="detail.userInfoEntity.userName"
        placeholder="请输入使用人姓名"
        :inputStyle="{
          width: '300px',
        }"
      />
    </el-form-item>

    <el-form-item label="使用人证件号" prop="userInfoEntity.idcard">
      <c-input
        :inputValue.sync="detail.userInfoEntity.idcard"
        placeholder="请输入使用人证件号"
        :inputStyle="{
          width: '300px',
        }"
      />
    </el-form-item>

    <el-form-item label="使用人手机号">
      <div>{{ detail.userEntity.mobile }}</div>
    </el-form-item>

    <el-form-item label="使用人联系地址" prop="userInfoEntity.userAddress">
      <c-input
        :inputValue.sync="detail.userInfoEntity.userAddress"
        placeholder="请输入使用人联系地址"
        :inputStyle="{
          width: '300px',
        }"
      />
    </el-form-item>

    <el-form-item label="备用联系人姓名">
      <c-input
        :inputValue.sync="detail.userCarFinanceLeaseSubscribe.alternateContactName"
        placeholder="请输入备用联系人姓名"
        :inputStyle="{
          width: '300px',
        }"
      />
    </el-form-item>

    <el-form-item label="备用联系人手机号">
      <c-input
        :inputValue.sync="detail.userCarFinanceLeaseSubscribe.alternateContactMobile"
        placeholder="请输入备用联系人手机号"
        :inputStyle="{
          width: '300px',
        }"
      />
    </el-form-item>
  </el-form>
</template>

<script>
import { UPLOAD_URL, IMG_ACCEPT, IMG_LIMIT_SIZE } from "@/utils/constant";

export default {
  name: "SetCustomerOrderStep1",

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
      CUSTOMER_TYPE_LIST: [
        { value: 2, label: "企业客户" },
        { value: 1, label: "个人客户" },
      ],
      rules: {
        'userCompanyEntity.companyName': [
          { required: true, message: "请输入客户名称", trigger: "blur" },
        ],
        'userCompanyEntity.corporationTaxNumber': [
          { required: true, message: "请输入唯一证件号", trigger: "blur" },
        ],
        'userCompanyEntity.registeredAddress': [
          { required: true, message: "请输入注册地址", trigger: "blur" },
        ],
        'userCompanyEntity.address': [
          { required: true, message: "请输入经营场所地址", trigger: "blur" },
        ],
        'userCompanyEntity.managerName': [
          { required: true, message: "请输入企业联系人", trigger: "blur" },
        ],
        'userCompanyEntity.managerMobile': [
          {
            required: true,
            message: "请输入企业联系人手机号",
            trigger: "blur",
          },
        ],
        'userInfoEntity.userName': [
          { required: true, message: "请输入使用人姓名", trigger: "blur" },
        ],
        'userInfoEntity.idcard': [
          { required: true, message: "请输入使用人证件号", trigger: "blur" },
        ],
        'userInfoEntity.userAddress': [
          {
            required: true,
            message: "请输入使用人联系地址",
            trigger: "blur",
          },
        ],
      },
    }
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

    // type: 1.营业执照 2.使用人证件
    handleSuccess(type, res, file) {
      if (res.code == 0) {
        if (type === 1) {
          this.detail.userCompanyEntity.businessLicense = res.data.src;
        } else if (type === 2) {
          this.detail.userInfoEntity.idcardUrl = res.data.src;
        }
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
</style>
