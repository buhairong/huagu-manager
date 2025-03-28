<template>
  <div class="container-wrap">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>会员租车</el-breadcrumb-item>
      <el-breadcrumb-item>商务活动</el-breadcrumb-item>
      <el-breadcrumb-item class="subscription-plan"
        >{{ type === "add" ? "添加" : "编辑" }}商务活动订单</el-breadcrumb-item
      >
    </el-breadcrumb>
    <div class="page-content add-page-content">
      <div class="form-wrap">
        <div class="info-wrap">
          <div class="item">
            <div class="item-title">活动城市：</div>
            <div class="item-content">
              {{ businessDetail.cityName }}
            </div>
          </div>

          <div class="item">
            <div class="item-title">活动类型：</div>
            <div class="item-content">
              {{
                BUSINESS_ACTIVITY_STATUS[businessDetail.businessActivityType]
              }}
            </div>
          </div>

          <div class="item">
            <div class="item-title">活动名称：</div>
            <div class="item-content">
              {{ businessDetail.siteName }}
            </div>
          </div>

          <div class="item">
            <div class="item-title">活动地址：</div>
            <div class="item-content">
              {{ businessDetail.address }}
            </div>
          </div>

          <div class="item">
            <div class="item-title">活动价格：</div>
            <div class="item-content">
              {{
                businessDetail.money
                  ? `${formatThousandNumber(businessDetail.money)}元/小时`
                  : "-"
              }}
            </div>
          </div>
          <div class="item">
            <div class="item-title">活动介绍：</div>
            <div class="item-content">
              {{ businessDetail.introduction }}
            </div>
          </div>

          <div class="item img-item">
            <div class="item-title">场地图片：</div>
            <div class="item-content">
              <div class="img-wrap">
                <div
                  class="img"
                  v-for="(img, index) in businessDetail.imageList"
                  :key="index"
                >
                  <el-image
                    style="width: 100%; height: 100%"
                    :src="img"
                    fit="cover"
                    :preview-src-list="businessDetail.imageList"
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
          :rules="rules"
          label-width="auto"
        >
          <!-- <el-form-item label="订单类型" prop="orderType">
            <el-radio-group v-model="detail.orderType">
              <el-radio
                v-for="item in CUSTOM_TYPE"
                :key="item.value"
                :label="item.value"
                >{{ item.label }}</el-radio
              >
            </el-radio-group>
          </el-form-item> -->

          <el-form-item label="企业" prop="companyId">
            <el-select
              value-key="id"
              placeholder="选择企业"
              v-model="detail.companyName"
              filterable
              @change="changeCompany"
            >
              <el-option
                v-for="item in companyList"
                :key="item.id"
                :label="item.companyName"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="可用余额" prop="amount">
            {{ `${formatThousandNumber(detail.amount)}元` }}
          </el-form-item>

          <el-form-item label="支付方式" prop="payWay">
            <el-radio-group v-model="detail.payWay">
              <el-radio
                v-for="item in BUSINESS_ORDER_PAY_WAY_LIST"
                :key="item.value"
                :label="item.value"
              >
                {{ item.label }}
              </el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="联系人" prop="contactName">
            <c-input
              :inputValue.sync="detail.contactName"
              placeholder="请输入联系人"
              :maxlength="20"
            >
            </c-input>
          </el-form-item>

          <el-form-item label="手机号" prop="mobile">
            <c-input
              :inputValue.sync="detail.mobile"
              placeholder="请输入手机号"
              :maxlength="20"
            >
            </c-input>
          </el-form-item>

          <el-form-item label="预定时间" prop="dateRange">
            <el-date-picker
              v-model="detail.dateRange"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束日期"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              @change="handlerSelectDate"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item label="活动总价" prop="money">
            <div class="sub">
              <c-input-number
                :inputValue.sync="detail.money"
                placeholder="请输入活动总价"
              >
              </c-input-number
              >&nbsp;&nbsp; 元
            </div>
          </el-form-item>

          <el-form-item label="备注" prop="remark">
            <c-text-area
              :inputValue.sync="detail.remark"
              placeholder="请输入备注~最多可输入100个字"
            />
          </el-form-item>
        </el-form>
      </div>

      <div class="buttom-btn-group">
        <div class="btn" @click="back">取消</div>
        <div class="btn save-btn" @click="save">保存</div>
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
  BUSINESS_ORDER_PAY_WAY_LIST,
} from "@/utils/constant";
import { phoneReg } from "@/utils/validate";
import { mapState } from "vuex";
import { getEnterpriseList } from "@/api/rental/enterprise";

