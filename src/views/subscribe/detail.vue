<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>订阅方案</el-breadcrumb-item>
      <el-breadcrumb-item class="subscription-plan"
        >查看详情</el-breadcrumb-item
      >
    </el-breadcrumb>

    <div class="content" v-if="detail">
      <div>
        <div class="title">车辆信息</div>
        <div class="container">
          <div class="item" v-if="type == 1">
            <div class="item-title">车辆指导金额:</div>
            <div class="item-content">
              {{ formatThousandNumber(detail.carType.guidancePrice) }}元
            </div>
          </div>

          <div class="item">
            <div class="item-title">车型:</div>
            <div class="item-content">
              {{ detail.carType.carBrand }}·{{ detail.carType.carType }}
              {{ detail.carType.carTypeYear }}
              {{ detail.carType.carTypeYearProduct }}
            </div>
          </div>

          <div class="item">
            <div class="item-title">
              {{ type == 1 ? "用户可选颜色" : "车辆颜色" }}:
            </div>
            <div class="item-content">{{ detail.colors.join("、") }}</div>
          </div>

          <div class="item">
            <div class="item-title">
              {{ type == 1 ? "用户可选增配项" : "增配项" }}:
            </div>
            <div class="item-content">
              {{
                detail.otherConfigs.length
                  ? detail.otherConfigs[0].details
                      .map((item) => item.detailName)
                      .join("、")
                  : ""
              }}
            </div>
          </div>
        </div>

        <div class="title">方案详情</div>
        <div class="container">
          <div class="item" v-if="type == 1">
            <div class="item-title">专属城市:</div>
            <div class="item-content">
              <div class="city-tag-list">
                <div
                  v-for="city in detailArr"
                  :key="city.cityId"
                  class="city-tag"
                  :class="{ 'active-city-tag': city.cityId == detail.cityId }"
                  @click="handleChangeCityTag(city)"
                >
                  {{ city.cityId ? city.cityName : "通用城市" }}
                </div>
              </div>
            </div>
          </div>

          <div class="item" v-if="type == 1">
            <div class="item-title">上架方案:</div>
            <div class="item-content">
              <div class="city-tag-list">
                <div
                  v-for="item in detailList"
                  :key="item.id"
                  class="city-tag"
                  :class="{ 'active-city-tag': item.id == detail.id }"
                  @click="handleChangeDetail(item)"
                >
                  <div v-if="item.monthTotal === 12 && item.paymentType === 0">12期订阅（一次性付）</div>
                  <div v-else-if="item.monthTotal === 6 && item.paymentType === 4">12期订阅（半年付）</div>
                  <div v-else>6期订阅（一次性付）</div>
                </div>
              </div>
            </div>
          </div>

          <div class="item" v-if="type == 2">
            <div class="item-title">车辆售价:</div>
            <div class="item-content">
              {{ formatThousandNumber(detail.nakedCarPrice) }}元
            </div>
          </div>

          <div class="item" v-if="type == 1">
            <div class="item-title">车辆购置税:</div>
            <div class="item-content">
              {{ formatThousandNumber(detail.purchaseTax) }}元
            </div>
          </div>

          <div class="item">
            <div class="item-title">订阅周期:</div>
            <div class="item-content">{{ detail.monthTotal }}期</div>
          </div>

          <div class="item">
            <div class="item-title">订阅押金:</div>
            <div class="item-content">
              {{ formatThousandNumber(detail.deposit) }}元
            </div>
          </div>

          <div class="item" v-if="type == 1">
            <div class="item-title">车商收购价:</div>
            <div class="item-content">{{ formatThousandNumber(detail.purchasingPrice) }}元</div>
          </div>

          <div class="item" v-if="type == 1">
            <div class="item-title">个人成交价:</div>
            <div class="item-content">{{ formatThousandNumber(detail.transactionPrice) }}元</div>
          </div>

          <div class="item">
            <div class="item-title">12个月后二手车估价:</div>
            <div class="item-content">{{ formatThousandNumber(detail.twelveMonthMoney) }}元</div>
          </div>

          <div class="item" v-if="type == 1">
            <div class="item-title">厂商折扣:</div>
            <div class="item-content">{{ detail.discount }}%</div>
          </div>

          <div class="item" v-if="type == 1">
            <div class="item-title">预留利润:</div>
            <div class="item-content">{{ detail.profit }}%</div>
          </div>

          <div class="item">
            <div class="item-title">期末余值比例:</div>
            <div class="item-content">{{ detail.residualValueRate }}%</div>
          </div>

          <div class="item">
            <div class="item-title">订阅费用:</div>
            <div class="item-content">
              <div>
                <div
                  class="apportion-item"
                  v-for="(item, index) in detail.apportionFeeRecordList"
                  :key="index"
                >
                  <div style="width: 70px">
                    {{
                      `${
                        item.period - detail.apportionFeeRecordList.length + 1
                      }`
                    }}-{{ item.period }}期
                  </div>
                  <div class="split"></div>
                  <div class="right">
                    <div style="width: 120px">摊销比例 {{ item.rate }}%</div>
                    <div>
                      订阅费用
                      {{ formatThousandNumber(item.totalPayment) }}元（{{
                        formatThousandNumber(item.mouthPayment)
                      }}元/月）
                    </div>
                    <div>
                      期末余值 {{ formatThousandNumber(item.buyoutsFee) }}元
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="item">
            <div class="item-title">期末余值比例:</div>
            <div class="item-content">{{ detail.residualValueRate }}%</div>
          </div>

          <div class="item">
            <div class="item-title">分销佣金:</div>
            <div class="item-content">
              {{ formatThousandNumber(detail.distributionBrokerage) }}元
            </div>
          </div>

          <div class="item">
            <div class="item-title">差异化服务:</div>
            <div class="item-content">
              {{
                detail.carSubscribeFreeServiceList
                  .map((item) => item.serviceName)
                  .join("、")
              }}
            </div>
          </div>

          <div class="item">
            <div class="item-title">保障服务:</div>
            <div class="item-content">
              {{ detail.safeguardServices.join("、") }}
            </div>
          </div>
        </div>
      </div>

      <back-button />
    </div>
  </div>
