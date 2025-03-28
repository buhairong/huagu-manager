<template>
  <div class="container-wrap">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>会员租车</el-breadcrumb-item>
      <el-breadcrumb-item>商务活动</el-breadcrumb-item>
      <el-breadcrumb-item class="subscription-plan"
        >活动详情</el-breadcrumb-item
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

          <el-form-item label="活动类型" prop="businessActivityType">
            {{ BUSINESS_ACTIVITY_STATUS[detail.businessActivityType] }}
          </el-form-item>

          <el-form-item label="活动名称" prop="siteName">
            {{ detail.siteName }}
          </el-form-item>

          <el-form-item label="活动地址" prop="address">
            {{ detail.address }}
          </el-form-item>

          <el-form-item label="活动价格" prop="money">
            {{
              detail.money
                ? `${formatThousandNumber(detail.money)}元/小时`
                : "-"
            }}
          </el-form-item>

          <el-form-item label="活动场地介绍" prop="introduction">
            {{ detail.introduction }}
          </el-form-item>

          <el-form-item label="活动场地图片" prop="imageList">
            <div class="img-wrap">
              <div
                class="img"
                v-for="(img, index) in detail.imageList"
                :key="index"
              >
                <el-image
                  style="width: 100%; height: 100%"
                  :src="img"
                  fit="cover"
                  :preview-src-list="detail.imageList"
                  :initial-index="index"
                ></el-image>
              </div>
            </div>
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
import { getBusinessDetail } from "@/api/rental/business";
import {
  BUSINESS_ACTIVITY_LIST,
  BUSINESS_ACTIVITY_STATUS,
} from "@/utils/constant";

export default {
  data() {
    return {
      type: "",
      detail: {
        id: undefined,
        cityId: "",
        cityName: "",
        businessActivityType: undefined,
        siteName: "",
        address: "",
        money: undefined,
        introduction: "",
        imageList: [],
      },
      BUSINESS_ACTIVITY_LIST,
      BUSINESS_ACTIVITY_STATUS,
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
      getBusinessDetail(params).then((res) => {
        this.detail = {
          ...res.data,
        };
      });
    },
  },
};
</script>

<style lang="less" scoped>
.img-wrap {
  display: flex;
  flex-wrap: wrap;
}

.img {
  margin-right: 8px;
  margin-bottom: 8px;
  width: 200px;
  height: 200px;
  position: relative;
  .del-icon {
    position: absolute;
    top: 10px;
    right: 10px;
  }
}
</style>