export default {
  data() {
    return {
      type: "",
      search: {
        corporationTaxNumber: "",
        companyName: "",
        contactName: "",
        address: "",
        limit: 1000,
        page: 1,
      },
      companyList: [],
      businessDetail: {
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
      detail: {
        id: undefined,
        memberBusinessActivityId: undefined, // 活动场地ID
        memberButlerId: undefined, // 管家ID
        orderType: "2", // 订单类型 1 个人订单 2 企业订单
        userId: undefined,
        account: undefined,
        companyId: undefined, // 公司ID
        companyName: "", // 公司名称
        cityId: "",
        cityName: "",
        contactName: "", // 联系人
        mobile: "", // 手机号
        startDate: "", // 预定开始时间
        endDate: "", // 预定结束时间
        money: undefined, // 活动总价
        remark: "", // 备注
        dateRange: [],
        amount: 0,
        payWay: undefined,
      },

      rules: {
        companyId: [
          {
            required: true,
            message: "请选择公司",
            trigger: "blur",
          },
        ],
        payWay: [
          {
            required: true,
            message: "请选择支付方式",
            trigger: "blur",
          },
        ],
        contactName: [
          {
            required: true,
            message: "请输入联系人",
            trigger: "blur",
          },
        ],
        mobile: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur",
          },
          {
            pattern: phoneReg,
            message: "请输入正确的手机号",
            trigger: "blur",
          },
        ],
        money: [
          {
            required: true,
            message: "请输入活动总价",
            trigger: "blur",
          },
        ],
        dateRange: [
          {
            required: true,
            message: "请选择预定时间",
            trigger: "blur",
          },
        ],
      },
      BUSINESS_ACTIVITY_LIST,
      BUSINESS_ACTIVITY_STATUS,
      CUSTOM_TYPE,
      CUSTOM_TYPE_STATUS,
      BUSINESS_ORDER_PAY_WAY_LIST,
    };
  },

  computed: {
    ...mapState(["userInfo"]),
  },

  mounted() {
    this.type = this.$route.query.type;
    this.detail.memberBusinessActivityId = this.$route.query.businessId;
    this.detail.account = this.userInfo.account;

    //this.detail.account = '13512345678'

    this.getBusinessDetail();
    this.getEnterpriseList();

    // if (this.type === "edit") {
    //   this.detail.id = this.$route.query.id;
    //   this.getDetail();
    // }
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

    getEnterpriseList() {
      getEnterpriseList(this.search).then((res) => {
        this.companyList = res.data.records;
      });
    },

    getBusinessDetail() {
      const params = {
        id: this.detail.memberBusinessActivityId,
      };
      getBusinessDetail(params).then((res) => {
        this.businessDetail = {
          ...res.data,
        };
        this.detail.cityId = res.data?.cityId;
        this.detail.cityName = res.data.cityName;
      });
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

    changeCompany(e) {
      this.detail.companyId = e.id;
      this.detail.companyName = e.companyName;
      this.detail.amount = e?.userCompanyAccountEntity?.rechargeAmount || 0;
    },

    handlerSelectDate(data) {
      if (data) {
        this.detail.startDate = data[0];
        this.detail.endDate = data[1];
        this.detail.dateRange = data;
      } else {
        this.detail.startDate = "";
        this.detail.endDate = "";
        this.detail.dateRange = [];
      }
    },

    save() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          addOrUpdateBusinessOrder(this.detail)
            .then((res) => {
              if (res.code === 0) {
                this.$message.success("保存成功");
                if (this.type === "edit") {
                  this.back();
                } else {
                  this.$router.push({
                    path: "/rental/business/businessOrderList",
                  });
                }
              } else {
                this.$message.error(res.msg || "保存失败");
              }
            })
            .catch((err) => {
              this.$message.error("保存失败");
            });
        }
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
