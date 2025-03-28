<template>
  <div>
    <div class="title">车辆信息</div>
    <div class="container">
      <div class="left">
        <div class="item">
          <div class="item-title">车型信息:</div>
          <div class="item-content">{{ detail.carFullName }}</div>
        </div>

        <div class="item">
          <div class="item-title">购置税:</div>
          <div class="item-content">{{formatThousandNumber(detail.purchaseTax)}}元</div>
        </div>

        <div class="item">
          <div class="item-title">外观颜色:</div>
          <div class="item-content">{{ detail.outColor }}</div>
        </div>

        <div class="item">
          <div class="item-title">车牌号:</div>
          <div class="item-content">{{ detail.carPlateNum }}</div>
        </div>

        <div class="item">
          <div class="item-title">用户是否自有牌照:</div>
          <div class="item-content">{{ detail.hasCarPlateNum === 1 ? '有' : ' 无' }}</div>
        </div>

        <div class="item">
          <div class="item-title">保险打包年数:</div>
          <div class="item-content">{{ SUBSCRIBE_PERIOD_STATUS[detail.insurePeriod] }}</div>
        </div>

        <div class="item">
          <div class="item-title">保险费用:</div>
          <div class="item-content">{{formatThousandNumber(detail.insurePrice)}}元</div>
        </div>
      </div>
      <div class="right">
        <div class="item">
          <div class="item-title">厂商指导价:</div>
          <div class="item-content">{{formatThousandNumber(detail.guidancePrice)}}元</div>
        </div>

        <div class="item">
          <div class="item-title">公司报价:</div>
          <div class="item-content">{{formatThousandNumber(detail.ticketPrice)}}元</div>
        </div>

        <div class="item">
          <div class="item-title">内饰颜色:</div>
          <div class="item-content">{{ detail.inColor }}</div>
        </div>

        <div class="item">
          <div class="item-title">车架号:</div>
          <div class="item-content">{{ detail.carVin }}</div>
        </div>

        <div class="item" v-if="detail.hasCarPlateNum === 2">
          <div class="item-title">牌照费/牌照月租:</div>
          <div class="item-content">{{formatThousandNumber(detail.plateMonthPrice)}}元</div>
        </div>

        <div class="item">
          <div class="item-title">商业险购买年限:</div>
          <div class="item-content">{{ SUBSCRIBE_PERIOD_STATUS[detail.commercialInsurePeriod] }}</div>
        </div>

        <div class="item">
          <div class="item-title">设备价格:</div>
          <div class="item-content">{{formatThousandNumber(detail.devicePrice)}}元</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SUBSCRIBE_PERIOD_STATUS } from "@/utils/constant";
import { formatThousandNumber } from '@/utils/util'

export default {
  name: "CustomerOrderCarInfo",

  components: {},

  props: {
    detail: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      SUBSCRIBE_PERIOD_STATUS,
    };
  },

  mounted() {},

  methods: {
    formatThousandNumber(num) {
      if (num || num == 0) {
        return formatThousandNumber(num)
      }
      return 0
    },
  },
};
</script>

<style lang="less" scoped>
.title {
  margin: 24px 0;
  height: 22px;
  font-family: PingFangSC-Regular;
  font-size: 16px;
  line-height: 22px;
  color: #1d2129;
}
.container {
  display: flex;
  .left {
    width: 350px;
    margin-right: 30px;
  }
  .right {
    width: 350px;
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
    }
  }
}
</style>
