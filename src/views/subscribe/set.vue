<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>订阅方案</el-breadcrumb-item>
      <el-breadcrumb-item class="subscription-plan"
        >{{ operator == 1 ? "创建" : "修改" }}方案</el-breadcrumb-item
      >
    </el-breadcrumb>

    <div class="content" v-loading="syncLoading" element-loading-text="保存中">
      <div>
        <div class="title">{{ operator == 1 ? "创建" : "修改" }}方案</div>

        <div class="container">
          <el-steps :active="activeStep" align-center style="width: 500px">
            <el-step
              v-for="(item, index) in stepList"
              :key="index"
              :title="item"
            >
            </el-step>
          </el-steps>

          <div style="margin-top: 40px">
            <Step1
              v-if="detail"
              v-show="activeStep === 0"
              ref="step1"
              :detail="detail"
              :type="type"
              @change="change"
              @next="next"
            />

            <NewCarStep2
              v-if="type == 1 && detail"
              v-show="activeStep === 1"
              ref="step2"
              :detail="detail"
              @change="change"
            />

            <OldCarStep2
              v-if="type == 2 && detail"
              v-show="activeStep === 1"
              ref="step2"
              :detail="detail"
              @change="change"
              @next="next"
            />

            <Step3
              v-if="detail"
              v-show="activeStep === 2"
              ref="step3"
              :detail="detail"
              :operator="operator"
              @change="change"
            />

            <Step4
              v-if="detail"
              v-show="activeStep === 3"
              ref="step3"
              :detail="detail"
              @change="change"
            />
          </div>
        </div>
      </div>

      <div class="buttom-btn-group">
        <back-button text="退出" :buttonStyle="{ 'margin-right': '40px' }" />
        <div class="btn" @click="prev" v-if="activeStep !== 0">上一步</div>

        <div class="btn save-btn" @click="save" v-if="activeStep === 3">
          确认
        </div>
        <div
          class="btn save-btn"
          @click="next"
          v-else-if="(type == 1 && activeStep === 1) || activeStep === 2"
        >
          下一步
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  selectNewCarSubscribeDetail,
  selectCarSubscribeDetail,
  calculatePurchaseTaxRatio,
  getAllCity,
  insertCarSubscribe,
} from "@/api/subscribe/subscribe";
import { SERVICE_LIST } from "@/utils/constant";
import Step1 from "./components/Step1.vue";
import NewCarStep2 from "./components/NewCarStep2.vue";
import OldCarStep2 from "./components/OldCarStep2.vue";
import Step3 from "./components/Step3.vue";
import Step4 from "./components/Step4.vue";

const defaultDetail = () => ({
  newType: null,
  // step1
  templateId: null,
  templateName: "",
  financeSchemeId: null,
  financeCompanyId: null,
  financeSchemeName: "",
  residualValueRate: null,
  productSchemeName: "",
  monthTotal: null,
  finalStr: "",
  periodRate: "",
  firstPeriodRate: "",
  calculatorRule: "",
  // step2
  carType: {
    carBrand: "",
    carType: "",
    carTypeYear: "",
    carTypeYearProduct: "",
    imageUrl: "",
  },
  carBrandId: "",
  carTypeId: "",
  carTypeYearId: "",
  carTypeYearProductId: "",
  colors: [],
  /*
        {
            detailName: "",
            money: undefined,
            hasCheck: 1
        }
    */
  otherConfigs: [
    {
      function: "",
      details: [],
    },
  ],
  guidancePrice: null,
  tempGuidancePrice: null,
  purchasingPrice: undefined,
  transactionPrice: undefined,
  secondHandCarId: null,
  // step3
  purchaseTax: null,
  allCitys: [],
  otherCitys: [],
  citySubscribeReq: [
    {
      carSubscribeId: null,
      cityId: 0,
      cityName: "",
      discount: undefined,
      profit: undefined,
      residualValueRate: undefined,
      premium: undefined,
      purchasingPrice: undefined,
      transactionPrice: undefined,
      twelveMonthMoney: undefined,
      ticketPrice: undefined,
      deposit: undefined,
      distributionBrokerage: null,
      firstPeriodRate: 20,
      apportionFeeRecordList: [],
      typeReqVos: [],
    },
  ],
  currentCity: {},
  // step4
  SERVICE_LIST,
  carSubscribeFreeServiceList: [],
  safeguardServices: [],
  checkList: [],
});

