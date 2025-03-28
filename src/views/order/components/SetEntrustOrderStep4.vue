<template>
  <div>
    <el-form ref="step4form" :model="detail" :rules="rules" label-width="160px">
      <div class="title">订阅方案</div>
      
      <div class="car-info">
        <el-image
          style="width: 108px;"
          :src="detail.carImage"
        >
        </el-image>
        <div class="info">
          <div class="car-product">{{ detail.carFullName }}</div>
          <div class="guidance-price">车辆指导价 {{ formatThousandNumber(detail.guidancePrice) }}元</div>
        </div>
      </div>

      <el-form-item label="用车城市" prop="cityId">
        <c-select
          :selectValue.sync="detail.cityId"
          :options="cityList"
          placeholder="请选择用车城市"
          :showAllValue="false"
          labelKey="cityName"
          valueKey="cityId"
          :selectStyle="{
            width: '300px'
          }"
          @change="changeCity"
        />
      </el-form-item>

      <el-form-item label="车辆上牌城市" prop="plateCityId" v-if="plateCityList.length">
        <el-radio-group v-model="detail.plateCityId" @input="handleChangePlateCity">
          <el-radio 
            v-for="item in plateCityList"
            :key="item.value"
            :label="item.value"
          >
            {{ item.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="厂商折扣" prop="discount">
        <div>
          <c-input-number 
            :inputValue.sync="detail.discount"
            placeholder="请输入厂商折扣"
            :precision="2"
            :min="-100"
            :inputStyle="{
              width: '300px'
            }"
            @blur="handleCalculate1"
          >
          </c-input-number> %
        </div>
      </el-form-item>

      <el-form-item label="车辆购置税">
        {{ detail.purchaseTax || detail.purchaseTax === 0 ? `${formatThousandNumber(detail.purchaseTax)}元` : '-' }}
      </el-form-item>

      <el-form-item label="预留利润" prop="profit">
        <div>
          <c-input-number 
            :inputValue.sync="detail.profit"
            placeholder="请输入预留利润"
            :precision="2"
            :inputStyle="{
              width: '300px'
            }"
            @blur="handleCalculate"
          >
          </c-input-number> %
        </div>
      </el-form-item>

      <el-form-item label="首期摊销比例" prop="firstPeriodRate">
        <div>
          <c-input-number 
            :inputValue.sync="detail.firstPeriodRate"
            placeholder="请输入首期摊销比例"
            :precision="2"
            :inputStyle="{
              width: '300px'
            }"
            @blur="handleCalculate"
          >
          </c-input-number> %
        </div>
      </el-form-item>

      <el-form-item label="期末余值比例" prop="residualValueRate">
        <div>
          <c-input-number 
            :inputValue.sync="detail.residualValueRate"
            placeholder="请输入期末余值比例"
            :precision="2"
            :inputStyle="{
              width: '300px'
            }"
            @blur="handleCalculate"
          >
          </c-input-number> %
        </div>
      </el-form-item>

      <el-form-item label="12个月后二手车估价" prop="twelveMonthMoney">
        <div>
          <c-input-number 
            :inputValue.sync="detail.twelveMonthMoney"
            placeholder="请输入12个月后二手车估价"
            :inputStyle="{
              width: '300px'
            }"
            @blur="handleCalculate"
          >
          </c-input-number> %
        </div>
      </el-form-item>

      <el-form-item label="车辆押金">
        {{ detail.deposit ? `${formatThousandNumber(detail.deposit)}元` : '-' }}
      </el-form-item>

      <el-form-item label="" v-if="detail.apportionFeeRecordList.length">
        <div class="apportion-item" v-for="(item, index) in detail.apportionFeeRecordList" :key="index">
          <div style="width: 70px;">{{`${item.period-detail.apportionFeeRecordList.length+1}`}}-{{item.period}}期 </div>
          <div class="split"></div>
          <div class="right">
            <div style="width: 120px;">摊销比例 {{item.rate}}%</div>
            <div>订阅费用 {{formatThousandNumber(item.totalPayment)}}元（{{formatThousandNumber(item.mouthPayment)}}元/月）</div>
            <div>期末余值 {{formatThousandNumber(item.buyoutsFee)}}元</div>
          </div>
        </div>
      </el-form-item>

      <el-form-item label="期末选择">
        可续订、可留购、可退回
      </el-form-item>

      <template v-if="detail.typeReqVos.length">
        <div class="title">选择方案</div>

        <div class="plan-list">
          <div 
            v-for="(item, index) in detail.typeReqVos"
            :key="index"
            class="plan"
            :class="{'checked-plan': item.checked}"
            @click="togglePlanList(index)"
          >
            <div class="plan-title">{{ item.title }}</div>
            <div class="plan-item">
              <div class="plan-item-label">订阅费用</div>
              <div class="plan-item-price">{{ formatThousandNumber(item.mouthPayment) }} 元/月</div>
            </div>
            <div class="plan-item">
              <div class="plan-item-label">期末续订</div>
              <div class="plan-item-price">{{ formatThousandNumber(item.nextMouthPayment) }} 元/月</div>
            </div>
            <div class="plan-item">
              <div class="plan-item-label">期末余值</div>
              <div class="plan-item-price">{{ formatThousandNumber(item.buyoutsFee) }} 元/月</div>
            </div>
              
            <img class="plan-checked-img" :src="require('@/assets/subscribe/checked.png')" v-if="item.checked">
          </div>
        </div>
      </template>

      <div class="title">差异化服务</div>

      <el-checkbox-group v-model="detail.checkList" class="service-item-list">
        <el-checkbox
          class="service-item"
          v-for="item in detail.SERVICE_LIST"
          :key="item.id"
          :label="item.serviceName"
          v-model="item.isChecked"
          @change="(e) => handleChange(e, item)"
        >
          <div style="width:70px">{{ item.serviceName }}</div>
          <template v-if="item.requireInputCount">
            <c-input-number 
              style="margin: 0 16px"
              :inputValue.sync="item.size"
              placeholder="请输入次数"
              :disabled="!item.isChecked"
            >
            </c-input-number> 
            次
          </template>
        </el-checkbox>
      </el-checkbox-group>

      <div class="title">保障服务</div>

      <el-checkbox-group v-model="detail.safeguardServices" class="service-item-list">
        <el-checkbox
          v-for="item in SAFE_LIST"
          :key="item.id"
          :label="item.id"
        >  
          {{ item.label }}
        </el-checkbox>
      </el-checkbox-group>
    </el-form>
  </div>
