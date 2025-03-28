<template>
  <div>
      <el-breadcrumb separator="/">
          <el-breadcrumb-item>产品管理</el-breadcrumb-item>
          <el-breadcrumb-item class="subscription-plan">订阅产品定价测算</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="content">
          <div class="title">订阅产品定价测算</div>
          <div class="main">
            <el-form ref="form" :model="form" :rules="rules" label-width="150px">
              <el-form-item label="选择车型" prop="carTypeYearProductId">
                <c-select
                  :selectValue.sync="form.carBrandId"
                  :options="brandList"
                  :showAllValue="false"
                  placeholder="选择品牌"
                  style="margin-right: 10px"
                  labelKey="brandName"
                  valueKey="id"
                  @change="changeCarBrand"
                />
                <c-select
                  :selectValue.sync="form.carTypeId"
                  :options="typeList"
                  :showAllValue="false"
                  placeholder="选择车系"
                  style="margin-right: 10px"
                  labelKey="carType"
                  valueKey="id"
                  @change="changeCarType"
                />
                <c-select
                  :selectValue.sync="form.carTypeYearId"
                  :options="yearList"
                  :showAllValue="false"
                  placeholder="选择年款"
                  style="margin-right: 10px"
                  labelKey="year"
                  valueKey="id"
                  @change="changeCarTypeYear"
                />
                <c-select
                  :selectValue.sync="form.carTypeYearProductId"
                  :options="productList"
                  :showAllValue="false"
                  placeholder="选择型号"
                  :selectStyle="{
                    width: '198px',
                  }"
                  labelKey="carTypeYearProduct"
                  valueKey="id"
                  @change="changeCarProduct"
                />
              </el-form-item>

              <el-form-item label="车辆指导价">
                {{ form.guidancePrice ? `${formatThousandNumber(form.guidancePrice)}元` : '-' }}
              </el-form-item>

              <el-form-item label="车辆购置税">
                <div>
                  {{ form.purchaseTax || form.purchaseTax === 0 ? `${formatThousandNumber(form.purchaseTax)}元` : '-' }}
                </div>
              </el-form-item>

              <el-form-item label="厂商折扣" prop="discount">
                <div>
                    <c-input-number 
                      :inputValue.sync="form.discount"
                      placeholder="请输入厂商折扣"
                      :precision="2"
                      :min="-100"
                    >
                    </c-input-number> %
                </div>
              </el-form-item>

              <el-form-item label="车商收购价" prop="purchasingPrice">
                <div>
                    <c-input-number 
                      :inputValue.sync="form.purchasingPrice"
                      placeholder="请输入车商收购价"
                    >
                    </c-input-number> 元
                </div>
              </el-form-item>

              <el-form-item label="个人成交价" prop="transactionPrice">
                <div>
                    <c-input-number 
                      :inputValue.sync="form.transactionPrice"
                      placeholder="请输入个人成交价"
                    >
                    </c-input-number> 元
                </div>
              </el-form-item>

              <template v-if="calcInfo">
                <el-form-item label="预留利润">
                  <div>
                      <c-input-number 
                        :inputValue.sync="form.profit"
                        placeholder="请输入预留利润"
                        :precision="2"
                      >
                      </c-input-number> %
                  </div>
                </el-form-item>

                <el-form-item label="首期摊销比例">
                  <div>
                      <c-input-number 
                        :inputValue.sync="form.firstPeriodRate"
                        placeholder="请输入首期摊销比例"
                        :precision="2"
                      >
                      </c-input-number> %
                  </div>
                </el-form-item>

                <el-form-item label="期末余值比例">
                  <div>
                      <c-input-number 
                        :inputValue.sync="form.residualValueRate"
                        placeholder="请输入期末余值比例"
                        :precision="2"
                      >
                      </c-input-number> %
                  </div>
                </el-form-item>

                <el-form-item label="12个月后二手车估价">
                  <div>
                      <c-input-number 
                        :inputValue.sync="form.twelveMonthMoney"
                        placeholder="请输入12个月后二手车估价"
                      >
                      </c-input-number> 元
                  </div>
                </el-form-item>

                <el-form-item v-if="apportionFeeRecordList.length">
                  <div v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.8)">
                      <div class="record-row">
                        <div class="record-col">订阅周期</div>
                        <div class="record-col">月租金</div>
                        <div class="record-col">订阅费用</div>
                        <div class="record-col">期末留购</div>
                        <div class="record-col">购车总花费</div>
                      </div>

                      <div class="record-row" v-for="(item, index) in apportionFeeRecordList" :key="index">
                        <div class="record-col">{{`${item.period-apportionFeeRecordList.length+1}`}}-{{item.period}}期</div>
                        <div class="record-col">{{ formatThousandNumber(item.mouthPayment) }} 元/月</div>
                        <div class="record-col">{{ formatThousandNumber(item.totalPayment) }} 元</div>
                        <div class="record-col">{{ formatThousandNumber(item.buyoutsFee) }} 元</div>
                        <div class="record-col">{{ formatThousandNumber(item.totalPaymentAll) }} 元</div>
                      </div>
                  </div>
                </el-form-item>

                <el-form-item label="车辆押金">
                  <div>
                    {{ !calcInfo || loading ? tip : `${formatThousandNumber(form.deposit)}元` }}
                  </div>
                </el-form-item>

                <el-form-item label="分销佣金">
                  <div>
                    {{ !calcInfo || loading ? tip : `${formatThousandNumber(form.distributionBrokerage)}元` }}
                  </div>
                </el-form-item>
              </template>
              

            </el-form>

            <div class="btn-group">
              <back-button />
              <div class="calc-btn" @click="calc">{{ calcInfo ? '重新测算' : '开始测算' }}</div>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
