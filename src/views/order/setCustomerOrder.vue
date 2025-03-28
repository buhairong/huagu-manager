<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item class="subscription-plan"
        >个性化订单</el-breadcrumb-item
      >
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
            <SetCustomerOrderStep1
              v-show="activeStep === 0"
              ref="step1"
              :detail="detail"
              @change="change"
            />

            <SetCustomerOrderStep2
              v-show="activeStep === 1"
              ref="step2"
              :detail="detail"
              @change="change"
            />

            <SetCustomerOrderStep3
              v-show="activeStep === 2"
              ref="step3"
              :detail="detail"
              @change="change"
            />

            <SetCustomerOrderStep4
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
import { addIndividuationOrder, updateIndividuationOrder, individuationOrderDetail } from '@/api/order/customerOrder'
import SetCustomerOrderStep1 from "./components/SetCustomerOrderStep1.vue";
import SetCustomerOrderStep2 from "./components/SetCustomerOrderStep2.vue";
import SetCustomerOrderStep3 from "./components/SetCustomerOrderStep3.vue";
import SetCustomerOrderStep4 from "./components/SetCustomerOrderStep4.vue";

const detail = {
  // step1
  customerType: 2, // 客户类型  1.个人客户 2.企业客户
  businessLicense: "", // 营业执照
  companyName: "", // 客户名称
  corporationTaxNumber: "", // 唯一证件号
  registeredAddress: "", // 注册地址
  address: "", // 经营场所地址
  managerName: "", // 企业联系人
  managerMobile: "", // 企业联系人手机号
  idcardUrl: "", // 使用人证件
  userName: "", // 使用人姓名
  idcard: "", // 使用人证件号
  userMobile: "", // 使用人手机号
  userAddress: "", // 使用人联系地址
  emergencyContactName: "", // 备用联系人姓名
  emergencyContactPhone: "", // 备用联系人手机号
  // step2
  carBrandId: '', // 车辆品牌Id
  carTypeId: '', // 车辆车系Id
  carTypeYearId: '', // 车辆年款Id
  carTypeYearProductId: '', // 车辆车型Id
  carFullName: '', // 车辆车型
  guidancePrice: undefined, // 厂商指导价
  purchaseTax: undefined, // 购置税
  ticketPrice: undefined, // 公司报价
  outColor: '', // 外观颜色
  inColor: '', // 内饰颜色
  carPlateNum: '', // 车牌号
  carVin: '', // 车架号
  hasCarPlateNum: null, // 客户是否有牌照  1.有 2.否
  plateMonthPrice: undefined, // 牌照费/牌照月租
  insurePeriod: '', // 保险打包年数
  commercialInsurePeriod: '', // 商业险购买年限
  insurePrice: undefined, // 保险费
  devicePrice: undefined , // 设备金额
  // step3
  period: '', // 订阅周期（年）
  monthTotal: undefined, // 每期月数
  firstPeriodRate: undefined, // 首付款比例
  depositRate: undefined, // 押金比例
  residualValueRate: undefined, // 期末残值比例
  irrRate: undefined, // 年利率
  startDate: '', // 订阅开始日
  payType: '', // 期初期末支付区分 1.期初 2.期末
  // step4
  contractLabelNum: '', // 合同编号
  capital: '', // 资方
  contractList: [], // 合同附件
}

export default {
  name: "setCustomerOrder",

  components: {
    SetCustomerOrderStep1,
    SetCustomerOrderStep2,
    SetCustomerOrderStep3,
    SetCustomerOrderStep4,
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

  mounted() {
    this.type = this.$route.query.type;
    this.orderId = this.$route.query.orderId;
    if (this.type == 1) {
      this.detail = {
        ...detail,
      };
    } else {
      this.getOrderDetail();
    }
  },

  methods: {
    getOrderDetail() {
      const data = {
        id: this.orderId
      }

      individuationOrderDetail(data).then(res => {
        if (res.code === 0) {
          this.detail = {
            ...res.data,
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
          if (this.type == 1) { 
            addIndividuationOrder(this.detail).then(res => {
                if(res.code === 0) {
                    this.$message.success('保存成功')
                    this.back()
                } else {
                    this.$message.error('保存失败')
                }
            }).catch(err => {
                this.$message.error('保存失败')
            })
          } else {
            updateIndividuationOrder(this.detail).then(res => {
                if(res.code === 0) {
                    this.$message.success('保存成功')
                    this.back()
                } else {
                    this.$message.error('保存失败')
                }
            }).catch(err => {
                this.$message.error('保存失败')
            })
          }
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