</template>

<script>
import { selectFinanceCityAndPlateMoney } from '@/api/order/orderManagement'
import { calculatePurchaseTaxRatio, selectDepositAndMonthPayOfApportionRate } from '@/api/subscribe/subscribe'
import { formatThousandNumber } from "@/utils/util"
import { SAFE_LIST } from '@/utils/constant'

export default {
  props: {
    detail: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      SAFE_LIST,
      rules: {
        cityId: [
          { required: true, message: "请选择用车城市", trigger: "change" },
        ],
        plateCityId: [
          { required: true, message: "请选择车辆上牌城市", trigger: "change" },
        ],
        discount: [
          { required: true, message: '请输入厂商折扣', trigger: 'blur' }
        ],
        profit: [
          { required: true, message: '请输入预留利润', trigger: 'blur' }
        ],
        firstPeriodRate: [
          { required: true, message: '请输入首期摊销比例', trigger: 'blur' }
        ],
        residualValueRate: [
          { required: true, message: '请输入期末余值比例', trigger: 'blur' }
        ],
        twelveMonthMoney: [
          { required: true, message: '请输入12个月后二手车估价', trigger: 'blur' }
        ],
      },
      cityList: [],
      plateCityList: [],  
    }
  },

  watch: {
    detail: {
      handler(val) {
        this.$emit('change', val)
      },
      immediate: true,
      deep: true
    },

    'detail.carTypeYearProductId': {
      handler(val) {
        this.plateCityList = []
        this.selectFinanceCityAndPlateMoney()
      },
      immediate: true,
      deep: true
    },
  },

  mounted() {
    // this.selectFinanceCityAndPlateMoney()
  },

  methods: {
    formatThousandNumber(num) {
      if (num || num == 0) {
        return formatThousandNumber(num)
      }
      return 0
    },

    selectFinanceCityAndPlateMoney() {
      const data = {
        id: this.detail.carTypeYearProductId
      }

      selectFinanceCityAndPlateMoney(data).then(res => {
        if (res.code === 0) {
          this.cityList = res.data
        }
      })
    },

    changeCity(e) {
      this.detail.cityId = e
      const city = this.cityList.find((item) => item.cityId === e)
      if (city) {
        this.detail.cityName = city.cityName
        if (city.isPlate === 1) {
          this.plateCityList = [
            { value: city.cityId, label: city.cityName },
            { value: city.freeCityId, label: city.freeCityName },
          ]
        } else {
          this.plateCityList = []
        }
      }
    },

    handleChangePlateCity(e) {
      const city = this.plateCityList.find(item => item.value === e)
      if (city) {
        this.detail.plateCityName = city.label
      }
    },

    handleCalculate1() {
      this.calculatePurchaseTaxRatio()
      this.calculate()
    },

    handleCalculate() {
      this.calculate()
    },

    calculatePurchaseTaxRatio() {
      const params = {
        carTypeProductId: this.detail.carTypeYearProductId,
        nakedCarPrice: this.detail.guidancePrice,
        discount: this.detail.discount,
      }

      calculatePurchaseTaxRatio(params).then(res => {
        if(res.code === 0) {
          this.detail.purchaseTax = res.data
        }
      })
    },

    calculate() {
      const params = {
        carTypeProductId: this.detail.carTypeYearProductId,
        residualValue: this.detail.residualValueRate,
        newType: this.detail.newType,
        discount: this.detail.discount,
        profit: this.detail.profit,
        residualValueRate: this.detail.residualValueRate,
        twelveMonthMoney: this.detail.twelveMonthMoney,
        firstPeriodRate: this.detail.firstPeriodRate,
      }

      selectDepositAndMonthPayOfApportionRate(params).then(res => {
        if(res.code === 0) {
          this.detail.apportionFeeRecordList = res.data.respVoList
          this.detail.typeReqVos = res.data.subscribeMoneyRespVos.map((item, index) => {
            if (item.checked) {
              item.checked = true
            } else {
              item.checked = false
            }
            
            return item
          })
          this.detail.deposit = res.data.respVoList[0].deposit
        }
      })
    },

    togglePlanList(index) {
      this.detail.typeReqVos.forEach(item => {
        item.checked = false
      })
      this.detail.typeReqVos[index].checked = true
    },

    handleChange(e, item) {
      item.isChecked = e
      if (!e) {
        item.size = undefined
      }
    },
  },
}
</script>

