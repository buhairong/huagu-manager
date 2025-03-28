<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item class="subscription-plan">{{type == 1 ? '全新车' : '二手车'}}订单</el-breadcrumb-item
      >
    </el-breadcrumb>

    <div class="content" v-loading="loading" element-loading-text="保存中...">
      <div>
        <div class="title">{{ operator == 1 ? "创建" : "修改" }}订单</div>

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
            <el-form :model="detail" label-width="180px" v-if="activeStep === 0">
              <el-form-item label="签约方式">
                <el-radio-group v-model="detail.customerType">
                    <el-radio 
                        v-for="item in customerTypeList"
                        :key="item.value"
                        :label="item.value"
                    >
                        {{ item.label }}
                    </el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item class="el-form-item_required" label="手机号" prop="userMobile">
                <c-input 
                  :inputValue.sync="detail.userMobile"
                  placeholder="请输入手机号"
                  :inputStyle="{
                    width: '300px'
                  }"
                  @blur="selectUserAndCompany"
                />
              </el-form-item>
            </el-form>

            <SetEntrustOrderStep1
              v-show="detail.customerType === 1 && activeStep === 0"
              ref="step1"
              :detail="detail"
              @change="change"
            />

            <SetEntrustOrderStep2
              v-show="(detail.customerType === 1 && activeStep === 1) || (detail.customerType === 2 && activeStep === 0)"
              ref="step2"
              :detail="detail"
              @change="change"
            />

            <SetEntrustOrderStep3
              v-show="(detail.customerType === 1 && activeStep === 2) || (detail.customerType === 2 && activeStep === 1)"
              ref="step3"
              :detail="detail"
              @change="change"
            />

            <SetEntrustOrderStep4
              v-show="(detail.customerType === 1 && activeStep === 3) || (detail.customerType === 2 && activeStep === 2)"
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

        <div class="btn save-btn" @click="save" v-if="(detail.customerType === 1 && activeStep === 3) || (detail.customerType === 2 && activeStep === 2)">
          保存
        </div>
        <div class="btn save-btn" @click="next" v-else>下一步</div>
      </div>
    </div>
  </div>
</template>

<script>
import { selectUserAndCompany, insertOrUpdateUserOrder, selectOrderDetail } from '@/api/order/orderManagement'
import { validPhoneNum, validIntegerNum } from '@/utils/validate'
import { SERVICE_LIST } from '@/utils/constant'
import SetEntrustOrderStep1 from "./components/SetEntrustOrderStep1.vue"
import SetEntrustOrderStep2 from "./components/SetEntrustOrderStep2.vue"
import SetEntrustOrderStep3 from "./components/SetEntrustOrderStep3.vue"
import SetEntrustOrderStep4 from "./components/SetEntrustOrderStep4.vue"

const detail = () => ({
  orderId: null,
  newType: 1, // 1.新车 2.二手车
  customerType: 1, // 1.企业签约  2.个人签约

  // 企业信息
  businessLicense: '', // 营业执照
  companyName: '', // 企业名称
  managerName: '', // 法人名称
  registeredAddress: '', // 注册地址
  corporationTaxNumber: '', // 信用代码
  companyStartDate: '', // 成立日期
  companyEndDate: '', // 营业期限
  isCompanyForever: 0, // 企业营业期限是否长期有效 0.否 1.是
  isRisk: 1, // 是否开启风控审核 0.否 1.是
  isOnlineSign: 1, // 是否开启线上签约 0.否 1.是

  // 实际用车人信息
  userId: null,
  idcardUrl: '', // 实际用车人身份证正面
  idcardBackUrl: '', // 实际用车人身份证背面
  userName: '', // 实际用车人姓名
  idcard: '', // 实际用车人证件号
  idcardValidityTimeStart: '', // 身份证开始日期
  idcardEndDate: '', // 证件有效期限
  isForever: 0, // 实际用车人证件是否长期有效 0.否 1.是
  userMobile: '', // 实际用车人手机号
  driverLicenseUrl: '',//	实际用车人驾驶证主页
  driverLicenseSecondSheetUrl: '',//	实际用车人驾驶证副页
  carType: '', // 实际用车人准驾车型
  driverLicenseTimeStart: '', // 实际用车人驾驶证开始日期
  driverLicenseEndDate: '', // 实际用车人驾驶证有效期
  emergencyContactName: '', // 备用联系人姓名
  emergencyContactPhone: '', // 备用联系人手机号

  // 车辆信息
  carBrandId: '', // 车辆品牌Id
  carTypeId: '', // 车辆车系Id
  carTypeYearId: '', // 车辆年款Id
  carTypeYearProductId: '', // 车辆车型Id
  carImage: '', // 车辆图片
  carFullName: '', // 车辆车型
  guidancePrice: null, // 厂商指导价
  outColor: '', // 外观颜色
  inColor: '', // 内饰颜色
  otherConfigList: [  // 车辆增配项
    {
      details: [
        {
          detailName: "", // 名称
          money: undefined, // 价格
          hasCheck: 1,
        },
      ],
    }
  ],

  // 方案信息
  carSubscribeId: null,
  cityId: '', // 用车城市
  cityName: '',
  plateCityId: '', // 车辆上牌城市
  plateCityName: '',
  discount: undefined, // 厂商折扣
  purchaseTax: null, // 购置税
  profit: undefined, // 预留利润
  firstPeriodRate: undefined, // 首期摊销比例
  residualValueRate: undefined, // 期末余值比例
  twelveMonthMoney: undefined, // 12个月后二手车估价
  deposit: undefined, // 车辆押金
  carSubscribeFreeServiceList: [], // 差异化服务
  safeguardServices: [], // 保障服务
  apportionFeeRecordList: [], // 订阅方案
  typeReqVos: [], // 选择方案
  SERVICE_LIST: JSON.parse(JSON.stringify(SERVICE_LIST)),
  checkList: [],
})