export default {
  name: "setSubscribe",

  components: {
    Step1,
    NewCarStep2,
    OldCarStep2,
    Step3,
    Step4,
  },

  data() {
    return {
      type: null,
      operator: null,
      subscribeId: null,
      carTypeYearProductId: null,
      activeStep: 0,
      stepList: ["选择模板", "选择车型", "设置方案", "设置其他"],
      detail: null,
      syncLoading: false,
      allCitys: [],
    };
  },

  mounted() {
    const detail = defaultDetail();
    this.type = this.$route.query.type;
    this.operator = this.$route.query.operator;
    this.subscribeId = this.$route.query.subscribeId;
    this.carTypeYearProductId = this.$route.query.carTypeYearProductId;

    this.getAllCity();

    if (this.operator == 1) {
      this.detail = {
        ...detail,
        newType: this.type,
        currentCity: detail.citySubscribeReq[0],
      };
    }
  },

  methods: {
    getAllCity() {
      getAllCity().then((res) => {
        if (res.code === 0) {
          this.allCitys = res.data;
          if (this.operator == 1) {
            this.detail.allCitys = res.data;
            this.detail.otherCitys = res.data;
          } else {
            if (this.type == 1) {
              this.selectNewCarSubscribeDetail();
            } else {
              this.selectCarSubscribeDetail();
            }
          }
        }
      });
    },

    selectNewCarSubscribeDetail() {
      const data = {
        carTypeYearProductId: this.carTypeYearProductId,
      };

      selectNewCarSubscribeDetail(data).then((res) => {
        if (res.code === 0) {
          const firstPeriodRate = res.data[0].firstPeriodRate;
          res.data = res.data.map((city) => {
            city = {
              ...city,
              ...city.detailList[0],
              firstPeriodRate:
                city.detailList[0].apportionFeeRecordList[0].rate,
            };

            const checkedPlanIds = {};
            const checkedPlanIndexs = [];
            city.detailList = city.detailList.map((item) => {
              item.carSubscribeId = item.id;

              if (item.monthTotal === 12 && item.paymentType === 0) {
                checkedPlanIndexs.push(0);
                checkedPlanIds[0] = item.id;
              } else if (item.monthTotal === 6 && item.paymentType === 4) {
                checkedPlanIndexs.push(1);
                checkedPlanIds[1] = item.id;
              } else {
                checkedPlanIndexs.push(2);
                checkedPlanIds[2] = item.id;
              }

              return item;
            });

            city.checkedPlanIds = checkedPlanIds;

            city.typeReqVos = city.subscribeMoneyRespVos.map((item1, index) => {
              item1.checked = false;

              if (checkedPlanIndexs.includes(index)) {
                item1.checked = true;
                item1.id = checkedPlanIds[index];
              }

              return item1;
            });

            return city;
          });

          const checkList = [];

          const service = SERVICE_LIST.map((item) => {
            const findItem =
              res.data[0].detailList[0].carSubscribeFreeServiceList.find(
                (item1) => item1.serviceName === item.serviceName
              );

            if (findItem) {
              item.isChecked = true;
              item.size = findItem.size;
              checkList.push(findItem.serviceName);
            }

            return item;
          });

          this.detail = {
            ...res.data[0].detailList[0],
            citySubscribeReq: [...res.data],
            currentCity: res.data[0],
            allCitys: this.allCitys,
            SERVICE_LIST: service,
            carBrandId: res.data[0].detailList[0].carType.carBrandId,
            carTypeId: res.data[0].detailList[0].carType.carTypeId,
            carTypeYearId: res.data[0].detailList[0].carType.carTypeYearId,
            carTypeYearProductId: res.data[0].detailList[0].carType.id,
            colors: res.data[0].detailList[0].colorConfigDtos,
            checkList,
            deleteIds: [],
            periodRate: res.data[0].periodRate,
            firstPeriodRate,
            calculatorRule: res.data[0].calculatorRule,
            guidancePrice: res.data[0].detailList[0].carType.guidancePrice,
            tempGuidancePrice: res.data[0].detailList[0].carType.guidancePrice,
          };

          this.detail.otherCitys = this.detail.allCitys.filter((item) => {
            const index = this.detail.citySubscribeReq.findIndex(
              (city) => city.cityId === item.id
            );

            return index === -1;
          });

          this.activeStep = 2;
        }
      });
    },

    selectCarSubscribeDetail() {
      const data = {
        id: this.subscribeId,
      };

      selectCarSubscribeDetail(data).then((res) => {
        if (res.code === 0) {
          res.data = res.data.map((city) => {
            city = {
              ...city,
              ...city.detailList[0],
              firstPeriodRate:
                city.detailList[0].apportionFeeRecordList[0].rate,
              ticketPrice: city.detailList[0].nakedCarPrice,
              secondHandCarId: city.detailList[0].secondCarId,
            };

            const checkedPlanIds = {};
            const checkedPlanIndexs = [];
            city.detailList = city.detailList.map((item) => {
              item.carSubscribeId = item.id;

              if (item.monthTotal === 12 && item.paymentType === 0) {
                checkedPlanIndexs.push(0);
                checkedPlanIds[0] = item.id;
              } else if (item.monthTotal === 6 && item.paymentType === 4) {
                checkedPlanIndexs.push(1);
                checkedPlanIds[1] = item.id;
              } else {
                checkedPlanIndexs.push(2);
                checkedPlanIds[2] = item.id;
              }

              return item;
            });

            city.checkedPlanIds = checkedPlanIds;

            city.typeReqVos = city.subscribeMoneyRespVos.map((item1, index) => {
              item1.checked = false;

              if (checkedPlanIndexs.includes(index)) {
                item1.checked = true;
                item1.id = checkedPlanIds[index];
              }

              return item1;
            });

            return city;
          });

          const checkList = [];

          const service = SERVICE_LIST.map((item) => {
            const findItem =
              res.data[0].detailList[0].carSubscribeFreeServiceList.find(
                (item1) => item1.serviceName === item.serviceName
              );

            if (findItem) {
              item.isChecked = true;
              item.size = findItem.size;
              checkList.push(findItem.serviceName);
            }

            return item;
          });

          this.detail = {
            ...res.data[0].detailList[0],
            citySubscribeReq: [...res.data],
            currentCity: res.data[0],
            secondHandCarId: res.data[0].detailList[0].secondCarId,
            allCitys: this.allCitys,
            SERVICE_LIST: service,
            colors: res.data[0].detailList[0].colorConfigDtos,
            checkList,
            deleteIds: [],
            periodRate: res.data[0].periodRate,
            firstPeriodRate: res.data[0].firstPeriodRate,
            calculatorRule: res.data[0].calculatorRule,
          };

          this.detail.otherCitys = this.detail.allCitys.filter((item) => {
            const index = this.detail.citySubscribeReq.findIndex(
              (city) => city.cityId === item.id
            );

            return index === -1;
          });

          this.activeStep = 2;
        }
      });
    },

    back() {
      this.$router.back();
    },

    change(data) {
      this.detail = data;
    },

    prev() {
      --this.activeStep;
    },

    next() {
      if (this.activeStep === 0) {
        ++this.activeStep;
      } else if (this.activeStep === 1) {
        if (this.type == 1) {
          this.$refs.step2.$refs.step2form.validate((valid) => {
            if (valid) {
              // this.detail.otherConfigs[0].details = this.detail.otherConfigs[0].details.filter(item => {
              //     return item.detailName.trim() || item.money || item.money == 0
              // })

              // for(const item of this.detail.otherConfigs[0].details) {
              //     if(!item.detailName.trim()) {
              //         this.$message.error('请输入增配项')
              //         return
              //     }

              //     if(!item.money && item.money != 0) {
              //         this.$message.error('请输入金额')
              //         return
              //     }
              // }

              ++this.activeStep;
            }
          });
        } else {
          ++this.activeStep;
        }
      } else if (this.activeStep === 2) {
        if (this.type == 1) {
          for (const item of this.detail.citySubscribeReq) {
            if (!item.discount && item.discount != 0) {
              if (item.cityId) {
                this.$message.error(`请设置 ${item.cityName} 的厂商折扣`);
              } else {
                this.$message.error(`请设置 通用城市 的厂商折扣`);
              }

              return;
            }

            if (this.detail.calculatorRule === 1) {
              if (!item.profit && item.profit != 0) {
                if (item.cityId) {
                  this.$message.error(`请设置 ${item.cityName} 的预留利润`);
                } else {
                  this.$message.error(`请设置 通用城市 的预留利润`);
                }

                return;
              }

              if (!item.residualValueRate && item.residualValueRate != 0) {
                if (item.cityId) {
                  this.$message.error(`请设置 ${item.cityName} 的期末余值比例`);
                } else {
                  this.$message.error(`请设置 通用城市 的期末余值比例`);
                }

                return;
              }

              if (!item.firstPeriodRate && item.firstPeriodRate != 0) {
                if (item.cityId) {
                  this.$message.error(`请设置 ${item.cityName} 的首期摊销比例`);
                } else {
                  this.$message.error(`请设置 通用城市 的首期摊销比例`);
                }

                return;
              }

              if (!item.twelveMonthMoney && item.twelveMonthMoney != 0) {
                if (item.cityId) {
                  this.$message.error(
                    `请设置 ${item.cityName} 的12个月后二手车估价`
                  );
                } else {
                  this.$message.error(`请设置 通用城市 的12个月后二手车估价`);
                }

                return;
              }
            }

            const typeReqVos = item.typeReqVos.filter((item) => item.checked);

            if (typeReqVos.length === 0) {
              if (item.cityId) {
                this.$message.error(`请选择 ${item.cityName} 的上架方案`);
              } else {
                this.$message.error(`请选择 通用城市 的上架方案`);
              }

              return;
            }
          }
        } else {
          if (!this.detail.currentCity.residualValueRate) {
            this.$message.error("请输入期末余值比例");

            return;
          }

          if (!this.detail.currentCity.firstPeriodRate) {
            this.$message.error("请输入首期摊销比例");

            return;
          }

          if (!this.detail.currentCity.ticketPrice) {
            this.$message.error("请输入车辆售价");

            return;
          }

          if (
            !this.detail.currentCity.twelveMonthMoney &&
            this.detail.currentCity.twelveMonthMoney != 0
          ) {
            this.$message.error(`请设置12个月后二手车估价`);

            return;
          }
        }

        ++this.activeStep;
      }
    },

    save() {
      this.detail.carSubscribeFreeServiceList = this.detail.SERVICE_LIST.filter(
        (item) => item.isChecked
      );

      for (const item of this.detail.carSubscribeFreeServiceList) {
        if (item.requireInputCount && !item.size) {
          this.$message.error("请输入次数");

          return;
        }
      }

      for (const item of this.detail.citySubscribeReq) {
        item.typeReqVos = item.typeReqVos.filter((item) => item.checked);
      }

      this.detail.productSchemeName = `${this.detail.carType.carBrand}${this.detail.carType.carType}方案`;

      if (this.detail.tempGuidancePrice) {
        this.detail.guidancePrice = this.detail.tempGuidancePrice;
      }

      insertCarSubscribe(this.detail)
        .then((res) => {
          if (res.code === 0) {
            this.$message.success("保存成功");
            this.back();
          } else {
            this.$message.error("保存失败");
          }
        })
        .catch((err) => {
          this.$message.error("保存失败");
        });
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .title {
    margin-bottom: 32px;
    height: 22px;
    font-family: PingFangSC-Regular;
    font-size: 20px;
    line-height: 22px;
    color: rgba(0, 0, 0, 0.9);
  }
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
