<template>
  <div>
    <el-form ref="step3form" :model="detail" label-width="150px">
      <div class="car-info">
        <el-image
          v-if="detail.carType.imageUrl"
          class="car-img"
          :src="detail.carType.imageUrl"
        >
        </el-image>
        {{ detail.carType.carBrand }}·{{ detail.carType.carType }}
        {{ detail.carType.carTypeYear }} {{ detail.carType.carTypeYearProduct }}
      </div>

      <el-form-item label="通用城市" v-if="detail.newType == 1">
        <div>
          <div class="city-tag-list" v-if="detail.citySubscribeReq.length > 1">
            <div
              v-for="city in detail.citySubscribeReq"
              :key="city.cityId"
              class="city-tag city-tag1"
              :class="{
                'active-city-tag': city.cityId == detail.currentCity.cityId,
              }"
              @click="handleChangeCityTag(city)"
            >
              {{
                city.cityId
                  ? city.cityName
                  : `其余${detail.otherCitys.length}个城市`
              }}
              <div
                class="close-tag"
                @click.stop="delCity(city)"
                v-if="city.cityId"
              >
                <i class="el-icon-error"></i>
              </div>
            </div>
          </div>
          <div v-else>全部城市</div>
          <div class="add-city" @click="openCityDialog">添加城市专属方案</div>
        </div>
      </el-form-item>

      <el-form-item
        label="选择上架方案"
        v-if="
          detail.newType == 1 &&
          detail.currentCity.typeReqVos &&
          detail.currentCity.typeReqVos.length
        "
      >
        <div>
          <div class="plan-list">
            <div
              v-for="(item, index) in detail.currentCity.typeReqVos"
              :key="index"
              class="plan"
              :class="{ 'checked-plan': item.checked }"
              @click="togglePlanList(item)"
            >
              <div class="plan-title">{{ item.title }}</div>
              <div class="plan-item">
                <div class="plan-item-label">订阅费用</div>
                <div class="plan-item-price">
                  {{ formatThousandNumber(item.mouthPayment) }} 元/月
                </div>
              </div>
              <div class="plan-item">
                <div class="plan-item-label">期末续订</div>
                <div class="plan-item-price">
                  {{ formatThousandNumber(item.nextMouthPayment) }} 元/月
                </div>
              </div>
              <div class="plan-item">
                <div class="plan-item-label">期末余值</div>
                <div class="plan-item-price">
                  {{ formatThousandNumber(item.buyoutsFee) }} 元/月
                </div>
              </div>
              <div class="plan-item">
                <div class="plan-item-label">分销佣金</div>
                <div class="plan-item-price">
                  {{ formatThousandNumber(item.distributionBrokerage) }} 元
                </div>
              </div>

              <img
                class="plan-checked-img"
                :src="require('@/assets/subscribe/checked.png')"
                v-if="item.checked"
              />
            </div>
          </div>
        </div>
      </el-form-item>

      <el-form-item label="车辆指导价" v-if="detail.newType == 1">
        <div>
          <c-input-number
            :inputValue.sync="detail.tempGuidancePrice"
            placeholder="请输入车辆指导价"
          >
          </c-input-number>
          元
        </div>
      </el-form-item>

      <el-form-item label="车辆购置税" v-if="detail.newType == 1">
        <div>
          {{
            detail.purchaseTax || detail.purchaseTax === 0
              ? `${formatThousandNumber(detail.purchaseTax)}元`
              : "输入厂商折扣后自动计算"
          }}
        </div>
      </el-form-item>

      <el-form-item label="IRR">
        <div>{{ detail.periodRate }}%</div>
      </el-form-item>

      <el-form-item label="首付比例">
        <div>{{ detail.firstPeriodRate }}%</div>
      </el-form-item>

      <el-form-item
        class="el-form-item_required"
        label="厂商折扣"
        v-if="detail.newType == 1"
      >
        <div class="discount-wrap">
          <c-input-number
            :inputValue.sync="detail.currentCity.discount"
            placeholder="请输入厂商折扣"
            :precision="2"
            :min="-100"
            @blur="handleCalculateItemBlur1"
          >
          </c-input-number>
          %

          <div
            class="calc-btn"
            @click="calc"
            v-if="detail.calculatorRule === 1"
          >
            开始测算
          </div>
        </div>
      </el-form-item>

      <template v-if="detail.calculatorRule === 1">
        <el-form-item
          class="el-form-item_required"
          label="车商收购价"
          v-if="detail.newType == 1"
        >
          <div>
            <c-input-number
              :inputValue.sync="detail.currentCity.purchasingPrice"
              placeholder="请输入车商收购价"
            >
            </c-input-number>
            元
          </div>
        </el-form-item>

        <el-form-item
          class="el-form-item_required"
          label="个人成交价"
          v-if="detail.newType == 1"
        >
          <div>
            <c-input-number
              :inputValue.sync="detail.currentCity.transactionPrice"
              placeholder="请输入个人成交价"
            >
            </c-input-number>
            元
          </div>
        </el-form-item>

        <el-form-item
          class="el-form-item_required"
          label="预留利润"
          v-if="detail.newType == 1"
        >
          <div>
            <c-input-number
              :inputValue.sync="detail.currentCity.profit"
              placeholder="请输入预留利润"
              :precision="2"
              @blur="handleCalculateItemBlur"
            >
            </c-input-number>
            %
          </div>
        </el-form-item>
      </template>

      <el-form-item label="首期摊销比例" v-if="detail.calculatorRule === 1">
        <c-input-number
          :inputValue.sync="detail.currentCity.firstPeriodRate"
          placeholder="请输入首期摊销比例"
          :precision="2"
          @blur="handleCalculateItemBlur"
        >
        </c-input-number
        >%
      </el-form-item>

      <el-form-item label="期末余值比例">
        <c-input-number
          :inputValue.sync="detail.currentCity.residualValueRate"
          placeholder="请输入期末余值比例"
          :precision="2"
          @blur="handleCalculateItemBlur"
        >
        </c-input-number
        >%
      </el-form-item>

      <el-form-item label="保险费用">
        <c-input-number
          :inputValue.sync="detail.currentCity.premium"
          placeholder="保险费用"
        >
        </c-input-number
        >元
      </el-form-item>

      <el-form-item label="订阅押金">
        <c-input-number
          :inputValue.sync="detail.currentCity.deposit"
          placeholder="订阅押金"
        >
        </c-input-number
        >元
      </el-form-item>

      <el-form-item
        class="el-form-item_required"
        label="车辆售价"
        v-if="detail.newType == 2"
      >
        <div>
          <c-input-number
            :inputValue.sync="detail.currentCity.ticketPrice"
            placeholder="请输入车辆售价"
            @blur="handleCalculateItemBlur"
          >
          </c-input-number>
        </div>
      </el-form-item>

      <el-form-item
        class="el-form-item_required"
        label="12个月后二手车估价"
        v-if="detail.calculatorRule === 1"
      >
        <div>
          <c-input-number
            :inputValue.sync="detail.currentCity.twelveMonthMoney"
            placeholder="请输入12个月后二手车估价"
            @blur="handleCalculateItemBlur"
          >
          </c-input-number>
        </div>
      </el-form-item>

      <el-form-item label="订阅费用">
        <div>
          <div v-if="detail.calculatorRule === 2">
            <div
              class="apportion-item apportion-item1"
              v-for="(item, index) in detail.currentCity.apportionFeeRecordList"
              :key="index"
            >
              <div style="width: 70px">
                {{ `${index * 6 + 1}` }}-{{ index * 6 + 6 }}期
              </div>
              <div class="split"></div>
              <div class="right">
                <div style="display: flex; align-items: center">
                  订阅费用
                  <c-input-number
                    :inputValue.sync="item.mouthPayment"
                    placeholder="请输入"
                    :inputStyle="{
                      height: '24px',
                      lineHeight: '24px',
                      width: '110px',
                      margin: '0 12px',
                      border: '1px solid rgba(115, 115, 115, 0.8)',
                      borderRadius: '2px',
                    }"
                    @blur="calculate2"
                  >
                  </c-input-number>
                  <!-- <span style="padding: 0 12px" v-else>
                                        {{ item.mouthPayment ? `${formatThousandNumber(item.mouthPayment)}` : '自动计算订阅费用' }}
                                    </span> -->
                  元/月
                </div>
                <!-- <div>期末余值 {{item.buyoutsFee ? `${formatThousandNumber(item.buyoutsFee)}` : '-'}}元</div> -->
                <div>
                  期末余值
                  <c-input-number
                    :inputValue.sync="item.buyoutsFee"
                    placeholder="请输入"
                    :inputStyle="{
                      height: '24px',
                      lineHeight: '24px',
                      width: '110px',
                      margin: '0 12px',
                      border: '1px solid rgba(115, 115, 115, 0.8)',
                      borderRadius: '2px',
                    }"
                    @blur="calculate2"
                  >
                  </c-input-number>
                  元
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <div
              class="apportion-item"
              v-for="(item, index) in detail.currentCity.apportionFeeRecordList"
              :key="index"
            >
              <div style="width: 70px">
                {{
                  `${
                    item.period -
                    detail.currentCity.apportionFeeRecordList.length +
                    1
                  }`
                }}-{{ item.period }}期
              </div>
              <div class="split"></div>
              <div class="right">
                <div style="width: 120px">摊销比例 {{ item.rate }}%</div>
                <div>
                  订阅费用 {{ formatThousandNumber(item.totalPayment) }}元（{{
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
      </el-form-item>

      <!-- <el-form-item label="分销佣金">
                <div>
                    {{ detail.currentCity.distributionBrokerage ? `${formatThousandNumber(detail.currentCity.distributionBrokerage)}元` : '根据订阅费用自动计算' }}
                </div>
            </el-form-item> -->
    </el-form>

    <el-dialog title="选择城市" :visible.sync="showCityDialog" width="480px">
      <div class="city-list">
        <div
          v-for="city in detail.otherCitys"
          :key="city.id"
          class="city"
          :class="{
            'active-city': dialogActiveCity && city.id == dialogActiveCity.id,
          }"
          @click="handleChangeDialogCity(city)"
        >
          {{ city.city }}
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeCityDialog">取 消</el-button>
        <el-button type="primary" @click="handleChooseCity">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  selectDepositAndMonthPayOfApportionRate,
  deleteCityCarSubscribe,
  calculatePurchaseTaxRatio,
  calculate,
  selectDepositAndMonthPayOfApportionRatePlanTwo,
} from "@/api/subscribe/subscribe";
import { formatThousandNumber } from "@/utils/util";
import { defaultApportionFeeRecordList } from "@/utils/constant";

