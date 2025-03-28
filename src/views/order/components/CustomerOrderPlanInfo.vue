<template>
  <div>
    <div class="title">方案信息</div>

    <div class="item">
      <div class="item-title">设备价格:</div>
      <div class="item-content">{{formatThousandNumber(detail.devicePrice)}}元</div>
    </div>

    <div class="item">
      <div class="item-title">融资年限:</div>
      <div class="item-content">{{SUBSCRIBE_PERIOD_STATUS[detail.period]}}</div>
    </div>

    <div class="item">
      <div class="item-title">每期月数:</div>
      <div class="item-content">{{detail.monthTotal}}个月</div>
    </div>

    <div class="item">
      <div class="item-title">首付比例:</div>
      <div class="item-content">{{detail.firstPeriodRate}}%（{{detail.downPayment || formatThousandNumber(detail.devicePrice * detail.firstPeriodRate / 100)}}元）</div>
    </div>

    <div class="item">
      <div class="item-title">押金比例:</div>
      <div class="item-content">{{detail.depositRate}}%（{{detail.deposit || formatThousandNumber(detail.devicePrice * detail.depositRate / 100)}}元）</div>
    </div>

    <div class="item">
      <div class="item-title">残值比例:</div>
      <div class="item-content">{{detail.residualValueRate}}%（{{detail.residualValue || formatThousandNumber(detail.devicePrice * detail.residualValueRate / 100)}}元）</div>
    </div>

    <div class="item">
      <div class="item-title">年利率:</div>
      <div class="item-content">{{detail.irrRate}}%</div>
    </div>

    <div class="item">
      <div class="item-title">订阅开始日:</div>
      <div class="item-content">{{detail.startDate}}</div>
    </div>

    <div class="item">
      <div class="item-title">期初期末支付区分:</div>
      <div class="item-content">{{detail.payType === 1 ? '期初' : '期末'}}</div>
    </div>

  </div>
</template>

<script>
import { SUBSCRIBE_PERIOD_STATUS } from '@/utils/constant'
import { formatThousandNumber } from '@/utils/util'

export default {
  name: "CustomerOrderPlanInfo",

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
    }
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
</style>
