<template>
  <div class="container-wrap">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>会员租车</el-breadcrumb-item>
      <el-breadcrumb-item>管家管理</el-breadcrumb-item>
      <el-breadcrumb-item class="subscription-plan"
        >管家详情</el-breadcrumb-item
      >
    </el-breadcrumb>
    <div class="page-content add-page-content">
      <div class="form-wrap">
        <el-form
          class="add-form"
          ref="formRef"
          :model="detail"
          label-width="auto"
        >
          <el-form-item label="城市" prop="cityId">
            {{ detail.cityName }}
          </el-form-item>

          <el-form-item label="姓名" prop="name">
            {{ detail.name }}
          </el-form-item>

          <el-form-item label="性别" prop="sex">
            {{ SEX_STATUS[detail.sex] }}
          </el-form-item>

          <el-form-item label="手机号" prop="mobile">
            {{ detail.mobile }}
          </el-form-item>

          <el-form-item label="学历" prop="education">
            {{ EDUCATION_STATUS[detail.education] }}
          </el-form-item>

          <el-form-item label="身份证号码" prop="idcard">
            {{ detail.idcard }}
          </el-form-item>

          <el-form-item label="管家介绍" prop="introduce">
            {{ detail.introduce }}
          </el-form-item>

          <el-form-item label="身份证正面图片" prop="idcardUrl">
            <el-image
              :src="detail.idcardUrl"
              :preview-src-list="[detail.idcardUrl]"
            ></el-image>
          </el-form-item>

          <el-form-item label="身份证反面图片" prop="idcardBackUrl">
            <el-image
              :src="detail.idcardBackUrl"
              :preview-src-list="[detail.idcardBackUrl]"
            ></el-image>
          </el-form-item>

          <el-form-item label="照片" prop="imageUrl">
            <el-image
              :src="detail.imageUrl"
              :preview-src-list="[detail.imageUrl]"
            ></el-image>
          </el-form-item>
        </el-form>
      </div>

      <div class="buttom-btn-group">
        <div class="btn" @click="back">返回</div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatThousandNumber } from "@/utils/util";
import { getButlerDetail } from "@/api/rental/butler";
import {
  SEX_STATUS,
  SEX_LIST,
  EDUCATION_LIST,
  EDUCATION_STATUS,
} from "@/utils/constant";

export default {
  data() {
    return {
      type: "",
      detail: {
        id: undefined,
        name: "",
        sex: 1,
        mobile: undefined,
        imageUrl: "",
        idcard: "",
        idcardUrl: "",
        idcardBackUrl: "",
        education: undefined,
        cityId: undefined,
        cityName: "",
        introduce: "",
      },
      SEX_STATUS,
      SEX_LIST,
      EDUCATION_LIST,
      EDUCATION_STATUS,
    };
  },
  mounted() {
    this.detail.id = this.$route.query.id;
    this.getDetail();
  },
  methods: {
    formatThousandNumber(num) {
      if (num || num == 0) {
        return formatThousandNumber(num);
      }
      return 0;
    },

    back() {
      this.$router.back();
    },

    getDetail() {
      const params = {
        id: this.detail.id,
      };
      getButlerDetail(params).then((res) => {
        this.detail = {
          ...res.data,
        };
      });
    },
  },
};
</script>

<style lang="less" scoped>
.el-image {
  width: 200px;
}
</style>
