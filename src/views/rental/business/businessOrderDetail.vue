<template>
  <div class="container-wrap">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>会员租车</el-breadcrumb-item>
      <el-breadcrumb-item>商务活动</el-breadcrumb-item>
      <el-breadcrumb-item class="subscription-plan"
        >订单详情</el-breadcrumb-item
      >
    </el-breadcrumb>
    <div class="page-content add-page-content">
      <div class="form-wrap">
        <div class="info-wrap">
          <div class="item">
            <div class="item-title">活动城市：</div>
            <div class="item-content">
              {{ detail.memberBusinessActivityEntity.cityName }}
            </div>
          </div>

          <div class="item">
            <div class="item-title">活动类型：</div>
            <div class="item-content">
              {{
                BUSINESS_ACTIVITY_STATUS[
                  detail.memberBusinessActivityEntity.businessActivityType
                ]
              }}
            </div>
          </div>

          <div class="item">
            <div class="item-title">活动名称：</div>
            <div class="item-content">
              {{ detail.memberBusinessActivityEntity.siteName }}
            </div>
          </div>

          <div class="item">
            <div class="item-title">活动地址：</div>
            <div class="item-content">
              {{ detail.memberBusinessActivityEntity.address }}
            </div>
          </div>

          <div class="item">
            <div class="item-title">活动价格：</div>
            <div class="item-content">
              {{
                detail.memberBusinessActivityEntity.money
                  ? `${formatThousandNumber(
                      detail.memberBusinessActivityEntity.money
                    )}元/小时`
                  : "-"
              }}
            </div>
          </div>
          <div class="item">
            <div class="item-title">活动介绍：</div>
            <div class="item-content">
              {{ detail.memberBusinessActivityEntity.introduction }}
            </div>
          </div>

          <div class="item img-item">
            <div class="item-title">场地图片：</div>
            <div class="item-content">
              <div class="img-wrap">
                <div
                  class="img"
                  v-for="(img, index) in detail.memberBusinessActivityEntity
                    .imageList"
                  :key="index"
                >
                  <el-image
                    style="width: 100%; height: 100%"
                    :src="img"
                    fit="cover"
                    :preview-src-list="
                      detail.memberBusinessActivityEntity.imageList
                    "
                    :initial-index="index"
                  ></el-image>
                </div>
              </div>
            </div>
          </div>
        </div>
        <el-form
          class="add-form"
          ref="formRef"
          :model="detail"
          label-width="auto"
        >
          <el-form-item label="企业" prop="companyId">
            {{ detail?.userCompanyEntity?.companyName }}
          </el-form-item>

          <el-form-item label="联系人" prop="contactName">
            {{ detail.contactName }}
          </el-form-item>

          <el-form-item label="手机号" prop="mobile">
            {{ detail.mobile }}
          </el-form-item>

          <el-form-item label="预定开始时间" prop="dateRange">
            {{ detail.startDate }}
          </el-form-item>

          <el-form-item label="预定结束时间" prop="dateRange">
            {{ detail.endDate }}
          </el-form-item>

          <el-form-item label="活动总价" prop="money">
            {{ detail.money ? `${formatThousandNumber(detail.money)}元` : "-" }}
          </el-form-item>

          <el-form-item label="支付方式" prop="payWay">
            {{ BUSINESS_ORDER_PAY_WAY_STATUS[detail.payWay] }}
          </el-form-item>

          <el-form-item label="备注" prop="remark">
            {{ detail.remark }}
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
import {
  getBusinessDetail,
  getBusinessOrderDetail,
  addOrUpdateBusinessOrder,
} from "@/api/rental/business";
import {
  BUSINESS_ACTIVITY_LIST,
  BUSINESS_ACTIVITY_STATUS,
  CUSTOM_TYPE,
  CUSTOM_TYPE_STATUS,
  BUSINESS_ORDER_PAY_WAY_STATUS,
} from "@/utils/constant";
import { phoneReg } from "@/utils/validate";
import { mapState } from "vuex";
import { getEnterpriseList } from "@/api/rental/enterprise";

export default {
  data() {
    return {
      detail: {},
      BUSINESS_ACTIVITY_LIST,
      BUSINESS_ACTIVITY_STATUS,
      BUSINESS_ORDER_PAY_WAY_STATUS,
      CUSTOM_TYPE,
      CUSTOM_TYPE_STATUS,
    };
  },

  computed: {
    ...mapState(["userInfo"]),
  },

  mounted() {
    this.type = this.$route.query.type;
    this.detail.id = this.$route.query.id;
    this.detail.account = this.userInfo.account;

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
      getBusinessOrderDetail(params).then((res) => {
        this.detail = {
          ...res.data,
        };
      });
    },
  },
};
</script>

<style lang="less" scoped>
.info-wrap {
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  .item {
    width: 50%;
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
      display: flex;
      flex-wrap: wrap;
      font-family: PingFang-SC-Medium;
      font-size: 14px;
      line-height: 21px;
      color: #1d2129;
    }
  }
  .img-item {
    width: 100%;
  }
}

.add-form {
  width: 80%;
}

.img-wrap {
  display: flex;
  flex-wrap: wrap;
}

.img {
  margin-right: 8px;
  margin-bottom: 8px;
  width: 200px;
  height: 200px;
}
</style>