</template>

<script>
import {
  selectNewCarSubscribeDetail,
  selectCarSubscribeDetail,
} from "@/api/subscribe/subscribe"
import { formatThousandNumber } from "@/utils/util"

export default {
  name: "subscribeDetail",

  data() {
    return {
      subscribeId: null,
      carTypeYearProductId: null,
      type: null,
      detailArr: [],
      detailList: [],
      detail: null,
      finalSelectObj: {
        "-1": "续订车辆",
        0: "买断车辆",
        1: "退回车辆",
      },
    }
  },

  mounted() {
    this.subscribeId = this.$route.query.subscribeId
    this.carTypeYearProductId = this.$route.query.carTypeYearProductId
    this.type = this.$route.query.type

    if (this.type == 1) {
      this.selectNewCarSubscribeDetail()
    } else {
      this.selectCarSubscribeDetail()
    }
  },

  methods: {
    selectNewCarSubscribeDetail() {
      const data = {
        carTypeYearProductId: this.carTypeYearProductId,
      };

      selectNewCarSubscribeDetail(data).then((res) => {
        if (res.code === 0) {
          res.data.forEach((city) => {
            city.detailList.forEach((detail) => {
              detail.safeguardServices = detail.safeguardServices.map(
                (item) => {
                  if (item === 0) {
                    item = "24小时道路救援"
                  } else {
                    item = "免费送车上门"
                  }

                  return item
                }
              )
            })
          })
          this.detailArr = res.data
          this.detailList = res.data[0].detailList

          this.detail = res.data[0].detailList[0]
        }
      });
    },

    selectCarSubscribeDetail() {
      const data = {
        id: this.subscribeId,
      };

      selectCarSubscribeDetail(data).then((res) => {
        if (res.code === 0) {
          res.data[0].detailList[0].safeguardServices = res.data[0].detailList[0].safeguardServices.map(
            (item) => {
              if (item === 0) {
                item = "24小时道路救援"
              } else {
                item = "免费送车上门"
              }

              return item;
            }
          );
          this.detail = res.data[0].detailList[0]
        }
      })
    },

    formatThousandNumber(num) {
      if (num || num == 0) {
        return formatThousandNumber(num)
      }
      return 0
    },

    handleChangeCityTag(city) {
      this.detailList = city.detailList;
      this.detail = city.detailList[0]
    },

    handleChangeDetail(item) {
      this.detail = item
    },
  },
}
</script>

<style lang="less" scoped>
.content {
  padding: 20px 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.title {
  margin: 24px 0;
  height: 22px;
  font-family: PingFangSC-Regular;
  font-size: 16px;
  line-height: 22px;
  color: #1d2129;
}
.container {
  padding-left: 50px;
}

.car-info {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  .car-img {
    width: 108px;
    height: 80px;
    margin-right: 12px;
  }
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
    display: flex;
    flex-wrap: wrap;
    font-family: PingFang-SC-Medium;
    font-size: 14px;
    line-height: 21px;
    color: #1d2129;
  }
}

.apportion-item {
  margin-bottom: 12px;
  padding: 0 16px;
  height: 32px;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #1d2129;
  background: #f2f3f5;
  .split {
    margin: 0 20px;
    width: 1px;
    height: 18px;
    background-color: #a4aebb;
  }
  .right {
    width: 500px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.city-tag-list {
  display: flex;
  flex-wrap: wrap;
  .city-tag {
    margin-right: 16px;
    margin-bottom: 16px;
    height: 28px;
    line-height: 28px;
    border-radius: 2px;
    display: flex;
    padding: 0 6px;
    background: #f2f3f5;
    color: #848484;
    font-size: 14px;
    cursor: default;
  }
  .active-city-tag {
    border: 1px solid #3446aa;
  }
  .close-tag {
    height: 100%;
    display: flex;
    align-items: flex-start;
    margin-left: 6px;
  }
  .city-tag {
    padding: 0 8px;
  }
}
</style>
