<template>
  <el-form
    ref="step2form"
    :model="detail"
    :rules="rules"
    label-width="140px"
  >
    <el-form-item label="开户名" prop="bankName">
      <c-input
        :inputValue.sync="detail.bankName"
        placeholder="请输入收款单位名称"
        :inputStyle="{
          width: '300px',
        }"
      />
    </el-form-item>

    <el-form-item label="账号" prop="bankCardNo">
      <c-input
        :inputValue.sync="detail.bankCardNo"
        placeholder="请输入收款单位账号"
        :inputStyle="{
          width: '300px',
        }"
      />
    </el-form-item>

    <el-form-item label="开户行" prop="bankCardName">
      <c-input
        :inputValue.sync="detail.bankCardName"
        placeholder="请输入开户银行名称"
        :inputStyle="{
          width: '300px',
        }"
      />
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "SetCompanyPartnerStep2",

  components: {},

  props: {
    detail: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      rules: {
        bankName: [
          { required: true, message: "请输入收款单位名称", trigger: "blur" },
        ],
        bankCardNo: [
          { required: true, message: "请输入收款单位账号", trigger: "blur" },
        ],
        bankCardName: [
          { required: true, message: "请输入开户银行名称", trigger: "blur" },
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
