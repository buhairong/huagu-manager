<template>
  <div>
    <div class="title">车辆信息</div>
    <div class="container">
      <div class="item">
        <div class="item-title">车辆指导金额:</div>
        <div class="item-content">
          {{ formatThousandNumber(carInfo.guidancePrice) }}元
        </div>
      </div>

      <div class="item">
        <div class="item-title">车型:</div>
        <div class="item-content">
          {{ carInfo.carBrand }}·{{ carInfo.carType }}
          {{ carInfo.carTypeYear }}
          {{ carInfo.carTypeYearProduct }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatThousandNumber } from "@/utils/util"

export default {
  name: "CarInfo",

  components: {},

  props: {
    carInfo: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
     
    }
  },

  mounted() {
    
  },

  methods: {
    formatThousandNumber(num) {
      if (num || num == 0) {
        return formatThousandNumber(num)
      }
      return 0
    },
  },
}
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
  padding-left: 50px;
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