import {
  getCarBrand,
  getCarType,
  getCarTypeYear,
  listByCarTypeYearId,
} from "@/api/car/car"
import { calculate } from '@/api/subscribe/subscribe'
import { formatThousandNumber } from "@/utils/util"

export default {
  name: 'calcProductPrice',

  components: {
    
  },

  data() {
    return {
      loading: false,
      calcInfo: null,
      tip: '计算中...',
      form: {
        carBrandId: null,
        carTypeId: null,
        carTypeYearId: null,
        carTypeYearProductId: null, // 车型ID
        guidancePrice: null, // 车辆指导价
        purchaseTax: null, // 购置税
        discount: undefined, // 厂商折扣
        profit: undefined, // 预留利润
        firstPeriodRate: undefined, // 首期摊销比例
        residualValueRate: undefined, // 期末余值比例
        purchasingPrice: undefined, // 车商收购价
        transactionPrice: undefined, // 个人成交价
        twelveMonthMoney: undefined, // 12个月后二手车估价
        deposit: undefined, // 车辆押金
        distributionBrokerage: undefined, // 分销佣金
      },
      rules: {
        carTypeYearProductId: [
          { required: true, message: "请选择车型", trigger: "change" },
        ],
        discount: [
          { required: true, message: "请输入厂商折扣", trigger: "blur" },
        ],
        purchasingPrice: [
          { required: true, message: "请输入车商收购价", trigger: "blur" },
        ],
        transactionPrice: [
          { required: true, message: "请输入个人成交价", trigger: "blur" },
        ],
      },
      brandList: [],
      typeList: [],
      yearList: [],
      productList: [],
      apportionFeeRecordList: [],
    }
  },

  mounted() {
    this.getCarBrand()
  },

  methods: {
    getCarBrand() {
      getCarBrand().then((res) => {
        if (res.code === 0) {
          this.brandList = res.data
          if (this.form.carBrandId) {
            this.getCarType()
          }
        }
      });
    },

    changeCarBrand(e) {
      this.form.carBrandId = e;
      this.form.carTypeId = "";
      this.typeList = [];
      this.form.carTypeYearId = "";
      this.yearList = [];
      this.form.carTypeYearProductId = "";
      this.productList = [];
      this.getCarType();
    },

    getCarType() {
      const data = {
        carBrandId: this.form.carBrandId,
      };

      getCarType(data).then((res) => {
        if (res.code === 0) {
          this.typeList = res.data;
          if (this.form.carTypeId) {
            this.getCarTypeYear();
          }
        }
      });
    },

    changeCarType(e) {
      this.form.carTypeId = e;
      this.form.carTypeYearId = "";
      this.yearList = [];
      this.form.carTypeYearProductId = "";
      this.productList = [];
      this.getCarTypeYear();
    },

    getCarTypeYear() {
      const data = {
        carTypeId: this.form.carTypeId,
      };

      getCarTypeYear(data).then((res) => {
        if (res.code === 0) {
          this.yearList = res.data;
          if (this.form.carTypeYearId) {
            this.listByCarTypeYearId();
          }
        }
      });
    },

    changeCarTypeYear(e) {
      this.form.carTypeYearId = e;
      this.form.carTypeYearProductId = "";
      this.productList = [];
      this.listByCarTypeYearId();
    },

    listByCarTypeYearId() {
      const data = {
        carTypeYearId: this.form.carTypeYearId,
      };

      listByCarTypeYearId(data).then((res) => {
        if (res.code === 0) {
          this.productList = res.data;
        }
      });
    },

    changeCarProduct(e) {
      this.form.carTypeYearProductId = e;
      const carProduct = this.productList.find((item) => item.id === e)
      if (carProduct) {
        this.form.guidancePrice = carProduct.guidancePrice
        this.form.purchasingPrice = carProduct.purchasingPrice || undefined
        this.form.transactionPrice = carProduct.transactionPrice || undefined
        this.reset()
      }
    },

    reset() {
      this.calcInfo = null
      this.form.purchaseTax = null // 购置税
      this.form.discount = undefined // 厂商折扣
      this.form.profit = undefined // 预留利润
      this.form.firstPeriodRate = undefined // 首期摊销比例
      this.form.residualValueRate = undefined // 期末余值比例
      this.form.twelveMonthMoney = undefined // 12个月后二手车估价
      this.form.deposit = undefined // 车辆押金
      this.form.distributionBrokerage = undefined // 分销佣金
    },

    formatThousandNumber(num) {
      if (num || num == 0) {
        return formatThousandNumber(num)
      }
      return 0
    },

    calc() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.loading = true
          const params = {
            carTypeYearProductId: this.form.carTypeYearProductId,
            guidancePrice: this.form.guidancePrice,
            discount: this.form.discount,
            profit: this.form.profit,
            firstPeriodRate: this.form.firstPeriodRate,
            residualValueRate: this.form.residualValueRate,
            twelveMonthMoney: this.form.twelveMonthMoney,
            purchasingPrice: this.form.purchasingPrice,
            transactionPrice: this.form.transactionPrice,
          }

          await calculate(params).then(res => {
            if (res.code === 0) {
              this.calcInfo = res.data
              //this.form.guidancePrice = res.data.guidancePrice
              this.form.purchaseTax = res.data.purchaseTax
              this.form.profit = res.data.profit
              this.form.firstPeriodRate = res.data.firstPeriodRate
              this.form.residualValueRate = res.data.residualValueRate
              this.form.twelveMonthMoney = res.data.twelveMonthMoney
              this.form.deposit = res.data.deposit
              this.form.distributionBrokerage = res.data.distributionBrokerage
              this.apportionFeeRecordList = res.data.respVoList
            } else {
              this.$message.error(res.msg)
            }
          })

          this.loading = false
        }
      })
    }
  },
}
</script>

<style lang="less" scoped>
.content {
  display: flex;
  flex-direction: column;
  .title {
    margin-bottom: 22px;
    height: 28px;
    font-family: PingFangSC-Medium;
    font-size: 20px;
    line-height: 28px;
    color: #1D2129;
  }
  .main {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    .record-row {
      margin-bottom: 12px;
      padding: 5px 8px;
      width: 600px;
      border-radius: 2px;
      background: #F2F3F5;
      color: #1D2129;
      font-size: 14px;
      display: flex;
      .record-col {
        flex: 1;
        height: 22px;
        line-height: 22px;
        text-align: center;
        border-right: 1px solid #A4AEBB;
        &:last-child {
          border-right: none;
        }
      }
    }
    .btn-group {
      margin-top: 40px;
      display: flex;
      .calc-btn {
        margin-left: 12px;
        width: 107px;
        height: 40px;
        border-radius: 2px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #3446AA;
        color: #FFFFFF;
        font-size: 14px;
        cursor: pointer;
      }
    }
  }
}
</style>