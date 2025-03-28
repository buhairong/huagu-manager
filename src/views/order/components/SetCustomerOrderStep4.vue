<template>
  <el-form ref="step4form" :model="detail" :rules="rules" label-width="150px">
    <el-form-item label="合同编号" prop="contractLabelNum">
      <c-input
        :inputValue.sync="detail.contractLabelNum"
        placeholder="请输入合同编号"
        :inputStyle="{
          width: '300px',
        }"
      />
    </el-form-item>

    <el-form-item label="资方" prop="capital">
      <c-input
        :inputValue.sync="detail.capital"
        placeholder="请输入资方信息"
        :inputStyle="{
          width: '300px',
        }"
      />
    </el-form-item>

    <el-form-item label="合同附件" prop="contractList">
      <div class="img-list">
        <div
          class="img-wrap"
          v-for="(item, index) in detail.contractList"
          :key="index"
        >
          <el-image style="width: 100px" :src="item" mode="widthFix"></el-image>
          <div class="del-icon" @click="delImg(index)">
            <i class="el-icon-error" style="font-size: 20px"></i>
          </div>
        </div>

        <el-upload
          multiple
          :action="UPLOAD_URL"
          :show-file-list="false"
          :before-upload="beforeImgUpload"
          :on-success="handleSuccess"
        >
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
    </el-form-item>
  </el-form>
</template>

<script>
import { UPLOAD_URL, IMG_LIMIT_SIZE } from "@/utils/constant";

export default {
  name: "SetCustomerOrderStep4",

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
      rules: {
        contractLabelNum: [
          { required: true, message: "请输入合同编号", trigger: "blur" },
        ],
        capital: [
          { required: true, message: "请输入资方信息", trigger: "blur" },
        ],
        contractList: [
          { required: true, message: "请上传合同附件", trigger: "blur" },
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
        this.$message.error(`上传文件大小不能超过${IMG_LIMIT_SIZE}MB!`);
        return false;
      }

      return true;
    },

    handleSuccess(res, file) {
      if (res.code == 0) {
        this.detail.contractList.push(res.data.src);
      }
    },

    delImg(index) {
      this.$confirm(`确定要删除这张合同附件吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.detail.contractList.splice(index, 1);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.img-list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .img-wrap {
    margin-right: 8px;
    margin-bottom: 16px;
    position: relative;
    .del-icon {
      position: absolute;
      top: 10px;
      right: 10px;
    }
  }
  ::v-deep .el-upload {
    width: 100px;
    height: 100px;
  }
}
</style>
