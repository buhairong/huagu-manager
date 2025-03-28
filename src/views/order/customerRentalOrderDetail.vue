<template>
  <div>
      <el-breadcrumb separator="/">
          <el-breadcrumb-item>订单管理</el-breadcrumb-item>
          <el-breadcrumb-item class="subscription-plan">订单详情</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="content">
        <div style="width:100%;">
          <div class="tabs">
              <div 
                  v-for="tab in tabs"
                  :key="tab.id"
                  class="tab"
                  :class="{active: tab.id === activeTab}"
                  @click="changeTab(tab.id)"
              >
                  {{tab.text}}
              </div>
          </div>

          <div style="margin-top: 40px;display:flex;justify-content: center;" v-if="detail">
              <CustomerOrderCustomerInfo 
                v-show="activeTab===1"
                :detail="detail"
              />

              <CustomerOrderCarInfo 
                v-show="activeTab===2"
                :detail="detail"
              />

              <CustomerOrderPlanInfo 
                v-show="activeTab===3"
                :detail="detail"
              />
              
              <CustomerOrderContractInfo 
                v-show="activeTab===4"
                :detail="detail"
              />
          </div>
        </div>

        <back-button />
      </div>
  </div>
</template>

<script>
import { getRenterOrderDetail } from "@/api/order/customerOrder";
import CustomerOrderCustomerInfo from './components/CustomerOrderCustomerInfo.vue'
import CustomerOrderCarInfo from './components/CustomerOrderCarInfo.vue'
import CustomerOrderPlanInfo from './components/CustomerOrderPlanInfo.vue'
import CustomerOrderContractInfo from './components/CustomerOrderContractInfo.vue'

export default {
  name: 'customerRentalOrderDetail',

  components: {
    CustomerOrderCustomerInfo,
    CustomerOrderCarInfo,
    CustomerOrderPlanInfo,
    CustomerOrderContractInfo,
  },

  data() {
    return {
      orderId: null,
      detail: null,
      activeTab: 1,
      tabs: [
          {id: 1, text: '客户信息'},
          {id: 2, text: '车辆信息'},
          {id: 3, text: '方案信息'},
          {id: 4, text: '合同信息'},
      ],
    }
  },

  mounted() {
    this.orderId = this.$route.query.orderId
    this.getOrderDetail()
  },

  methods: {
    getOrderDetail() {
      const data = {
        id: this.orderId
      }

      getRenterOrderDetail(data).then(res => {
        if (res.code === 0) {
          this.detail = {
            ...res.data.carTypeYearProduct,
            ...res.data.userCarFinanceLeaseSubscribe,
            ...res.data.userCompanyEntity,
            ...res.data.userEntity,
            ...res.data.userInfoEntity,
            userMobile: res.data.userEntity.mobile,
            emergencyContactName: res.data.userCarFinanceLeaseSubscribe.alternateContactName,
            emergencyContactPhone: res.data.userCarFinanceLeaseSubscribe.alternateContactMobile,
            carFullName: `${res.data.carTypeYearProduct.carBrand} ${res.data.carTypeYearProduct.carType}  ${res.data.carTypeYearProduct.carTypeYear}  ${res.data.carTypeYearProduct.carTypeYearProduct}`,
            purchaseTax: res.data.userCarFinanceLeaseSubscribe.tax,
            ticketPrice: res.data.userCarFinanceLeaseSubscribe.companyQuotation,
            carVin: res.data.userCarFinanceLeaseSubscribe.vimNum,
            carPlateNum: res.data.userCarFinanceLeaseSubscribe.plateNum,
            insurePeriod: res.data.userCarFinanceLeaseSubscribe.insureYear,
            devicePrice: res.data.userCarFinanceLeaseSubscribe.equipmentAmount,
            insurePrice: res.data.userCarFinanceLeaseSubscribe.insuranceExpenses,
            period: res.data.userCarFinanceLeaseSubscribe.subscriptionCycle,
            monthTotal: res.data.userCarFinanceLeaseSubscribe.monthsPerPeriod,
            firstPeriodRate: (res.data.userCarFinanceLeaseSubscribe.downPayment / res.data.userCarFinanceLeaseSubscribe.equipmentAmount * 100).toFixed(2),
            depositRate: (res.data.userCarFinanceLeaseSubscribe.deposit / res.data.userCarFinanceLeaseSubscribe.equipmentAmount * 100).toFixed(2),
            residualValueRate: (res.data.userCarFinanceLeaseSubscribe.residualValue / res.data.userCarFinanceLeaseSubscribe.equipmentAmount * 100).toFixed(2),
            irrRate: res.data.userCarFinanceLeaseSubscribe.annualInterestRate,
            contractLabelNum: res.data.userCarFinanceLeaseSubscribe.contractNum,
            contractList: res.data.userCarFinanceLeaseSubscribe.contractUrlList,
          }
        }
      })
    },

    changeTab(tab) {
      this.activeTab = tab
    },

  },
}
</script>

<style lang="less" scoped>
.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  .tabs {
    width: 100%;
    white-space: nowrap;
    overflow: auto;
    .tab {
      display: inline-block;
      margin-right: 8px;
      width: 88px;
      height: 28px;
      line-height: 28px;
      text-align: center;
      border-radius: 32px;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      cursor: default;
      &.active {
        background: #F2F3F8;
        color: #3446AA;
      }
    }
  }
}
</style>