export default {
  props: {
    detail: {
      type: Object,
      required: true,
    },
    operator: {
      type: [Number, String],
      required: true,
    },
  },

  data() {
    return {
      defaultApportionFeeRecordList: defaultApportionFeeRecordList(),
      showCityDialog: false,
      dialogActiveCity: null,
      min: 5,
      max: 30,
    };
  },

  watch: {
    detail: {
      handler(val) {
        this.$emit("change", val);
      },
      immediate: true,
      deep: true,
    },
  },

  mounted() {},

  methods: {
    formatThousandNumber(num) {
      if (num || num == 0) {
        return formatThousandNumber(num);
      }
      return 0;
    },

    openCityDialog() {
      this.showCityDialog = true;
    },

    closeCityDialog() {
      this.showCityDialog = false;
      this.dialogActiveCity = null;
    },

    handleChooseCity() {
      if (!this.dialogActiveCity) {
        this.$message.error("请选择一个城市");
        return;
      }

      const defaultSubscribeReq = JSON.parse(
        JSON.stringify(this.detail.citySubscribeReq[0])
      );

      this.detail.currentCity = {
        ...defaultSubscribeReq,
        id: null,
        cityId: this.dialogActiveCity.id,
        cityName: this.dialogActiveCity.city,
        // discount: undefined,
        // profit: undefined,
        // residualValueRate: undefined,
        firstPeriodRate: 20,
        // deposit: null,
        // distributionBrokerage: null,
        // apportionFeeRecordList: this.detail.calculatorRule === 2 ? this.defaultApportionFeeRecordList : [],
        // typeReqVos: [],
        // purchasingPrice: this.detail.purchasingPrice,
        // transactionPrice: this.detail.transactionPrice,
      };

      this.detail.currentCity.typeReqVos.forEach((item) => {
        item.id = null;
      });

      this.detail.citySubscribeReq.push(this.detail.currentCity);

      this.detail.otherCitys = this.detail.allCitys.filter((item) => {
        const index = this.detail.citySubscribeReq.findIndex(
          (city) => city.cityId === item.id
        );

        return index === -1;
      });

      this.closeCityDialog();
    },

    handleChangeDialogCity(city) {
      this.dialogActiveCity = city;
    },

    handleChangeCityTag(city) {
      this.detail.currentCity = this.detail.citySubscribeReq.filter(
        (item) => item.cityId === city.cityId
      )[0];
    },

    delCity(city) {
      this.$confirm(`确定要删除 ${city.cityName} 专属方案吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        if (city.id) {
          const params = {
            cityId: city.cityId,
            newType: this.detail.newType,
          };

          await deleteCityCarSubscribe(params);
        }

        const index = this.detail.citySubscribeReq.findIndex(
          (item) => item.cityId === city.cityId
        );
        if (index !== -1) {
          this.detail.citySubscribeReq.splice(index, 1);
          if (this.detail.currentCity.cityId === city.cityId) {
            this.detail.currentCity = this.detail.citySubscribeReq[0];
          }
          this.detail.otherCitys.push({
            cityId: city.cityId,
            id: city.cityId,
            city: city.cityName,
          });
        }
      });
    },

    onChange(e) {
      this.detail.currentCity.firstPeriodRate = e;
      this.calculate();
    },

    minus() {
      if (this.detail.currentCity.firstPeriodRate <= this.min) {
        return;
      }
      this.detail.currentCity.firstPeriodRate =
        Math.floor(this.detail.currentCity.firstPeriodRate * 100 - 1) / 100;
      this.calculate();
    },

    plus() {
      if (this.detail.currentCity.firstPeriodRate >= this.max) {
        return;
      }
      this.detail.currentCity.firstPeriodRate =
        Math.ceil(this.detail.currentCity.firstPeriodRate * 100 + 1) / 100;
      this.calculate();
    },

    handleCalculateItemBlur() {
      this.calculate();
    },

    handleCalculateItemBlur1() {
      this.calculatePurchaseTaxRatio();
      this.calculate();
    },

    calculatePurchaseTaxRatio() {
      const params = {
        carTypeProductId: this.detail.carTypeYearProductId,
        nakedCarPrice: this.detail.tempGuidancePrice,
        discount: this.detail.currentCity.discount,
      };

      calculatePurchaseTaxRatio(params).then((res) => {
        if (res.code === 0) {
          this.detail.purchaseTax = res.data;
        }
      });
    },

    calc() {
      if (
        !this.detail.currentCity.discount &&
        this.detail.currentCity.discount !== 0
      ) {
        this.$message.error("请输入厂商折扣");
        return;
      }

      if (!this.detail.currentCity.purchasingPrice) {
        this.$message.error("请输入车商收购价");
        return;
      }

      if (!this.detail.currentCity.transactionPrice) {
        this.$message.error("请输入个人成交价");
        return;
      }

      const params = {
        carTypeYearProductId: this.detail.carTypeYearProductId,
        discount: this.detail.currentCity.discount,
        purchasingPrice: this.detail.currentCity.purchasingPrice,
        transactionPrice: this.detail.currentCity.transactionPrice,
      };

      calculate(params).then((res) => {
        if (res.code === 0) {
          //this.detail.guidancePrice = res.data.guidancePrice
          this.detail.purchaseTax = res.data.purchaseTax;
          this.detail.currentCity.profit = res.data.profit;
          this.detail.currentCity.firstPeriodRate = res.data.firstPeriodRate;
          this.detail.currentCity.residualValueRate =
            res.data.residualValueRate;
          this.detail.currentCity.twelveMonthMoney = res.data.twelveMonthMoney;
          this.detail.currentCity.distributionBrokerage =
            res.data.distributionBrokerage;
          this.calculate();
        } else {
          this.$message.error(res.msg);
        }
      });
    },

    calculate() {
      if (this.detail.calculatorRule === 1) {
        this.calculate1();
      }
    },

    calculate2() {
      if (
        !(
          this.detail.currentCity.apportionFeeRecordList[0].mouthPayment &&
          this.detail.currentCity.apportionFeeRecordList[1].mouthPayment &&
          this.detail.currentCity.apportionFeeRecordList[2].mouthPayment &&
          this.detail.currentCity.apportionFeeRecordList[3].mouthPayment &&
          this.detail.currentCity.apportionFeeRecordList[4].mouthPayment &&
          this.detail.currentCity.apportionFeeRecordList[5].mouthPayment &&
          this.detail.currentCity.apportionFeeRecordList[0].buyoutsFee &&
          this.detail.currentCity.apportionFeeRecordList[1].buyoutsFee &&
          this.detail.currentCity.apportionFeeRecordList[2].buyoutsFee &&
          this.detail.currentCity.apportionFeeRecordList[3].buyoutsFee &&
          this.detail.currentCity.apportionFeeRecordList[4].buyoutsFee &&
          this.detail.currentCity.apportionFeeRecordList[5].buyoutsFee
        )
      ) {
        return;
      }
      // 12个输入框数字
      const params = {
        carTypeYearProductId: this.detail.carTypeYearProductId,
        residualValue: this.detail.residualValueRate,
        discount: this.detail.currentCity.discount,
        profit: this.detail.currentCity.profit,
        residualValueRate: this.detail.currentCity.residualValueRate,
        firstPeriodRate: this.detail.firstPeriodRate,
        ticketPrice: this.detail.currentCity.ticketPrice,
        purchaseTax: this.detail.purchaseTax,
        irr: this.detail.periodRate,
        firstCost:
          this.detail.currentCity.apportionFeeRecordList[0].mouthPayment,
        secondCost:
          this.detail.currentCity.apportionFeeRecordList[1].mouthPayment,
        otherCost:
          this.detail.currentCity.apportionFeeRecordList[2].mouthPayment,
        fourCost:
          this.detail.currentCity.apportionFeeRecordList[3].mouthPayment,
        fiveCost:
          this.detail.currentCity.apportionFeeRecordList[4].mouthPayment,
        sixCost: this.detail.currentCity.apportionFeeRecordList[5].mouthPayment,
        firstBuyoutsFee:
          this.detail.currentCity.apportionFeeRecordList[0].buyoutsFee,
        secondBuyoutsFee:
          this.detail.currentCity.apportionFeeRecordList[1].buyoutsFee,
        otherBuyoutsFee:
          this.detail.currentCity.apportionFeeRecordList[2].buyoutsFee,
        fourBuyoutsFee:
          this.detail.currentCity.apportionFeeRecordList[3].buyoutsFee,
        fiveBuyoutsFee:
          this.detail.currentCity.apportionFeeRecordList[4].buyoutsFee,
        sixBuyoutsFee:
          this.detail.currentCity.apportionFeeRecordList[5].buyoutsFee,
      };

      selectDepositAndMonthPayOfApportionRatePlanTwo(params).then((res) => {
        if (res.code === 0) {
          this.detail.currentCity.apportionFeeRecordList =
            this.detail.currentCity.apportionFeeRecordList.map(
              (item, index) => {
                const result = {
                  ...item,
                  ...res.data.respVoList[index],
                };

                return result;
              }
            );

          this.detail.currentCity.typeReqVos =
            res.data.subscribeMoneyRespVos.map((item, index) => {
              item.checked = false;
              if (
                this.detail.currentCity.typeReqVos[index] &&
                this.detail.currentCity.typeReqVos[index].checked
              ) {
                item.checked =
                  this.detail.currentCity.typeReqVos[index].checked;
              }
              if (
                this.detail.currentCity.typeReqVos[index] &&
                this.detail.currentCity.typeReqVos[index].id
              ) {
                item.id = this.detail.currentCity.typeReqVos[index].id;
              }
              return item;
            });

          if (this.detail.newType == 2) {
            this.detail.currentCity.typeReqVos[2].checked = true;
          }
        }
      });
    },

    calculate1() {
      const params = {
        carTypeProductId: this.detail.carTypeYearProductId,
        residualValue: this.detail.residualValueRate,
        financeSchemeId: this.detail.financeSchemeId,
        newType: this.detail.newType,
        discount: this.detail.currentCity.discount,
        profit: this.detail.currentCity.profit,
        residualValueRate: this.detail.currentCity.residualValueRate,
        twelveMonthMoney: this.detail.currentCity.twelveMonthMoney,
        firstPeriodRate: this.detail.currentCity.firstPeriodRate,
        ticketPrice: this.detail.currentCity.ticketPrice,
      };

      selectDepositAndMonthPayOfApportionRate(params).then((res) => {
        if (res.code === 0) {
          this.detail.currentCity.apportionFeeRecordList = res.data.respVoList;
          this.detail.currentCity.typeReqVos =
            res.data.subscribeMoneyRespVos.map((item, index) => {
              item.checked = false;
              if (
                this.detail.currentCity.typeReqVos[index] &&
                this.detail.currentCity.typeReqVos[index].checked
              ) {
                item.checked =
                  this.detail.currentCity.typeReqVos[index].checked;
              }
              if (
                this.detail.currentCity.typeReqVos[index] &&
                this.detail.currentCity.typeReqVos[index].id
              ) {
                item.id = this.detail.currentCity.typeReqVos[index].id;
              }
              return item;
            });
          this.detail.currentCity.distributionBrokerage =
            res.data.respVoList[0].mouthPayment;

          if (this.detail.newType == 2) {
            this.detail.currentCity.typeReqVos[2].checked = true;
          }
        }
      });
    },

    togglePlanList(item) {
      item.checked = !item.checked;
      if (this.operator == 2 && item.id) {
        const index = this.detail.deleteIds.indexOf(item.id);
        if (item.checked) {
          if (index !== -1) {
            this.detail.deleteIds.splice(index, 1);
          }
        } else {
          if (index === -1) {
            this.detail.deleteIds.push(item.id);
          }
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
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

.add-city {
  margin-top: 7px;
  height: 22px;
  font-family: PingFangSC-Medium;
  font-size: 14px;
  line-height: 22px;
  color: #3446aa;
  cursor: pointer;
}

.city-list {
  display: flex;
  flex-wrap: wrap;
  .city {
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
  .active-city {
    border: 1px solid #3446aa;
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
  .city-tag1 {
    padding-right: 0;
  }
}

.plan-list {
  display: flex;
  .plan {
    margin-right: 30px;
    border-radius: 4px;
    border: 1px solid rgba(10, 15, 45, 0.3);
    width: 200px;
    padding: 12px 16px;
    cursor: default;
    .plan-title {
      height: 22px;
      font-family: PingFangSC-Medium;
      font-size: 14px;
      line-height: 22px;
      color: #0a0f2d;
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
        color: #0a0f2d;
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

.subscript {
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  .subscript-icon {
    font-size: 18px;
  }
  .el-slider {
    margin: 0 10px;
    width: 200px;
    /deep/ .el-slider__button {
      border-color: #fff;
      background: #0a0f2d;
    }
    /deep/ .el-slider__bar {
      background: #0a0f2d;
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

.discount-wrap {
  display: flex;
  align-items: center;
  .calc-btn {
    margin-left: 12px;
    width: 107px;
    height: 40px;
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #3446aa;
    color: #ffffff;
    font-size: 14px;
    cursor: pointer;
  }
}
</style>
