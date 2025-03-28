<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item class="subscription-plan">融资租赁订单</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="content">
      <div>
        <div class="title">{{ type == 1 ? "创建" : "修改" }}订单</div>

        <div class="container">
          <el-steps :active="activeStep" align-center style="width: 600px">
            <el-step
              v-for="(item, index) in stepList"
              :key="index"
              :title="item"
            >
            </el-step>
          </el-steps>

          <div style="margin-top: 40px" v-if="detail">
            <SetRentalCustomerOrderStep1
              v-show="activeStep === 0"
              ref="step1"
              :detail="detail"
              @change="change"
            />

            <SetRentalCustomerOrderStep2
              v-show="activeStep === 1"
              ref="step2"
              :detail="detail"
              @change="change"
            />

            <SetRentalCustomerOrderStep3
              v-show="activeStep === 2"
              ref="step3"
              :detail="detail"
              @change="change"
            />

            <SetRentalCustomerOrderStep4
              v-show="activeStep === 3"
              ref="step4"
              :detail="detail"
              @change="change"
            />
          </div>
        </div>
      </div>

      <div class="buttom-btn-group">
        <div class="btn" @click="back" v-if="activeStep === 0">取消</div>
        <div class="btn" @click="prev" v-else>上一步</div>

        <div class="btn save-btn" @click="save" v-if="activeStep === 3">
          保存
        </div>
        <div class="btn save-btn" @click="next" v-else>下一步</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { setCustomerOrder, getRenterOrderDetail } from '@/api/order/customerOrder'
import SetRentalCustomerOrderStep1 from "./components/SetRentalCustomerOrderStep1.vue";
import SetRentalCustomerOrderStep2 from "./components/SetRentalCustomerOrderStep2.vue";
import SetRentalCustomerOrderStep3 from "./components/SetRentalCustomerOrderStep3.vue";
import SetRentalCustomerOrderStep4 from "./components/SetRentalCustomerOrderStep4.vue";

export default {
  name: "SetRentalCustomerOrder",

  components: {
    SetRentalCustomerOrderStep1,
    SetRentalCustomerOrderStep2,
    SetRentalCustomerOrderStep3,
    SetRentalCustomerOrderStep4,
  },

  data() {
    return {
      type: null,
      orderId: null,
      activeStep: 0,
      stepList: ["客户信息", "车辆信息", "方案信息", "合同信息"],
      detail: null,
    };
  },

  computed: {
    ...mapState(['userInfo']),
  },

  mounted() {
    this.type = this.$route.query.type
    
    if (this.type == 1) {
      const value = localStorage.getItem('customRentalOrderInfo')
      if (value) {
        const customRentalOrderInfo = JSON.parse(value)
        this.detail = {
          ...customRentalOrderInfo,
          carBrandId: '',
          carTypeId: '',
          carTypeYearId: '',
          userCarFinanceLeaseSubscribe: {
            financeLeaseId: customRentalOrderInfo.carFinanceLeaseEntity.id,
            createdBy: this.userInfo.name,
            
            // Step1
            orderType: customRentalOrderInfo.carFinanceLeaseEntity.orderType,
            alternateContactName: '', // 备用联系人姓名
            alternateContactMobile: '', // 备用联系人手机号

            // Step2
            carTypeYearProductId: '', // 车型ID
            guidePrice: '', // 厂商指导价
            companyQuotation: undefined, // 公司报价
            tax: undefined, // 购置税
            insuranceExpenses: customRentalOrderInfo.carFinanceLeaseEntity.insuranceExpenses,  // 保险费用
            decorationExpenses: customRentalOrderInfo.carFinanceLeaseEntity.decorationExpenses, // 装潢费用
            equipmentAmount: 0, // 设备金额
            plateNum: '', // 车牌号
            vimNum: '', // 车架号
            outColor: '', // 外观颜色
            inColor: '', // 内饰颜色
            insureYear: '', // 保险打包年数
            compulsoryInsuranceEndDate: '', // 交强险到期日
            commercialInsuranceEndDate: '', // 商业险到期日

            // Step3
            subscriptionCycle: '', // 订阅周期
            monthsPerPeriod: undefined, // 每期月数
            commission: undefined, // 手续费
            firstMonthMoney: undefined, // 首期月供金额
            otherMonthMoney: undefined, // 未来月供金额
            deposit: undefined, // 押金金额
            downPayment: undefined, // 首付金额
            residualValue: undefined, // 期末残值
            hirePurchaseMoney: undefined, // 留购金额
            annualInterestRate: undefined, // 年利率
            irr: undefined, // IRR

            // Step4
            contractNum: '', // 合同编号
            contractUrlList: [], // 合同附件
          },
        }
      }
    } else {
      this.orderId = this.$route.query.orderId
      this.getOrderDetail()
    }
  },

  methods: {
    getOrderDetail() {
      const data = {
        id: this.orderId
      }

      getRenterOrderDetail(data).then(res => {
        if (res.code === 0) {
          this.detail = {
            ...res.data,
            ...res.data.carTypeYearProduct,
            id: this.orderId
          }
        }
      })
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
        this.$refs.step1.$refs.step1form.validate((valid) => {
          if (valid) {
            ++this.activeStep;
          } else {
            this.$message.error("请检查输入项");
          }
        });
      } else if (this.activeStep === 1) {
        this.$refs.step2.$refs.step2form.validate((valid) => {
          if (valid) {
            ++this.activeStep;
          } else {
            this.$message.error("请检查输入项");
          }
        });
      } else if (this.activeStep === 2) {
        this.$refs.step3.$refs.step3form.validate((valid) => {
          if (valid) {
            ++this.activeStep;
          } else {
            this.$message.error("请检查输入项");
          }
        });
      }
    },

    save() {
      this.$refs.step4.$refs.step4form.validate((valid) => {
        if (valid) {
          setCustomerOrder(this.detail).then(res => {
            if(res.code === 0) {
              this.$message.success('保存成功')
              if (this.type == 1) {
                this.$router.push({
                  path: '/order/customRentalOrder',
                })
              } else {
                this.back()
              }
            } else {
              this.$message.error('保存失败')
            }
          }).catch(err => {
            this.$message.error('保存失败')
          })
        }
      })
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
