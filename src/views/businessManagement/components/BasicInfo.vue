<template>
  <div class="container">
    <div class="left">
      <div class="item">
        <div class="item-title">企业名称:</div>
        <div class="item-content">{{ detail.companyName || "-" }}</div>
      </div>

      <div class="item">
        <div class="item-title">商户名称:</div>
        <div class="item-content">{{ detail.shopName || "-" }}</div>
      </div>

      <div class="item" v-if="type == 1">
        <div class="item-title">所在城市:</div>
        <div class="item-content">{{ detail.cityName || "-" }}</div>
      </div>

      <div class="item" v-if="type == 1">
        <div class="item-title">销售品牌:</div>
        <div class="item-content">
          <div
            class="brand-list"
            v-if="detail.carBrandNameList && detail.carBrandNameList.length"
          >
            {{ detail.carBrandNameList.join("、") }}
          </div>
          <div v-else>-</div>
        </div>
      </div>

      <div class="item">
        <div class="item-title">营业执照:</div>
        <div class="item-content">
          <el-image
            v-if="detail.businessLicense"
            class="preview-img"
            :src="detail.businessLicense"
            :preview-src-list="[detail.businessLicense]"
          >
          </el-image>
          <div v-else>-</div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="item">
        <div class="item-title">统一社会信用代码:</div>
        <div class="item-content">{{ detail.corporationTaxNumber || "-" }}</div>
      </div>

      <div class="item" v-if="type == 1">
        <div class="item-title">商户角色:</div>
        <div class="item-content">
          {{ COMPANY_TYPE[type] }}-{{ COMPANY_ROLE[detail.chooseRole] }}
        </div>
      </div>

      <div class="item">
        <div class="item-title">详细地址:</div>
        <div class="item-content">{{ detail.address || "-" }}</div>
      </div>

      <div class="item">
        <div class="item-title">商户联系方式:</div>
        <div class="item-content">{{ detail.contactMobile || "-" }}</div>
      </div>

      <div class="item" v-if="type == 1">
        <div class="item-title">资产持有公司:</div>
        <div class="item-content">
          {{ ASSET_COMPANY[detail.isFinancial] }}
        </div>
      </div>

      <div class="item" v-if="type == 1">
        <div class="item-title">商户照片:</div>
        <div class="item-content">
          <el-image
            v-if="detail.shopHeadPic"
            class="preview-img"
            :src="detail.shopHeadPic"
            :preview-src-list="[detail.shopHeadPic]"
          >
          </el-image>
          <div v-else>-</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ASSET_COMPANY, COMPANY_TYPE, COMPANY_ROLE } from '@/utils/constant'

export default {
  props: {
    detail: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      ASSET_COMPANY,
      COMPANY_TYPE,
      COMPANY_ROLE,
    }
  },
}
</script>

<style lang="less" scoped>
.container {
  display: flex;
  .left {
    width: 400px;
    margin-right: 30px;
  }
  .right {
    width: 400px;
  }
  .item {
    margin-bottom: 16px;
    display: flex;
    .item-title {
      margin-right: 8px;
      height: 21px;
      font-family: PingFang-SC-Medium;
      font-size: 14px;
      line-height: 21px;
      color: #86909c;
      width: 130px;
      text-align: right;
    }
    .item-content {
      width: 0;
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      font-family: PingFang-SC-Medium;
      font-size: 14px;
      line-height: 21px;
      color: #1d2129;
      .preview-img {
        width: 95px;
      }
    }
  }
}
</style>