<style lang="less" scoped>
.title {
  margin-bottom: 20px;
  height: 30px;
  font-family: PingFangSC-Medium;
  font-size: 16px;
  line-height: 30px;
  color: #1D2129;
}

.car-info {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  .info {
    margin-left: 12px;
    .car-product {
      height: 28px;
      font-family: PingFangSC-Medium;
      font-size: 16px;
      line-height: 28px;
      color: rgba(0, 0, 0, 0.9);
    }
    .guidance-price {
      margin-top: 8px;
      height: 22px;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      line-height: 22px;
      color: #4E5969;
    }
  }
}

.apportion-item {
  margin-bottom: 12px;
  padding: 0 16px;
  height: 32px;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #1D2129;
  background: #F2F3F5;
  .split {
    margin: 0 20px;
    width: 1px;
    height: 18px;
    background-color: #A4AEBB;
  }
  .right {
    width: 500px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.plan-list {
  padding: 0 0 20px 40px;
  display: flex;
  .plan {
    margin-right: 30px;
    border-radius: 4px;
    border: 1px solid rgba(10, 15, 45, 0.3);
    width: 200px;
    height: 148px;
    padding: 12px 16px;
    cursor: default;
    .plan-title {
      height: 22px;
      font-family: PingFangSC-Medium;
      font-size: 14px;
      line-height: 22px;
      color: #0A0F2D;
    }
    .plan-item {
      margin-top: 12px;
      display: flex;
      height: 22px;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      line-height: 22px;
      .plan-item-label {
        padding-right: 12px;
        color: rgba(10, 15, 45, 0.5);
      }
      .plan-item-price {
        color: #0A0F2D;
      }
    }
  }
  .checked-plan {
    position: relative;
    border: 3px solid rgba(77, 92, 180, 0.9);
    .plan-checked-img {
      width: 20px;
      height: 20px;
      position: absolute;
      top: -1px;
      right: -1px;
      z-index: 100;
    }
  }
  .plan:last-child {
    margin-right: 0;
  }
}

 .service-item-list {
  padding: 0 0 20px 40px;
  width: 800px;
  display: flex;
  flex-wrap: wrap;
  .service-item {
    margin-right: 100px;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    /deep/ .el-checkbox__label {
      display: flex;
      align-items: center;
    }
  }
  .service-item:nth-child(2n) {
    margin-right: 0
  }
}
</style>