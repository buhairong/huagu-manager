<template>
  <el-form
    ref="step1form"
    :model="detail"
    :rules="rules[`rules${detail.customerType}`]"
    label-width="140px"
  >
    <el-form-item label="客户类型" prop="customerType">
      <el-radio-group v-model="detail.customerType">
        <el-radio
          v-for="item in CUSTOMER_TYPE_LIST"
          :key="item.value"
          :label="item.value"
        >
          {{ item.label }}
        </el-radio>
      </el-radio-group>
    </el-form-item>

    <template v-if="detail.customerType === 2">
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
              v-if="detail.businessLicense"
              :src="detail.businessLicense"
              class="img"
            />
            <i v-else class="el-icon-plus"></i>
          </el-upload>
        </div>
      </el-form-item>

      <el-form-item label="客户名称" prop="companyName">
        <c-input
          :inputValue.sync="detail.companyName"
          placeholder="请输入客户名称"
          :inputStyle="{
            width: '300px',
          }"
        />
      </el-form-item>

      <el-form-item label="唯一证件号" prop="corporationTaxNumber">
        <c-input
          :inputValue.sync="detail.corporationTaxNumber"
          placeholder="请输入唯一证件号"
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

      <el-form-item label="经营场所地址" prop="address">
        <c-input
          :inputValue.sync="detail.address"
          placeholder="请输入经营场所地址"
          :inputStyle="{
            width: '300px',
          }"
        />
      </el-form-item>

      <el-form-item label="企业联系人" prop="managerName">
        <c-input
          :inputValue.sync="detail.managerName"
          placeholder="请输入企业联系人"
          :inputStyle="{
            width: '300px',
          }"
        />
      </el-form-item>

      <el-form-item label="企业联系人手机号" prop="managerMobile">
        <c-input
          :inputValue.sync="detail.managerMobile"
          placeholder="请输入企业联系人手机号"
          :inputStyle="{
            width: '300px',
          }"
        />
      </el-form-item>
    </template>

    <el-form-item label="使用人证件" prop="idcardUrl">
      <div class="upload-wrap">
        <el-upload
          :action="UPLOAD_URL"
          :show-file-list="false"
          :accept="IMG_ACCEPT"
          :before-upload="beforeImgUpload"
          :on-success="(res, file) => handleSuccess(2, res, file)"
        >
          <img v-if="detail.idcardUrl" :src="detail.idcardUrl" class="img" />
          <i v-else class="el-icon-plus"></i>
        </el-upload>
      </div>
    </el-form-item>

    <el-form-item label="使用人姓名" prop="userName">
      <c-input
        :inputValue.sync="detail.userName"
        placeholder="请输入使用人姓名"
        :inputStyle="{
          width: '300px',
        }"
      />
    </el-form-item>

    <el-form-item label="使用人证件号" prop="idcard">
      <c-input
        :inputValue.sync="detail.idcard"
        placeholder="请输入使用人证件号"
        :inputStyle="{
          width: '300px',
        }"
      />
    </el-form-item>

    <el-form-item label="使用人手机号" prop="userMobile">
      <c-input
        :inputValue.sync="detail.userMobile"
        placeholder="请输入使用人手机号"
        :inputStyle="{
          width: '300px',
        }"
      />
    </el-form-item>

    <el-form-item label="使用人联系地址" prop="userAddress">
      <c-input
        :inputValue.sync="detail.userAddress"
        placeholder="请输入使用人联系地址"
        :inputStyle="{
          width: '300px',
        }"
      />
    </el-form-item>

    <el-form-item label="备用联系人姓名">
      <c-input
        :inputValue.sync="detail.emergencyContactName"
        placeholder="请输入备用联系人姓名"
        :inputStyle="{
          width: '300px',
        }"
      />
    </el-form-item>

    <el-form-item label="备用联系人手机号" prop="emergencyContactPhone">
      <c-input
        :inputValue.sync="detail.emergencyContactPhone"
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
        rules1: {
          customerType: [
            { required: true, message: "请选择客户类型", trigger: "change" },
          ],
          idcardUrl: [
            { required: true, message: "请上传使用人证件", trigger: "blur" },
          ],
          userName: [
            { required: true, message: "请输入使用人姓名", trigger: "blur" },
          ],
          idcard: [
            { required: true, message: "请输入使用人证件号", trigger: "blur" },
          ],
          userMobile: [
            { required: true, message: "请输入使用人手机号", trigger: "blur" },
          ],
          userAddress: [
            {
              required: true,
              message: "请输入使用人联系地址",
              trigger: "blur",
            },
          ],
        },
        rules2: {
          customerType: [
            { required: true, message: "请选择客户类型", trigger: "change" },
          ],
          companyName: [
            { required: true, message: "请输入客户名称", trigger: "blur" },
          ],
          corporationTaxNumber: [
            { required: true, message: "请输入唯一证件号", trigger: "blur" },
          ],
          registeredAddress: [
            { required: true, message: "请输入注册地址", trigger: "blur" },
          ],
          address: [
            { required: true, message: "请输入经营场所地址", trigger: "blur" },
          ],
          managerName: [
            { required: true, message: "请输入企业联系人", trigger: "blur" },
          ],
          managerMobile: [
            {
              required: true,
              message: "请输入企业联系人手机号",
              trigger: "blur",
            },
          ],
          idcardUrl: [
            { required: true, message: "请上传使用人证件", trigger: "blur" },
          ],
          userName: [
            { required: true, message: "请输入使用人姓名", trigger: "blur" },
          ],
          idcard: [
            { required: true, message: "请输入使用人证件号", trigger: "blur" },
          ],
          userMobile: [
            { required: true, message: "请输入使用人手机号", trigger: "blur" },
          ],
          userAddress: [
            {
              required: true,
              message: "请输入使用人联系地址",
              trigger: "blur",
            },
          ],
        },
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

    // type: 1.营业执照 2.使用人证件
    handleSuccess(type, res, file) {
      if (res.code == 0) {
        if (type === 1) {
          this.detail.businessLicense = res.data.src;
        } else if (type === 2) {
          this.detail.idcardUrl = res.data.src;
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
