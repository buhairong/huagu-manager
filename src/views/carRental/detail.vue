<template>
  <div>
      <el-breadcrumb separator="/">
          <el-breadcrumb-item>产品管理</el-breadcrumb-item>
          <el-breadcrumb-item class="subscription-plan">会员租车详情</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="content" v-if="detail">
        <CarInfo :carInfo="detail.carTypeYearProductEntity" />

        <div class="title">方案详情</div>
        <div class="container">
          <CitySubscribeDetail :citySubscribe="detail.citySubscribeReq" @handleChangeCity="handleChangeCity" />

          <div class="item">
            <div class="item-title">逾期还车违约金</div>
            <div class="item-content">
              {{ formatThousandNumber(currentCity.contractDamages) }} 元/月
            </div>
          </div>

          <div>
            <div v-for="item in currentCity.typeReqVos" :key="item.period">
              <div class="sub-title">{{item.period}}天套餐</div>
              <div class="item">
                <div class="item-title">租赁周期</div>
                <div class="item-content">{{item.period}}天</div>
              </div>
              <div class="item">
                <div class="item-title">车辆租金</div>
                <div class="item-content">
                  {{ formatThousandNumber(item.money) }} 元/月
                </div>
              </div>
              <div class="item">
                <div class="item-title">车辆押金</div>
                <div class="item-content">
                  {{ currentCity.type === 1 ? formatThousandNumber(item.money * currentCity.month) : formatThousandNumber(currentCity.deposit) }} 元/月
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="btn-group">
          <back-button />
        </div>
      </div>
  </div>
</template>

<script>
import { getCarRentalDetail } from '@/api/carRental/carRental'
import { formatThousandNumber } from "@/utils/util"
import CarInfo from './components/CarInfo.vue'
import CitySubscribeDetail from './components/CitySubscribeDetail.vue'

export default {
  name: 'CarRentalDetail',

  components: {
    CarInfo,
    CitySubscribeDetail,
  },

  data() {
    return {
      carRentalId: null,
      detail: null,
      currentCity: {},
    }
  },

  mounted() {
    this.carRentalId = this.$route.query.carRentalId
    this.getCarRentalDetail()
  },

  methods: {
    getCarRentalDetail() {
      const data = {
        id: this.carRentalId,
      };

      getCarRentalDetail(data).then((res) => {
        if (res.code === 0) {
          this.detail = res.data
          this.currentCity = this.detail.citySubscribeReq[0]
        }
      })
    },

    handleChangeCity(city) {
      this.currentCity = city
    },

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
.content {
  padding: 20px 100px;
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

.sub-title {
  margin-top: 30px;
  margin-bottom: 16px;
  width: 130px;
  height: 22px;
  font-family: PingFangSC-Medium;
  font-size: 16px;
  line-height: 22px;
  color: #1D2129;
	text-align: right;
}
.btn-group {
  margin-top: 60px;
  display: flex;
  justify-content: center;
}
</style>