export default {
  name: "setEntrustOrder",

  components: {
    SetEntrustOrderStep1,
    SetEntrustOrderStep2,
    SetEntrustOrderStep3,
    SetEntrustOrderStep4,
  },

  data() {
    return {
      loading: false,
      operator: null,
      type: null,
      orderId: null,
      activeStep: 0,
      companyStepList: ["企业信息", "实际用车人信息", "车辆信息", "方案信息"],
      personStepList: ["实际用车人信息", "车辆信息", "方案信息"],
      detail: null,
      customerTypeList: [
        { value: 1, label: '企业签约' },
        { value: 2, label: '个人签约' },
      ],
    }
  },

  computed: {
    stepList() {
      return this.detail && this.detail.customerType === 2 ? this.personStepList : this.companyStepList
    },
  },

  mounted() {
    this.type = this.$route.query.type
    this.operator = this.$route.query.operator
    this.orderId = this.$route.query.orderId
    if (this.operator == 1) {
      this.detail = {
        ...detail(),
        newType: this.type,
      }
    } else {
      this.getOrderDetail()
    }
  },

  methods: {
    getOrderDetail() {
      const data = {
        orderId: this.orderId
      }

      selectOrderDetail(data).then(res => {
        if (res.code === 0) {
          const checkList = []

          const service = SERVICE_LIST.map(item => {
              const findItem = res.data.carSubscribeFreeServiceList.find(item1 => item1.serviceName === item.serviceName)

              if (findItem) {
                  item.isChecked = true
                  item.size = findItem.size
                  checkList.push(findItem.serviceName)
              }

              return item
          })
          this.detail = {
            ...res.data,
            orderId: this.orderId,
            newType: this.type,
            SERVICE_LIST: service,
            checkList,
          }

          if (!res.data.companyEndDate) {
            this.detail.isCompanyForever = 1
          }

          if (!res.data.idcardEndDate) {
            this.detail.isForever = 1
          }
        }
      })
    },

    back() {
      this.$router.back()
    },

    change(data) {
      this.detail = data
    },

    selectUserAndCompany() {
      const data = {
        mobile: this.detail.userMobile
      }

      selectUserAndCompany(data).then(res => {
        if (res.code === 0) {
          if (res.data) {
            if (res.data.userCompanyEntity) {
              this.detail.businessLicense = res.data.userCompanyEntity.businessLicense // 营业执照
              this.detail.companyName = res.data.userCompanyEntity.companyName // 企业名称
              this.detail.managerName = res.data.userCompanyEntity.contactName // 法人名称
              this.detail.registeredAddress = res.data.userCompanyEntity.address // 注册地址
              this.detail.corporationTaxNumber = res.data.userCompanyEntity.corporationTaxNumber // 信用代码
              this.detail.companyStartDate = res.data.userCompanyEntity.establishDate // 成立日期
              if (res.data.userCompanyEntity.businessDeadline) {
                this.detail.companyEndDate = res.data.userCompanyEntity.businessDeadline
              } else {
                this.detail.isCompanyForever = 1
              }
            }

            if (res.data.userInfoEntity) {
              this.detail.idcardUrl = res.data.userInfoEntity.idcardUrl // 实际用车人身份证正面
              this.detail.idcardBackUrl = res.data.userInfoEntity.idcardBackUrl // 实际用车人身份证背面
              this.detail.idcard = res.data.userInfoEntity.idcard // 实际用车人证件号
              this.detail.idcardValidityTimeStart = res.data.userInfoEntity.idcardValidityTimeStart
              if (res.data.userInfoEntity.idcardValidityTimeEnd) {
                this.detail.idcardEndDate = res.data.userInfoEntity.idcardValidityTimeEnd
              } else {
                this.detail.isForever = 1
              }

              this.detail.driverLicenseUrl = res.data.userInfoEntity.driverLicenseUrl //	实际用车人驾驶证主页
              this.detail.driverLicenseSecondSheetUrl = res.data.userInfoEntity.driverLicenseSecondSheetUrl //	实际用车人驾驶证副页
              this.detail.carType = res.data.userInfoEntity.carType // 实际用车人准驾车型
              this.detail.driverLicenseTimeStart = res.data.userInfoEntity.driverLicenseTimeStart
              this.detail.driverLicenseEndDate = res.data.userInfoEntity.driverLicenseTimeEnd // 实际用车人驾驶证有效期
            }

            if (res.data.userEntity) {
              this.detail.userName = res.data.userEntity.name // 实际用车人姓名
              this.detail.userId = res.data.userEntity.id
            }
          }
        }else if (res.code === 201) {
          this.$message.error("未查询到该用户")
        }
      })
    },

    prev() {
      --this.activeStep
    },

    next() {
      if (this.activeStep === 0) {
        const mobile = this.detail.userMobile.trim()
        if (!mobile) {
          this.$message.error("请输入手机号")
          return false
        }

        if (!validPhoneNum(mobile)) {
          this.$message.error("请输入正确的手机号")
          return false
        }
      }

      if ((this.detail.customerType === 1 && this.activeStep === 2) || (this.detail.customerType === 2 && this.activeStep === 1)) {
        const list = this.detail.otherConfigList[0].details.filter(item => item.detailName.trim() || item.money)
        for (const item of list) {
          if (!item.detailName.trim()) {
            this.$message.error('请输入增配项')
            return
          }
          if (!item.money) {
            this.$message.error('请输入增配项金额')
            return
          }
          if (!validIntegerNum(item.money)) {
            this.$message.error('请正确输入增配项金额')
            return
          }
        }
      }
      
      if (this.detail.customerType === 1) {
        if (this.activeStep === 0) {
          this.$refs.step1.$refs.step1form.validate((valid) => {
            if (valid) {
              ++this.activeStep
            } else {
              this.$message.error("请检查输入项")
            }
          })
        } else if (this.activeStep === 1) {
          this.$refs.step2.$refs.step2form.validate((valid) => {
            if (valid) {
              ++this.activeStep
            } else {
              this.$message.error("请检查输入项")
            }
          })
        } else if (this.activeStep === 2) {
          this.$refs.step3.$refs.step3form.validate((valid) => {
            if (valid) {
              ++this.activeStep
            } else {
              this.$message.error("请检查输入项")
            }
          })
        }
      } else {
        if (this.activeStep === 0) {
          this.$refs.step2.$refs.step2form.validate((valid) => {
            if (valid) {
              ++this.activeStep
            } else {
              this.$message.error("请检查输入项")
            }
          })
        } else if (this.activeStep === 1) {
          this.$refs.step3.$refs.step3form.validate((valid) => {
            if (valid) {
              ++this.activeStep
            } else {
              this.$message.error("请检查输入项")
            }
          })
        }
      }
      
    },

    save() {
      this.detail.carSubscribeFreeServiceList = this.detail.SERVICE_LIST.filter(item => item.isChecked)
            
      for(const item of this.detail.carSubscribeFreeServiceList) {
        if(item.requireInputCount && !item.size) {
          this.$message.error(`请输入${item.serviceName}的次数`)
          return
        }
      }

      this.$refs.step4.$refs.step4form.validate((valid) => {
        if (valid) {
          const detail = {
            ...this.detail,
            otherConfigList: [
              {
                details: this.detail.otherConfigList[0].details.filter(item => item.detailName.trim() && item.money)
              }
            ]
          }

          if (detail.customerType === 2) {
            detail.isRisk = 1
            detail.isOnlineSign = 1
          }

          this.loading = true
          insertOrUpdateUserOrder(detail).then(res => {
            if(res.code === 0) {
              this.$message.success('保存成功')
              setTimeout(() => {
                if (this.operator == 1) {
                  this.$router.push({
                    path: '/order/financialOrderManagement',
                  })
                } else {
                  this.back()
                }
                this.loading = false
              }, 2000)
            } else {
              this.$message.error('保存失败')
              this.loading = false
            }
          }).catch(err => {
            this.$message.error('保存失败')
            this.loading = false
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
